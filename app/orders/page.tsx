"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Package, Clock, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type OrderStatus = "PROCESANDO" | "ENVIADO" | "ENTREGADO" | "CANCELADO"

interface OrderItem {
  id: string
  productName: string
  variantName: string
  price: number
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  paymentStatus: string
  total: number
  subtotal: number
  shipping: number
  items: OrderItem[]
}

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  PROCESANDO: {
    label: "Procesando",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50",
  },
  ENVIADO: {
    label: "Enviado",
    icon: Truck,
    color: "text-blue-600 bg-blue-50",
  },
  ENTREGADO: {
    label: "Entregado",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50",
  },
  CANCELADO: {
    label: "Cancelado",
    icon: Package,
    color: "text-red-600 bg-red-50",
  },
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/orders")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/user/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error al cargar pedidos:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Cargando pedidos...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mis Pedidos</h1>
        <p className="mt-2 text-gray-600">
          Revisa el estado de tus pedidos y su historial
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            No tienes pedidos aún
          </h2>
          <p className="mt-2 text-gray-600">
            Cuando realices tu primer pedido, aparecerá aquí
          </p>
          <Button onClick={() => router.push("/shop")} className="mt-6">
            Explorar productos
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon
            const statusColor = statusConfig[order.status].color

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-lg bg-white shadow"
              >
                {/* Header del pedido */}
                <div className="border-b border-gray-200 bg-gray-50 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          Pedido #{order.orderNumber}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Fecha: {new Date(order.createdAt).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-xl font-bold">
                        ${order.total.toFixed(2)} MXN
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items del pedido */}
                <div className="p-6">
                  <h4 className="mb-4 font-medium text-gray-900">Productos</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.variantName} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)} MXN
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Resumen de costos */}
                  <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${order.subtotal.toFixed(2)} MXN</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span className="font-medium">${order.shipping.toFixed(2)} MXN</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
