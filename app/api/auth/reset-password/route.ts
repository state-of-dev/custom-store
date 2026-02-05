import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

// GET: Validar token
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")
    const validate = searchParams.get("validate")

    if (!token) {
      return NextResponse.json(
        { error: "Token es requerido" },
        { status: 400 }
      )
    }

    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      )
    }

    if (resetRecord.used) {
      return NextResponse.json(
        { error: "Este enlace ya fue utilizado" },
        { status: 400 }
      )
    }

    if (new Date() > resetRecord.expires) {
      return NextResponse.json(
        { error: "Este enlace ha expirado" },
        { status: 400 }
      )
    }

    return NextResponse.json({ valid: true })
  } catch (error: any) {
    console.error("Error al validar token:", error)
    return NextResponse.json(
      { error: "Error al validar token" },
      { status: 500 }
    )
  }
}

// POST: Cambiar contraseña
export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token y contraseña son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!resetRecord || resetRecord.used || new Date() > resetRecord.expires) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      )
    }

    // Hashear nueva contraseña
    const hashedPassword = await hash(password, 12)

    // Actualizar contraseña y marcar token como usado
    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetRecord.email },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.update({
        where: { id: resetRecord.id },
        data: { used: true },
      }),
    ])

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
    })
  } catch (error: any) {
    console.error("Error al resetear contraseña:", error)
    return NextResponse.json(
      { error: "Error al resetear contraseña" },
      { status: 500 }
    )
  }
}
