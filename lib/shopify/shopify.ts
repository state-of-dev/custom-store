import { ProductCollectionSortKey, ProductSortKey, ShopifyCart, ShopifyCollection, ShopifyProduct } from './types';

// Mock data for perfumes store with Unsplash images
const mockCollections: ShopifyCollection[] = [
  {
    id: 'collection-1',
    title: 'Resinas & Bálsamos',
    handle: 'florales',
    description: 'Mirra, benjuí, opopónax. Materias que arden lento y dejan huella.',
  },
  {
    id: 'collection-2',
    title: 'Cuero & Humo',
    handle: 'amaderadas',
    description: 'Cuero curtido, tabaco negro, birch tar. Sin concesiones.',
  },
  {
    id: 'collection-3',
    title: 'Raíces & Tierra',
    handle: 'citricas',
    description: 'Vetiver, pachulí, tierra húmeda. Lo que está debajo.',
  },
  {
    id: 'collection-4',
    title: 'Oud & Especias',
    handle: 'orientales',
    description: 'Oud, azafrán, pimienta. Densidad que no pide permiso.',
  },
];

const mockProducts: ShopifyProduct[] = [
  {
    id: 'product-1',
    title: 'Mirra Negra',
    description: 'Mirra cruda, opopónax y benjuí. Una resina que no se explica, se lleva. Fondo de tierra seca y labdanum que persiste horas después de que te fuiste.',
    descriptionHtml: '<p>Mirra cruda, opopónax y benjuí. Una resina que no se explica, se lleva. Fondo de tierra seca y labdanum que persiste horas después de que te fuiste.</p>',
    handle: 'mirra-negra',
    productType: 'Resinas & Bálsamos',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/tron-le-UNo5_hVWe9E-unsplash.jpg', altText: 'Mirra Negra' } },
        { node: { url: '/perfumes/tron-le-5JFX82Pk5-I-unsplash.jpg', altText: 'Mirra Negra Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '115.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-1-1', title: '30ml', price: { amount: '115.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-1-2', title: '50ml', price: { amount: '165.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-1-3', title: '100ml', price: { amount: '230.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-2',
    title: 'Cuero Crudo',
    description: 'Birch tar, cuero sin curtir, aldehídos ahumados. No es delicado. Es la cosa más honesta que puedes ponerte.',
    descriptionHtml: '<p>Birch tar, cuero sin curtir, aldehídos ahumados. No es delicado. Es la cosa más honesta que puedes ponerte.</p>',
    handle: 'cuero-crudo',
    productType: 'Cuero & Humo',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/jay-soundo-r59locia7KA-unsplash.jpg', altText: 'Cuero Crudo' } },
        { node: { url: '/perfumes/jay-soundo-QkC2gICf0zc-unsplash.jpg', altText: 'Cuero Crudo Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '149.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-2-1', title: '30ml', price: { amount: '149.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-2-2', title: '50ml', price: { amount: '199.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-2-3', title: '100ml', price: { amount: '279.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-3',
    title: 'Vetiver / Tierra',
    description: 'Vetiver de Haití sin filtrar. Raíz, humedad, arcilla. Una fragancia que huele a lo que está debajo de todo lo demás.',
    descriptionHtml: '<p>Vetiver de Haití sin filtrar. Raíz, humedad, arcilla. Una fragancia que huele a lo que está debajo de todo lo demás.</p>',
    handle: 'vetiver-tierra',
    productType: 'Raíces & Tierra',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/mahbod-akhzami-ao17WB4tCTQ-unsplash.jpg', altText: 'Vetiver Tierra' } },
        { node: { url: '/perfumes/cosmin-ursea-WzP_9jJ16gQ-unsplash.jpg', altText: 'Vetiver Tierra Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '95.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-3-1', title: '30ml', price: { amount: '95.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-3-2', title: '50ml', price: { amount: '139.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-3-3', title: '100ml', price: { amount: '195.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-4',
    title: 'Azafrán Oscuro',
    description: 'Azafrán iraní, oud fermentado, pimienta de Cubeba. Una apertura que golpea y un fondo que no se va. Para quienes no necesitan explicar lo que llevan puesto.',
    descriptionHtml: '<p>Azafrán iraní, oud fermentado, pimienta de Cubeba. Una apertura que golpea y un fondo que no se va. Para quienes no necesitan explicar lo que llevan puesto.</p>',
    handle: 'azafran-oscuro',
    productType: 'Oud & Especias',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/chenbushi-Dxgp0wVQbLU-unsplash.jpg', altText: 'Azafrán Oscuro' } },
        { node: { url: '/perfumes/pavlo-talpa-SIKp2vihB_s-unsplash.jpg', altText: 'Azafrán Oscuro Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '185.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '220.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-4-1', title: '30ml', price: { amount: '185.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-4-2', title: '50ml', price: { amount: '255.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-4-3', title: '100ml', price: { amount: '360.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-5',
    title: 'Tonka / Incienso',
    description: 'Tonka bean tostada, incienso de Omán, vetiver ahumado. Dulce solo en la distancia. De cerca, es otra cosa.',
    descriptionHtml: '<p>Tonka bean tostada, incienso de Omán, vetiver ahumado. Dulce solo en la distancia. De cerca, es otra cosa.</p>',
    handle: 'tonka-incienso',
    productType: 'Resinas & Bálsamos',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/sonia-dauer-eTMMCz6JI6s-unsplash.jpg', altText: 'Tonka Incienso' } },
        { node: { url: '/perfumes/tron-le-DH-qHdWsKYc-unsplash.jpg', altText: 'Tonka Incienso Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '125.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-5-1', title: '30ml', price: { amount: '125.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-5-2', title: '50ml', price: { amount: '175.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-5-3', title: '100ml', price: { amount: '245.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-6',
    title: 'Tabaco Negro',
    description: 'Tabaco Virginia oscuro, cuero viejo, pimienta roja y un hilo de ámbar gris. No es una fragancia que pide permiso para entrar.',
    descriptionHtml: '<p>Tabaco Virginia oscuro, cuero viejo, pimienta roja y un hilo de ámbar gris. No es una fragancia que pide permiso para entrar.</p>',
    handle: 'tabaco-negro',
    productType: 'Cuero & Humo',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/beautinow-niche-perfume-CAqsBQ9kXko-unsplash.jpg', altText: 'Tabaco Negro' } },
        { node: { url: '/perfumes/beautinow-niche-perfume-M_zlqkBJExM-unsplash.jpg', altText: 'Tabaco Negro Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '135.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-6-1', title: '30ml', price: { amount: '135.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-6-2', title: '50ml', price: { amount: '185.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-6-3', title: '100ml', price: { amount: '259.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-7',
    title: 'Pachulí Crudo',
    description: 'Pachulí sin procesar, raíz de iris, musgo de roble húmedo. La fragancia que usaban antes de que todo se volviera higienizado. Polarizante a propósito.',
    descriptionHtml: '<p>Pachulí sin procesar, raíz de iris, musgo de roble húmedo. La fragancia que usaban antes de que todo se volviera higienizado. Polarizante a propósito.</p>',
    handle: 'pachuli-crudo',
    productType: 'Raíces & Tierra',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/jay-soundo-aWEnLrHGu0M-unsplash.jpg', altText: 'Pachulí Crudo' } },
        { node: { url: '/perfumes/jay-soundo-K0RHgO7dvYM-unsplash.jpg', altText: 'Pachulí Crudo Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '89.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '110.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-7-1', title: '30ml', price: { amount: '89.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-7-2', title: '50ml', price: { amount: '129.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-7-3', title: '100ml', price: { amount: '185.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-8',
    title: 'Oud Kamini',
    description: 'Oud camboyano ahumado, rosa negra de Taif, resina de styrax. La materia prima antes de que la perfumería la domesticara. Cruda, densa, sin disculpas.',
    descriptionHtml: '<p>Oud camboyano ahumado, rosa negra de Taif, resina de styrax. La materia prima antes de que la perfumería la domesticara. Cruda, densa, sin disculpas.</p>',
    handle: 'oud-kamini',
    productType: 'Oud & Especias',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/tron-le-UMTh7DFMx6s-unsplash.jpg', altText: 'Oud Kamini' } },
        { node: { url: '/perfumes/beautinow-niche-perfume-Oi9vbSj6mCU-unsplash.jpg', altText: 'Oud Kamini Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '245.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-8-1', title: '30ml', price: { amount: '245.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-8-2', title: '50ml', price: { amount: '345.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-8-3', title: '100ml', price: { amount: '480.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-9',
    title: 'Labdanum / Cistus',
    description: 'Labdanum puro, cistus, ámbar gris, musgo de roble. El olor del Mediterráneo antes del turismo. Antiguo, terroso, sin artificios.',
    descriptionHtml: '<p>Labdanum puro, cistus, ámbar gris, musgo de roble. El olor del Mediterráneo antes del turismo. Antiguo, terroso, sin artificios.</p>',
    handle: 'labdanum-cistus',
    productType: 'Resinas & Bálsamos',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/tron-le-5JFX82Pk5-I-unsplash.jpg', altText: 'Labdanum Cistus' } },
        { node: { url: '/perfumes/tron-le-UNo5_hVWe9E-unsplash.jpg', altText: 'Labdanum Cistus Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '135.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-9-1', title: '30ml', price: { amount: '135.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-9-2', title: '50ml', price: { amount: '189.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-9-3', title: '100ml', price: { amount: '265.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-10',
    title: 'Gaiac Ahumado',
    description: 'Madera de gaiac quemada, vetiver carbonizado, pimienta negra. Lo que queda después del fuego. Una fragancia para quienes ya no necesitan llamar la atención.',
    descriptionHtml: '<p>Madera de gaiac quemada, vetiver carbonizado, pimienta negra. Lo que queda después del fuego. Una fragancia para quienes ya no necesitan llamar la atención.</p>',
    handle: 'gaiac-ahumado',
    productType: 'Cuero & Humo',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/chenbushi-Dxgp0wVQbLU-unsplash.jpg', altText: 'Gaiac Ahumado' } },
        { node: { url: '/perfumes/mahbod-akhzami-ao17WB4tCTQ-unsplash.jpg', altText: 'Gaiac Ahumado Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '155.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '185.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-10-1', title: '30ml', price: { amount: '155.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-10-2', title: '50ml', price: { amount: '215.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-10-3', title: '100ml', price: { amount: '299.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-11',
    title: 'Iris / Polvo',
    description: 'Raíz de iris en bruto, polvo de violeta, suelo seco. Fría como mármol en la apertura, terrosa al final. Una fragancia que no intenta agradar a nadie.',
    descriptionHtml: '<p>Raíz de iris en bruto, polvo de violeta, suelo seco. Fría como mármol en la apertura, terrosa al final. Una fragancia que no intenta agradar a nadie.</p>',
    handle: 'iris-polvo',
    productType: 'Raíces & Tierra',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/sonia-dauer-eTMMCz6JI6s-unsplash.jpg', altText: 'Iris Polvo' } },
        { node: { url: '/perfumes/cosmin-ursea-WzP_9jJ16gQ-unsplash.jpg', altText: 'Iris Polvo Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '105.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-11-1', title: '30ml', price: { amount: '105.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-11-2', title: '50ml', price: { amount: '149.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-11-3', title: '100ml', price: { amount: '209.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-12',
    title: 'Encens Noir',
    description: 'Incienso somalí, resina de elemi, pimienta de Sichuan, oud negro. La iglesia vacía a las tres de la mañana. No es para todo el mundo. Está bien así.',
    descriptionHtml: '<p>Incienso somalí, resina de elemi, pimienta de Sichuan, oud negro. La iglesia vacía a las tres de la mañana. No es para todo el mundo. Está bien así.</p>',
    handle: 'encens-noir',
    productType: 'Oud & Especias',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: '/perfumes/pavlo-talpa-SIKp2vihB_s-unsplash.jpg', altText: 'Encens Noir' } },
        { node: { url: '/perfumes/beautinow-niche-perfume-Oi9vbSj6mCU-unsplash.jpg', altText: 'Encens Noir Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '295.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '350.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-12-1', title: '30ml', price: { amount: '295.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-12-2', title: '50ml', price: { amount: '425.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-12-3', title: '100ml', price: { amount: '595.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
];

// Map products to collections
const productCollectionMap: Record<string, string[]> = {
  'florales': ['product-1', 'product-5', 'product-9'],
  'amaderadas': ['product-2', 'product-6', 'product-10'],
  'citricas': ['product-3', 'product-7', 'product-11'],
  'orientales': ['product-4', 'product-8', 'product-12'],
  'frontpage': ['product-1', 'product-2', 'product-3', 'product-4', 'product-5', 'product-6', 'product-7', 'product-8', 'product-9', 'product-10', 'product-11', 'product-12'],
};

// In-memory cart storage
let mockCart: ShopifyCart | null = null;

// Get all products
export async function getProducts({
  first = 20,
  sortKey = 'CREATED_AT' as ProductSortKey,
  reverse = false,
  query: searchQuery,
}: {
  first?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<ShopifyProduct[]> {
  let products = [...mockProducts];

  // Filter by search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.productType.toLowerCase().includes(q)
    );
  }

  // Sort products
  if (sortKey === 'PRICE') {
    products.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'TITLE') {
    products.sort((a, b) => reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
  }

  return products.slice(0, first);
}

// Get single product by handle
export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  return mockProducts.find(p => p.handle === handle) || null;
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  return mockCollections.slice(0, first);
}

// Get products from a specific collection
export async function getCollectionProducts({
  collection,
  limit = 20,
  sortKey = 'COLLECTION_DEFAULT' as ProductCollectionSortKey,
  query: searchQuery,
  reverse = false,
}: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  query?: string;
  reverse?: boolean;
}): Promise<ShopifyProduct[]> {
  const productIds = productCollectionMap[collection] || productCollectionMap['frontpage'];
  let products = mockProducts.filter(p => productIds.includes(p.id));

  // Filter by search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sort products
  if (sortKey === 'PRICE') {
    products.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'TITLE') {
    products.sort((a, b) => reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
  }

  if (reverse && sortKey === 'COLLECTION_DEFAULT') {
    products.reverse();
  }

  return products.slice(0, limit);
}

// Create cart
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
  };
  return mockCart;
}

// Helper to recalculate cart totals
function recalculateCartTotals(cart: ShopifyCart): void {
  let total = 0;
  for (const edge of cart.lines.edges) {
    total += parseFloat(edge.node.merchandise.price.amount) * edge.node.quantity;
  }
  cart.cost.totalAmount.amount = total.toFixed(2);
  cart.cost.subtotalAmount.amount = total.toFixed(2);
}

// Add items to cart
export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart();
  }

  for (const line of lines) {
    // Find the variant
    let foundVariant = null;
    let foundProduct = null;

    for (const product of mockProducts) {
      for (const variantEdge of product.variants.edges) {
        if (variantEdge.node.id === line.merchandiseId) {
          foundVariant = variantEdge.node;
          foundProduct = product;
          break;
        }
      }
      if (foundVariant) break;
    }

    if (foundVariant && foundProduct) {
      // Check if already in cart
      const existingIndex = mockCart.lines.edges.findIndex(
        e => e.node.merchandise.id === line.merchandiseId
      );

      if (existingIndex >= 0) {
        mockCart.lines.edges[existingIndex].node.quantity += line.quantity;
      } else {
        mockCart.lines.edges.push({
          node: {
            id: 'line-' + Date.now() + '-' + Math.random(),
            quantity: line.quantity,
            merchandise: {
              id: foundVariant.id,
              title: foundVariant.title,
              price: foundVariant.price,
              selectedOptions: foundVariant.selectedOptions || [],
              product: {
                title: foundProduct.title,
                handle: foundProduct.handle,
                images: foundProduct.images,
              },
            },
          },
        });
      }
    }
  }

  recalculateCartTotals(mockCart);
  return mockCart;
}

// Update items in cart
export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart();
  }

  for (const line of lines) {
    const index = mockCart.lines.edges.findIndex(e => e.node.id === line.id);
    if (index >= 0) {
      if (line.quantity <= 0) {
        mockCart.lines.edges.splice(index, 1);
      } else {
        mockCart.lines.edges[index].node.quantity = line.quantity;
      }
    }
  }

  recalculateCartTotals(mockCart);
  return mockCart;
}

// Remove items from cart
export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  if (!mockCart) {
    mockCart = await createCart();
  }

  mockCart.lines.edges = mockCart.lines.edges.filter(
    e => !lineIds.includes(e.node.id)
  );

  recalculateCartTotals(mockCart);
  return mockCart;
}

// Get cart
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  return mockCart;
}
