import { prisma } from '@/lib/prisma'
import type { ProductSortKey, ProductCollectionSortKey } from './types'

// Raw product type from database (internal use only)
type RawProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
};

type RawCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
};

// Adapter: convierte producto de Prisma a formato raw
function adaptProduct(product: any): RawProduct {
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
} = {}): Promise<RawProduct[]> {
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

  return products.map(adaptProduct)
}

// Get single product by handle
export async function getProduct(handle: string): Promise<RawProduct | null> {
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
  return adaptProduct(product)
}

// Get collections
export async function getCollections(first = 10): Promise<Collection[]> {
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
}): Promise<RawProduct[]> {
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

  return products.map(adaptProduct)
}
