import { prisma } from '@/lib/prisma'
import type { ShopifyProduct, ShopifyCollection, ShopifyCart, ShopifyCartLine, ProductSortKey, ProductCollectionSortKey } from './types'

// Adapter: convierte producto de Prisma a formato Shopify
function adaptProductToShopify(product: any): ShopifyProduct {
  const variants = product.variants || []
  const images = product.images || []

  // Calcular precio mínimo y máximo
  const prices = variants.map((v: any) => parseFloat(v.priceAmount))
  const minPrice = Math.min(...prices).toFixed(2)
  const compareAtPrices = variants
    .map((v: any) => v.compareAtPrice ? parseFloat(v.compareAtPrice) : 0)
    .filter((p: number) => p > 0)
  const minCompareAtPrice = compareAtPrices.length > 0 ? Math.min(...compareAtPrices).toFixed(2) : '0'

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    handle: product.handle,
    productType: product.productType,
    options: [
      { id: 'size', name: 'Tamaño', values: Array.from(new Set(variants.map((v: any) => v.title))) as string[] }
    ],
    images: {
      edges: images.map((img: any) => ({
        node: {
          url: img.url,
          altText: img.altText,
        }
      }))
    },
    priceRange: {
      minVariantPrice: {
        amount: minPrice,
        currencyCode: 'USD',
      }
    },
    compareAtPriceRange: {
      minVariantPrice: {
        amount: minCompareAtPrice,
        currencyCode: 'USD',
      }
    },
    variants: {
      edges: variants.map((variant: any) => ({
        node: {
          id: variant.sku,
          title: variant.title,
          price: {
            amount: variant.priceAmount,
            currencyCode: variant.priceCurrency,
          },
          availableForSale: variant.availableForSale,
          selectedOptions: [
            { name: 'Tamaño', value: variant.title }
          ]
        }
      }))
    }
  }
}

// Get all products
export async function getProducts({
  first = 20,
  sortKey = 'CREATED_AT' as ProductSortKey,
  reverse = false,
  query: searchQuery,
}: {
  first?: number
  sortKey?: ProductSortKey
  reverse?: boolean
  query?: string
}): Promise<ShopifyProduct[]> {
  const where: any = { status: 'active' }

  // Filter by search query
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { description: { contains: searchQuery, mode: 'insensitive' } },
      { productType: { contains: searchQuery, mode: 'insensitive' } },
    ]
  }

  // Build orderBy
  let orderBy: any = {}
  if (sortKey === 'TITLE') {
    orderBy = { title: reverse ? 'desc' : 'asc' }
  } else if (sortKey === 'PRICE') {
    // Para precio necesitamos ordenar por el mínimo de variants
    // Por ahora usamos createdAt como fallback
    orderBy = { createdAt: reverse ? 'asc' : 'desc' }
  } else {
    orderBy = { createdAt: reverse ? 'asc' : 'desc' }
  }

  const products = await prisma.product.findMany({
    where,
    take: first,
    orderBy,
    include: {
      variants: true,
      images: {
        orderBy: { position: 'asc' }
      }
    }
  })

  return products.map(adaptProductToShopify)
}

// Get single product by handle
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const product = await prisma.product.findUnique({
    where: { handle },
    include: {
      variants: true,
      images: {
        orderBy: { position: 'asc' }
      }
    }
  })

  if (!product) return null
  return adaptProductToShopify(product)
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const collections = await prisma.collection.findMany({
    take: first,
  })

  return collections.map(col => ({
    id: col.id,
    title: col.title,
    handle: col.handle,
    description: col.description,
  }))
}

