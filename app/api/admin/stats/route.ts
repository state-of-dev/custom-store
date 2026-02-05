import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      )
    }

    // Obtener totales
    const [totalRevenue, orders, ordersByStatus] = await Promise.all([
      // Total de ingresos (solo pedidos pagados)
      prisma.order.aggregate({
        where: {
          paymentStatus: "PAID",
        },
        _sum: {
          total: true,
        },
      }),

      // Total de pedidos
      prisma.order.count(),

      // Pedidos por estado
      prisma.order.groupBy({
        by: ["status"],
        _count: true,
      }),
    ])

    // Crear objeto de conteo por estado
    const statusCounts = {
      PROCESANDO: 0,
      ENVIADO: 0,
      ENTREGADO: 0,
    }

    ordersByStatus.forEach((group) => {
      if (group.status in statusCounts) {
        statusCounts[group.status as keyof typeof statusCounts] = group._count
      }
    })

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders: orders,
      ordersByStatus: statusCounts,
    })
  } catch (error) {
    console.error("Error al obtener estadísticas:", error)
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    )
  }
}
