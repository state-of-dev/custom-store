import { ShopLinks } from "../shop-links"
import type { Collection } from "@/lib/shopify/types"

interface HomeSidebarProps {
  collections: Collection[]
}

export function HomeSidebar({ collections }: HomeSidebarProps) {
  return (
    <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
      <div>
        <p className="italic tracking-tighter text-base">Perfumes y moda.</p>
        <div className="mt-5 text-base leading-tight">
          <p>Fragancias de autor y piezas de diseño.</p>
          <p>Disponible en CDMX, Guadalajara y Monterrey.</p>
          {/* <p>Tu estilo, tu esencia — sin compromisos.</p> */}
        </div>
      </div>
      <ShopLinks collections={collections} />
    </aside>
  )
}
