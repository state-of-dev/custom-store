"use client"

import { VariantOptionSelector } from "@/components/products/variant-selector"
import type { Product } from "@/lib/shopify/types"

export function VariantSelectorSlots({ product, fallback }: { product: Product; fallback?: boolean }) {
  const { options } = product

  const hasNoOptionsOrJustOneOption = !options.length || (options.length === 1 && options[0]?.values.length === 1)

  if (hasNoOptionsOrJustOneOption) {
    return null
  }

  if (fallback) {
    return (
      <>
        {options.map((option) => (
          <div key={option.id} className="rounded-lg bg-popover py-2.5 px-3 justify-between flex items-start gap-4">
            <div className="text-base font-semibold leading-7">{option.name}</div>
            <div className="flex flex-wrap gap-2">
              {option.values.slice(0, 3).map((value) => (
                <div key={value.id} className="h-8 w-16 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {options.map((option) => (
        <VariantOptionSelector key={option.id} option={option} product={product} variant="card" />
      ))}
    </>
  )
}
