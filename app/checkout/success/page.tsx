"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2, Package } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  return (
    <div className="container max-w-lg mx-auto py-20 px-4">
      <Card>
        <CardContent className="pt-10 pb-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">¡Gracias por tu compra!</h1>
            <p className="text-muted-foreground">
              Tu pedido ha sido procesado correctamente.
            </p>
          </div>

          {orderNumber && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Número de orden</p>
              <p className="font-mono font-bold text-lg">{orderNumber}</p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              Recibirás un email de confirmación con los detalles de tu pedido.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/shop">
                  <Package className="mr-2 h-4 w-4" />
                  Seguir comprando
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-lg mx-auto py-20 px-4">
          <Card>
            <CardContent className="pt-10 pb-10 text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Cargando...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
