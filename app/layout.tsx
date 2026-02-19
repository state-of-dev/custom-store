import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { CartProvider } from "@/components/cart/cart-context"
import { SessionProvider } from "@/components/providers/session-provider"
import { DebugGrid } from "@/components/debug-grid"
import { isDevelopment } from "@/lib/constants"
import { getCollections } from "@/lib/shopify"
import { Header } from "../components/layout/header"
import dynamic from "next/dynamic"
import { V0Provider } from "../lib/context"
import { cn } from "../lib/utils"

const V0Setup = dynamic(() => import("@/components/v0-setup"))

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Custom Perfumes",
  description: "Custom Perfumes - Fragancias exclusivas y personalizadas para cada ocasión.",
  generator: 'a'
}

/**
 * Componente de Layout Principal para Tienda ACME
 *
 * Este es el componente de layout principal que envuelve toda la aplicación.
 * Proporciona proveedores esenciales y funcionalidad global incluyendo:
 * - Integración de e-commerce con Shopify y gestión de carrito
 * - Configuración de fuentes con Geist Sans y Mono
 * - Notificaciones toast para feedback del usuario
 * - Gestión de estado de URL con nuqs
 * - Herramientas de debugging para desarrollo
 * - Detección y configuración del entorno v0
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const collections = await getCollections()

  return (
    <html lang="es">
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased min-h-screen", { "is-v0": isV0 })}
        suppressHydrationWarning
      >
        <V0Provider isV0={isV0}>
          <SessionProvider>
            <CartProvider>
              <NuqsAdapter>
                <main data-vaul-drawer-wrapper="true">
                  <Header collections={collections} />
                  {children}
                </main>
                {isDevelopment && <DebugGrid />}
                <Toaster closeButton position="bottom-right" />
              </NuqsAdapter>
            </CartProvider>
          </SessionProvider>
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  )
}
