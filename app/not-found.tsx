import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"

export default function NotFound() {
  return (
    <PageLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Página No Encontrada.{" "}
              <Link href="/" className="underline">
                Volver al Inicio
              </Link>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lo sentimos, no pudimos encontrar la página que buscas. La página pudo haber sido movida, eliminada, o
              ingresaste una URL incorrecta.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
