"use client"

import { Button } from "@/components/ui/button"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto mb-4 mt-top-spacing flex max-w-xl flex-col rounded-lg border border-border bg-white p-8 md:p-12">
      <h2 className="text-xl font-bold">¡Oh no!</h2>
      <p className="my-2">
        Hubo un problema con nuestra tienda. Esto podría ser un problema temporal, por favor intenta tu acción
        nuevamente.
      </p>
      <Button size="lg" className="mt-4" onClick={() => reset()}>
        Intentar de Nuevo
      </Button>
    </div>
  )
}
