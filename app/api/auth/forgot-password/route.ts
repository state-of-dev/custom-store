import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      )
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Por seguridad, siempre retornar éxito (no revelar si el email existe)
    if (!user) {
      return NextResponse.json({
        message: "Si el email existe, recibirás un enlace para restablecer tu contraseña",
      })
    }

    // Solo permitir reset para usuarios con password (no OAuth)
    if (!user.password) {
      return NextResponse.json({
        message: "Si el email existe, recibirás un enlace para restablecer tu contraseña",
      })
    }

    // Generar token seguro
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

    // Guardar token en la base de datos
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expires,
      },
    })

    // Construir URL de reset
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password/${token}`

    // Enviar email
    await sendPasswordResetEmail({
      email,
      resetUrl,
      name: user.name || undefined,
    })

    return NextResponse.json({
      message: "Si el email existe, recibirás un enlace para restablecer tu contraseña",
    })
  } catch (error: any) {
    console.error("Error en forgot-password:", error)
    return NextResponse.json(
      { error: "Error al procesar solicitud" },
      { status: 500 }
    )
  }
}
