import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Credenciales faltantes")
            return null
          }

          console.log("🔍 Buscando usuario:", credentials.email)

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
              password: true,
              role: true,
            },
          })

          if (!user) {
            console.log("❌ Usuario no encontrado")
            return null
          }

          if (!user.password) {
            console.log("❌ Usuario sin contraseña (probablemente OAuth)")
            return null
          }

          console.log("✅ Usuario encontrado, verificando contraseña...")

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          )

          console.log("🔐 Contraseña válida:", isPasswordValid)

          if (!isPasswordValid) {
            return null
          }

          console.log("✅ Autenticación exitosa, retornando usuario")

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.error("❌ Error en authorize:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session: updateSession }) {
      if (user) {
        console.log("📝 JWT callback - agregando user al token:", {
          id: user.id,
          email: user.email,
          role: user.role,
        })
        token.id = user.id
        token.role = user.role
      }

      // Actualizar datos en el token cuando se llama update()
      if (trigger === "update" && updateSession) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { name: true, image: true, role: true },
        })
        if (dbUser) {
          token.name = dbUser.name
          token.picture = dbUser.image
          token.role = dbUser.role
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log("🎫 Session callback - agregando token a session:", {
          id: token.id,
          role: token.role,
        })
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Para Google OAuth, crear o actualizar usuario
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        })

        if (existingUser) {
          // Actualizar usuario existente
          if (!existingUser.role) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { role: "CUSTOMER" },
            })
          }
          // Asignar el id del usuario existente
          user.id = existingUser.id
          user.role = existingUser.role || "CUSTOMER"
        } else {
          // Crear nuevo usuario de Google
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: "CUSTOMER",
            },
          })
          user.id = newUser.id
          user.role = newUser.role
        }

        // Crear o actualizar Account para OAuth
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            access_token: account.access_token,
            expires_at: account.expires_at,
            id_token: account.id_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            session_state: account.session_state as string | null,
            token_type: account.token_type,
          },
          create: {
            userId: user.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            expires_at: account.expires_at,
            id_token: account.id_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            session_state: account.session_state as string | null,
            token_type: account.token_type,
          },
        })
      }
      return true
    },
  },
}
