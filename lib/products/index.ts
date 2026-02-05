import {
  getCollections as getDbCollections,
  getProducts as getDbProducts,
  getCollectionProducts as getDbCollectionProducts,
  getProduct as getDbProduct,
} from './queries';
import { thumbhashToDataURL } from '../shopify/utils';
import type {
  Product,
  Collection,
  Cart,
  ProductOption,
  ProductVariant,
  Money,
  ProductCollectionSortKey,
  ProductSortKey,
} from './types';

// Internal raw product type from database
type RawProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  category?: {
    id: string;
    name: string;
  };
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
        thumbhash?: string;
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
        selectedOptions?: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
};

// Utility function to extract the first sentence from a description
function getFirstSentence(text: string): string {
  if (!text) return '';

  const cleaned = text.trim();
  const match = cleaned.match(/^[^.!?]*[.!?]/);

  if (match) {
    return match[0].trim();
  }

  if (cleaned.length > 100) {
    return cleaned.substring(0, 100).trim() + '...';
  }

  return cleaned;
}

// Helper functions for consistent data transformation

function transformMoney(money: { amount: string; currencyCode: string } | undefined): Money {
  return {
    amount: money?.amount || '0',
    currencyCode: money?.currencyCode || 'USD',
  };
}

function transformOptions(
  options: Array<{ id?: string; name: string; values: string[] }>
): ProductOption[] {
  return options.map(option => ({
    id: option.id || option.name.toLowerCase().replace(/\s+/g, '-'),
    name: option.name,
    values: option.values.map(value => ({
      id: value.toLowerCase().replace(/\s+/g, '-'),
      name: value,
    })),
  }));
}

function transformVariants(variants: { edges: Array<{ node: any }> } | undefined): ProductVariant[] {
  if (!Array.isArray(variants?.edges)) return [];

  return variants.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title || '',
    availableForSale: edge.node.availableForSale !== false,
    price: transformMoney(edge.node.price),
    selectedOptions: edge.node.selectedOptions || [],
  }));
}

// Main adapter functions
function adaptCollection(collection: any): Collection {
  return {
    ...collection,
    seo: {
      title: collection.title,
      description: collection.description || '',
    },
    parentCategoryTree: [],
    updatedAt: new Date().toISOString(),
    path: `/shop/${collection.handle}`,
  };
}

function adaptProduct(rawProduct: RawProduct): Product {
  const firstImage = rawProduct.images?.edges?.[0]?.node;
  const description = getFirstSentence(rawProduct.description || '');

  return {
    ...rawProduct,
    description,
    categoryId: rawProduct.productType || rawProduct.category?.name,
    tags: [],
    availableForSale: true,
    currencyCode: rawProduct.priceRange?.minVariantPrice?.currencyCode || 'USD',
    featuredImage: firstImage
      ? {
          ...firstImage,
          altText: firstImage.altText || rawProduct.title || '',
          height: 600,
          width: 600,
          thumbhash: firstImage.thumbhash ? thumbhashToDataURL(firstImage.thumbhash) : undefined,
        }
      : { url: '', altText: '', height: 0, width: 0 },
    seo: {
      title: rawProduct.title || '',
      description,
    },
    priceRange: {
      minVariantPrice: transformMoney(rawProduct.priceRange?.minVariantPrice),
      maxVariantPrice: transformMoney(rawProduct.priceRange?.minVariantPrice),
    },
    compareAtPrice:
      rawProduct.compareAtPriceRange?.minVariantPrice &&
      parseFloat(rawProduct.compareAtPriceRange.minVariantPrice.amount) >
        parseFloat(rawProduct.priceRange?.minVariantPrice?.amount || '0')
        ? transformMoney(rawProduct.compareAtPriceRange.minVariantPrice)
        : undefined,
    images:
      rawProduct.images?.edges?.map(edge => ({
        ...edge.node,
        altText: edge.node.altText || rawProduct.title || '',
        height: 600,
        width: 600,
        thumbhash: edge.node.thumbhash ? thumbhashToDataURL(edge.node.thumbhash) : undefined,
      })) || [],
    options: transformOptions(rawProduct.options || []),
    variants: transformVariants(rawProduct.variants),
  };
}

// Public API functions
export async function getCollections(): Promise<Collection[]> {
  try {
    const collections = await getDbCollections();
    return collections.map(adaptCollection);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getCollection(handle: string): Promise<Collection | null> {
  try {
    const collections = await getDbCollections();
    const collection = collections.find(collection => collection.handle === handle);
    return collection ? adaptCollection(collection) : null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const rawProduct = await getDbProduct(handle);
    return rawProduct ? adaptProduct(rawProduct) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProducts(params: {
  limit?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  try {
    const rawProducts = await getDbProducts(params);
    return rawProducts.map(adaptProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCollectionProducts(params: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  try {
    const rawProducts = await getDbCollectionProducts(params);
    return rawProducts.map(adaptProduct);
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const { getCart: getCartAction } = await import('@/components/cart/actions');
    return await getCartAction();
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

// Re-export cart mutation functions
export { createCart, addCartLines, updateCartLines, removeCartLines } from '../shopify/shopify-db';
