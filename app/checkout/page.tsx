"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  // Cargar datos del usuario si está autenticado
  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setFormData({
              email: data.email || "",
              name: data.name || "",
              address: data.addressLine1 || "",
              city: data.city || "",
              state: data.state || "",
              zip: data.postalCode || "",
            })
          }
        })
        .catch((error) => {
          console.error("Error al cargar datos del usuario:", error)
        })
    }
  }, [session])

  // Redirect si el carrito está vacío
  useEffect(() => {
    if (cart && cart.lines.length === 0) {
      router.push("/shop")
    }
  }, [cart, router])

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="container max-w-lg mx-auto py-20 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
            <Button asChild>
              <Link href="/shop">Ir a la tienda</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Preparar los items del carrito
      const items = cart.lines.map(line => ({
        variantId: line.merchandise.id,
        productName: line.merchandise.product.title,
        variantName: line.merchandise.title,
        price: parseFloat(line.cost.totalAmount.amount) / line.quantity,
        quantity: line.quantity,
      }))

      console.log("Enviando checkout:", { items, customerInfo: formData })

      // Llamar a la API de checkout
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
              state: formData.state,
              zip: formData.zip,
            }
          }
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear checkout')
      }

      if (data.url) {
        // Redirigir a Stripe
        console.log("Redirigiendo a Stripe:", data.url)
        window.location.href = data.url
      } else {
        throw new Error('No se recibió URL de checkout')
      }
    } catch (error: any) {
      console.error("Error:", error)
      alert(`Error al procesar el pago: ${error.message}`)
      setIsLoading(false)
    }
  }

  const total = parseFloat(cart.cost.totalAmount.amount)
  const shipping = 99
  const grandTotal = total + shipping

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Juan Pérez"
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
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Calle, número, colonia"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      placeholder="Ciudad de México"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      placeholder="CDMX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip">Código Postal *</Label>
                  <Input
                    id="zip"
                    required
                    value={formData.zip}
                    onChange={e => setFormData({...formData, zip: e.target.value})}
                    placeholder="01000"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pagar {formatCurrency(grandTotal)}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Resumen */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.lines.map(line => (
                  <div key={line.id} className="flex justify-between items-start py-2">
                    <div className="flex-1">
                      <p className="font-medium">{line.merchandise.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {line.merchandise.title} × {line.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(parseFloat(line.cost.totalAmount.amount))}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
