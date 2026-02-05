import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

async function checkUser(email: string, testPassword: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      role: true,
    },
  })

  if (!user) {
    console.log('❌ Usuario no encontrado:', email)
    return
  }

  console.log('\n✅ Usuario encontrado:')
  console.log('  ID:', user.id)
  console.log('  Email:', user.email)
  console.log('  Name:', user.name)
  console.log('  Role:', user.role)
  console.log('  Has password:', !!user.password)

  if (user.password) {
    const isValid = await compare(testPassword, user.password)
    console.log('  Password "' + testPassword + '" is valid:', isValid)
  }
}

async function main() {
  const email = process.argv[2]
  const password = process.argv[3] || 'password123'

  if (!email) {
    console.log('Usage: tsx scripts/check-user.ts <email> [password]')
    console.log('\nEjemplo: tsx scripts/check-user.ts testing@perfumes.com password123')
    return
  }

  await checkUser(email, password)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
