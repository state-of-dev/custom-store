# MVP E-commerce Perfumes Custom

## Stack
- **Next.js 16** (existente)
- **Neon Postgres + Prisma** (como Tribumala)
- **NextAuth + Google** (como Tribumala)
- **Stripe Checkout** (redirect a Stripe)
- **Vercel** (hosting)

## Lo que ya existe
- UI completa: shop, product detail, carrito modal
- 12 perfumes mock con variantes (30ml, 50ml, 100ml)
- Carrito con cookies/server actions

## Lo que falta
- Base de datos (usuarios, órdenes)
- Auth con Google
- Checkout con Stripe
- Historial de órdenes

---

## Estructura de archivos nuevos

```
prisma/
└── schema.prisma

lib/
├── prisma.ts
├── auth.ts
└── stripe.ts

app/
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── checkout/route.ts
│   ├── webhook/route.ts
│   └── orders/route.ts
├── checkout/
│   ├── page.tsx
│   └── success/page.tsx
└── orders/
    └── page.tsx

components/
└── auth/
    ├── sign-in-button.tsx
    ├── user-menu.tsx
    └── session-provider.tsx

types/
└── next-auth.d.ts
```

---

## Fase 1: Base de Datos

### Instalar
```bash
pnpm add @prisma/client
pnpm add -D prisma
```

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String?
  customerEmail   String
  customerName    String?
  shippingAddress String
  subtotal        Float
  shipping        Float       @default(99)
  total           Float
  status          String      @default("PENDING")
  paymentStatus   String      @default("PENDING")
  stripeSessionId String?     @unique
  createdAt       DateTime    @default(now())
  items           OrderItem[]
  user            User?       @relation(fields: [userId], references: [id])
}

model OrderItem {
  id          String @id @default(cuid())
  orderId     String
  variantId   String
  productName String
  variantName String
  price       Float
  quantity    Int
  order       Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
}
```

### lib/prisma.ts
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Comandos
```bash
npx prisma generate
npx prisma db push
```

---

## Fase 2: Auth (NextAuth + Google)

### Instalar
```bash
pnpm add next-auth @auth/prisma-adapter
```

### lib/auth.ts
```typescript
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string
      return session
    },
  },
}
```

### app/api/auth/[...nextauth]/route.ts
```typescript
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### types/next-auth.d.ts
```typescript
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}
```

### components/auth/session-provider.tsx
```typescript
"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
```

### components/auth/sign-in-button.tsx
```typescript
"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" size="sm">
      Iniciar sesión
    </Button>
  )
}
```

### components/auth/user-menu.tsx
```typescript
"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { SignInButton } from "./sign-in-button"

export function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return <SignInButton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/orders">Mis pedidos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Modificar app/layout.tsx
Agregar SessionProvider envolviendo todo:
```typescript
import { SessionProvider } from "@/components/auth/session-provider"

// En el return:
<SessionProvider>
  {/* resto del layout */}
</SessionProvider>
```

### Modificar components/layout/header.tsx
Agregar UserMenu junto al carrito.

---

## Fase 3: Stripe Checkout

### Instalar
```bash
pnpm add stripe
```

### lib/stripe.ts
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})
```