// Get products from a specific collection
export async function getCollectionProducts({
  collection,
  limit = 20,
  sortKey = 'COLLECTION_DEFAULT' as ProductCollectionSortKey,
  query: searchQuery,
  reverse = false,
}: {
  collection: string
  limit?: number
  sortKey?: ProductCollectionSortKey
  query?: string
  reverse?: boolean
}): Promise<ShopifyProduct[]> {
  const where: any = { status: 'active' }

  // Filtrar por tipo de producto basado en la colección
  const collectionTypeMap: Record<string, string> = {
    'florales': 'Floral',
    'amaderadas': 'Amaderado',
    'citricas': 'Cítrico',
    'orientales': 'Oriental',
  }

  if (collection !== 'frontpage' && collectionTypeMap[collection]) {
    where.productType = collectionTypeMap[collection]
  }

  // Filter by search query
  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { description: { contains: searchQuery, mode: 'insensitive' } },
    ]
  }

  // Build orderBy
  let orderBy: any = {}
  if (sortKey === 'TITLE') {
    orderBy = { title: reverse ? 'desc' : 'asc' }
  } else if (sortKey === 'PRICE') {
    orderBy = { createdAt: reverse ? 'asc' : 'desc' }
  } else {
    orderBy = { createdAt: reverse ? 'asc' : 'desc' }
  }

  const products = await prisma.product.findMany({
    where,
    take: limit,
    orderBy,
    include: {
      variants: true,
      images: {
        orderBy: { position: 'asc' }
      }
    }
  })

  return products.map(adaptProductToShopify)
}

// Mock cart functions (mantenemos igual por ahora)
let mockCart: ShopifyCart | null = null

export async function createCart(): Promise<ShopifyCart> {
  mockCart = {
    id: 'cart-' + Date.now(),
    lines: { edges: [] },
    cost: {
      totalAmount: { amount: '0', currencyCode: 'USD' },
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' },
    },
    checkoutUrl: '#',
  }
  return mockCart
}

function recalculateCartTotals(cart: ShopifyCart): void {
  let total = 0
  for (const edge of cart.lines.edges) {
    total += parseFloat(edge.node.merchandise.price.amount) * edge.node.quantity
  }
  cart.cost.totalAmount.amount = total.toFixed(2)
  cart.cost.subtotalAmount.amount = total.toFixed(2)
}

export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart()
  }

  for (const line of lines) {
    // Buscar la variante en la DB
    const variant = await prisma.productVariant.findUnique({
      where: { sku: line.merchandiseId },
      include: {
        product: {
          include: { images: true }
        }
      }
    })

    if (variant) {
      const existingIndex = mockCart.lines.edges.findIndex(
        e => e.node.merchandise.id === line.merchandiseId
      )

      if (existingIndex >= 0) {
        mockCart.lines.edges[existingIndex].node.quantity += line.quantity
      } else {
        mockCart.lines.edges.push({
          node: {
            id: 'line-' + Date.now() + '-' + Math.random(),
            quantity: line.quantity,
            merchandise: {
              id: variant.sku,
              title: variant.title,
              price: {
                amount: variant.priceAmount,
                currencyCode: variant.priceCurrency,
              },
              selectedOptions: [
                { name: 'Tamaño', value: variant.title }
              ],
              product: {
                title: variant.product.title,
                handle: variant.product.handle,
                images: {
                  edges: variant.product.images.map(img => ({
                    node: {
                      url: img.url,
                      altText: img.altText,
                    }
                  }))
                },
              },
            },
          },
        })
      }
    }
  }

  recalculateCartTotals(mockCart)
  return mockCart
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart()
  }

  for (const line of lines) {
    const index = mockCart.lines.edges.findIndex(e => e.node.id === line.id)
    if (index >= 0) {
      if (line.quantity <= 0) {
        mockCart.lines.edges.splice(index, 1)
      } else {
        mockCart.lines.edges[index].node.quantity = line.quantity
      }
    }
  }

  recalculateCartTotals(mockCart)
  return mockCart
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart()
  }

  mockCart.lines.edges = mockCart.lines.edges.filter(
    e => !lineIds.includes(e.node.id)
  )

  recalculateCartTotals(mockCart)
  return mockCart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  return mockCart
}
