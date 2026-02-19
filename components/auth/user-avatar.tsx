"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User, Package, LogOut, Store, UserCircle } from "lucide-react"

export function UserAvatar() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-muted"></div>
    )
  }

  if (!session?.user) {
    // Usuario no autenticado - mostrar icono para login/registro
    return (
      <div className="group relative">
        <Link
          href="/auth/signin"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:bg-muted transition-colors"
        >
          <UserCircle className="h-5 w-5" />
        </Link>

        {/* Dropdown menu para no autenticado */}
        <div className="absolute right-0 mt-2 w-48 origin-top-right scale-0 rounded-md border bg-popover py-1 shadow-lg transition-transform group-hover:scale-100 z-50">
          <Link
            href="/auth/signin"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
          >
            <User className="h-4 w-4" />
            Iniciar sesión
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
          >
            <UserCircle className="h-4 w-4" />
            Registrarse
          </Link>
        </div>
      </div>
    )
  }

  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      const parts = name.split(" ")
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return name.slice(0, 2).toUpperCase()
    }
    return email ? email.slice(0, 2).toUpperCase() : "U"
  }

  // Usuario autenticado - mostrar avatar con iniciales
  return (
    <div className="group relative">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        <span className="text-xs font-semibold">
          {getInitials(session.user.name, session.user.email)}
        </span>
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 origin-top-right scale-0 rounded-md border bg-popover py-1 shadow-lg transition-transform group-hover:scale-100 z-50">
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium truncate">{session.user.name || session.user.email}</p>
          <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
        </div>

        <Link
          href="/profile"
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
        >
          <User className="h-4 w-4" />
          Mi Perfil
        </Link>

        <Link
          href="/orders"
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
        >
          <Package className="h-4 w-4" />
          Mis Pedidos
        </Link>

        {session.user.role === "ADMIN" && (
          <Link
            href="/admin/store"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
          >
            <Store className="h-4 w-4" />
            Tienda
          </Link>
        )}

        <div className="border-t">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