### app/api/checkout/route.ts
```typescript
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { items, customerInfo } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 })
    }

    // Generar número de orden
    const orderNumber = `PC-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Calcular totales
    const subtotal = items.reduce((sum: number, item: any) =>
      sum + (item.price * item.quantity), 0)
    const shipping = 99
    const total = subtotal + shipping

    // Crear orden en DB
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        shippingAddress: JSON.stringify(customerInfo.address),
        subtotal,
        shipping,
        total,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            price: item.price,
            quantity: item.quantity,
          }))
        }
      }
    })

    // Crear Stripe session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.productName,
            description: item.variantName,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 9900, currency: 'mxn' },
          display_name: 'Envío estándar (3-7 días)',
        },
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?order=${orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?cancelled=true`,
      customer_email: customerInfo.email,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
      },
    })

    return NextResponse.json({ url: stripeSession.url, orderNumber })
  } catch (error: any) {
    console.error("Error en checkout:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### app/api/webhook/route.ts
```typescript
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const orderId = session.metadata?.order_id

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          stripeSessionId: session.id,
        }
      })
      console.log(`Orden ${session.metadata?.order_number} actualizada a PAID`)
    }
  }

  return NextResponse.json({ received: true })
}
```

---

## Fase 4: Páginas

### app/checkout/page.tsx
```typescript
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: session?.user?.email || "",
    name: session?.user?.name || "",
    address: "",
    city: "",
    zip: "",
  })

  if (!cart || cart.lines.length === 0) {
    router.push("/shop")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const items = cart.lines.map(line => ({
        variantId: line.merchandise.id,
        productName: line.merchandise.product.title,
        variantName: line.merchandise.title,
        price: parseFloat(line.cost.totalAmount.amount) / line.quantity,
        quantity: line.quantity,
      }))

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerInfo: {
            email: formData.email,
            name: formData.name,
            address: {
              street: formData.address,
              city: formData.city,
              zip: formData.zip,
            }
          }
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Error al crear checkout')
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el pago")
    } finally {
      setIsLoading(false)
    }
  }

  const total = parseFloat(cart.cost.totalAmount.amount)

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dirección de envío</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">C.P.</Label>
                  <Input
                    id="zip"
                    required
                    value={formData.zip}
                    onChange={e => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              `Pagar $${(total + 99).toFixed(2)} MXN`
            )}
          </Button>
        </form>

        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.lines.map(line => (
              <div key={line.id} className="flex justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{line.merchandise.product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {line.merchandise.title} x {line.quantity}
                  </p>
                </div>
                <p>${line.cost.totalAmount.amount}</p>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Envío</span>
              <span>$99.00</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>${(total + 99).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### app/checkout/success/page.tsx
```typescript
"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  return (
    <div className="container max-w-lg mx-auto py-20 px-4">
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">¡Gracias por tu compra!</h1>
          <p className="text-muted-foreground mb-4">
            Tu pedido ha sido procesado correctamente.
          </p>
          {orderNumber && (
            <p className="font-mono bg-muted p-2 rounded mb-6">
              Orden: {orderNumber}
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/orders">Ver mis pedidos</Link>
            </Button>
            <Button asChild>
              <Link href="/shop">Seguir comprando</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
```

### app/api/orders/route.ts
```typescript
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({
    success: true,
    orders: orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.total,
      createdAt: order.createdAt.toISOString(),
      items: order.items,
    }))
  })
}
```

### app/orders/page.tsx
```typescript
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
  items: { productName: string; quantity: number; price: number }[]
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
    if (status === "authenticated") {
      fetchOrders()
    }
  }, [status, router])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No tienes pedidos aún</p>
            <Button asChild>
              <Link href="/shop">Explorar productos</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Pedido #{order.orderNumber}
                  </CardTitle>
                  <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                    {order.paymentStatus === 'PAID' ? 'Pagado' : 'Pendiente'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString('es-MX')}
                </p>
              </CardHeader>
              <CardContent>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span>{item.productName} x {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t mt-2 font-bold">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Variables de Entorno (.env.local)

```env
# Neon Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-aleatorio-32-chars

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

---

## Comandos de Setup

```bash
# 1. Instalar dependencias
pnpm add @prisma/client next-auth @auth/prisma-adapter stripe
pnpm add -D prisma

# 2. Inicializar Prisma
npx prisma generate
npx prisma db push

# 3. Stripe CLI (dev local)
stripe listen --forward-to localhost:3000/api/webhook
```

---

## Test

1. **Auth**: Click login → Google → redirect → ver avatar
2. **Checkout**: Agregar al carrito → /checkout → llenar form → pagar
3. **Stripe test card**: `4242 4242 4242 4242`
4. **Success**: Ver página de confirmación
5. **Orders**: Ver historial en /orders

---

## Notas Importantes

### Integración con el carrito existente

El proyecto ya tiene un carrito funcional (`components/cart/cart-context.tsx`) que usa:
- `Cart` type con `lines: CartItem[]` (array directo, no edges)
- `useCart()` hook que retorna `{ cart, addItem, updateItem, isPending }`
- Server actions en `components/cart/actions.ts`

**Ajustes necesarios en checkout:**

1. El carrito ya tiene la estructura correcta, solo mapear los items:
```typescript
const items = cart.lines.map(line => ({
  variantId: line.merchandise.id,
  productName: line.merchandise.product.title,
  variantName: line.merchandise.title,
  price: parseFloat(line.cost.totalAmount.amount) / line.quantity,
  quantity: line.quantity,
}))
```

2. NO necesitas modificar el carrito existente, funciona perfecto.

3. Los productos mock ya tienen variantes con IDs únicos (variant-1-1, variant-1-2, etc.)

### Modificaciones al Header

En `components/layout/header.tsx`, agregar el UserMenu:

```typescript
import { UserMenu } from "@/components/auth/user-menu"

// Dentro del header, junto al CartModal:
<div className="flex items-center gap-4">
  <UserMenu />
  <CartModal />
</div>
```

### Estructura de Order en DB vs Tribumala

Simplificamos vs Tribumala:
- Sin campos de dirección separados (street, city, state, zip)
- Todo en `shippingAddress: String` (JSON stringified)
- Sin campos de billing separados
- Sin `shippingCity`, `shippingZip` separados (todo en JSON)

Si quieres usar los campos separados como Tribumala, actualizar el schema:

```prisma
model Order {
  // ... otros campos
  shippingAddress String  // Calle
  shippingCity    String
  shippingZip     String
  shippingCountry String @default("México")
  // ... resto
}
```

### Crear credenciales Google OAuth

1. Ir a https://console.cloud.google.com/
2. Crear proyecto "Perfumes Custom"
3. OAuth consent screen → External
4. Credentials → Create OAuth Client ID → Web application
5. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://tu-dominio.vercel.app/api/auth/callback/google`
6. Copiar Client ID y Secret a `.env.local`

### Setup Stripe Webhook (desarrollo local)

```bash
# Instalar Stripe CLI
# Windows (con Scoop)
scoop install stripe

# Iniciar listener
stripe login
stripe listen --forward-to localhost:3000/api/webhook

# Copiar el webhook secret que aparece (whsec_xxx) a .env.local
```

### Scripts útiles en package.json

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate"
  }
}
```

### Diferencias vs Tribumala (simplificaciones)

Lo que **NO** implementamos del plan original:
- ❌ Productos en DB (mantenemos mock)
- ❌ Stock/inventario
- ❌ Carrito en DB (mantenemos en cookies)
- ❌ Emails transaccionales
- ❌ Campos separados de dirección
- ❌ PaymentMethods guardados
- ❌ Múltiples direcciones

Lo que **SÍ** copiamos de Tribumala:
- ✅ Prisma + Neon
- ✅ NextAuth + Google
- ✅ Stripe Checkout (redirect)
- ✅ Webhook para actualizar órdenes
- ✅ Estructura de Order/OrderItem
- ✅ Página de órdenes con auth guard

### Moneda

Tribumala usa MXN, este proyecto también. Ajustar si necesitas:
```typescript
currency: 'usd' // Cambiar 'mxn' a 'usd' en checkout/route.ts
```

### Deploy a Vercel

1. Push a GitHub
2. Importar en Vercel
3. Agregar variables de entorno
4. Deploy
5. Configurar webhook de Stripe con la URL de producción
