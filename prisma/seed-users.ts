import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding users...')

  // Password común para ambos usuarios: "password123"
  const hashedPassword = await hash('password123', 12)

  // Usuario de prueba (CUSTOMER)
  const testingUser = await prisma.user.upsert({
    where: { email: 'testing@perfumes.com' },
    update: {},
    create: {
      email: 'testing@perfumes.com',
      name: 'Usuario Testing',
      password: hashedPassword,
      role: 'CUSTOMER',
      phone: '5512345678',
      addressLine1: 'Av. Insurgentes Sur 123',
      addressLine2: 'Col. Del Valle',
      city: 'Ciudad de México',
      state: 'CDMX',
      postalCode: '03100',
      country: 'México',
    },
  })

  console.log('✅ Usuario testing creado:', {
    email: testingUser.email,
    name: testingUser.name,
    role: testingUser.role,
  })

  // Usuario admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@perfumes.com' },
    update: {},
    create: {
      email: 'admin@perfumes.com',
      name: 'Admin Perfumes',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '5587654321',
      addressLine1: 'Paseo de la Reforma 456',
      addressLine2: 'Oficina 12',
      city: 'Ciudad de México',
      state: 'CDMX',
      postalCode: '06600',
      country: 'México',
    },
  })

  console.log('✅ Usuario admin creado:', {
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
  })

  console.log('\n🎉 Usuarios creados exitosamente!')
  console.log('\n📝 Credenciales:')
  console.log('─────────────────────────────────────')
  console.log('Usuario Testing:')
  console.log('  Email: testing@perfumes.com')
  console.log('  Password: password123')
  console.log('  Rol: CUSTOMER')
  console.log('─────────────────────────────────────')
  console.log('Usuario Admin:')
  console.log('  Email: admin@perfumes.com')
  console.log('  Password: password123')
  console.log('  Rol: ADMIN')
  console.log('─────────────────────────────────────')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding users:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
