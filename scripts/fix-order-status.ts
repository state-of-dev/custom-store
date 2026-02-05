import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Actualizando estados de pedidos...')

  // Actualizar todos los pedidos PENDING a PROCESANDO
  const result = await prisma.order.updateMany({
    where: {
      status: 'PENDING',
    },
    data: {
      status: 'PROCESANDO',
    },
  })

  console.log(`✅ ${result.count} pedidos actualizados de PENDING a PROCESANDO`)

  // Actualizar CONFIRMED a PAGADO si paymentStatus es PAID
  const result2 = await prisma.order.updateMany({
    where: {
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
    data: {
      status: 'PAGADO',
    },
  })

  console.log(`✅ ${result2.count} pedidos actualizados de CONFIRMED a PAGADO`)

  // Listar todos los estados únicos actuales
  const orders = await prisma.order.findMany({
    select: {
      status: true,
    },
    distinct: ['status'],
  })

  console.log('\n📊 Estados actuales en la base de datos:')
  orders.forEach((order) => {
    console.log(`  - ${order.status}`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
