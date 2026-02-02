import { ProductCollectionSortKey, ProductSortKey, ShopifyCart, ShopifyCollection, ShopifyProduct } from './types';

// Mock data for perfumes store with Unsplash images
const mockCollections: ShopifyCollection[] = [
  {
    id: 'collection-1',
    title: 'Fragancias Florales',
    handle: 'florales',
    description: 'Perfumes con notas florales delicadas y románticas',
  },
  {
    id: 'collection-2',
    title: 'Fragancias Amaderadas',
    handle: 'amaderadas',
    description: 'Perfumes con notas de madera, cálidas y sofisticadas',
  },
  {
    id: 'collection-3',
    title: 'Fragancias Cítricas',
    handle: 'citricas',
    description: 'Perfumes frescos y energizantes con notas cítricas',
  },
  {
    id: 'collection-4',
    title: 'Fragancias Orientales',
    handle: 'orientales',
    description: 'Perfumes exóticos con especias y resinas',
  },
];

const mockProducts: ShopifyProduct[] = [
  {
    id: 'product-1',
    title: 'Rosa Eterna',
    description: 'Una fragancia floral exquisita que captura la esencia de rosas frescas al amanecer. Notas de salida de rosa damascena, corazón de peonía y fondo de almizcle blanco.',
    descriptionHtml: '<p>Una fragancia floral exquisita que captura la esencia de rosas frescas al amanecer. Notas de salida de rosa damascena, corazón de peonía y fondo de almizcle blanco.</p>',
    handle: 'rosa-eterna',
    productType: 'Floral',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Rosa Eterna Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop', altText: 'Rosa Eterna Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '89.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '110.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-1-1', title: '30ml', price: { amount: '89.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-1-2', title: '50ml', price: { amount: '129.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-1-3', title: '100ml', price: { amount: '189.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-2',
    title: 'Noir Absolu',
    description: 'Un perfume amaderado intenso y misterioso. Notas de oud, sándalo, vetiver y un toque de vainilla negra que deja una estela inolvidable.',
    descriptionHtml: '<p>Un perfume amaderado intenso y misterioso. Notas de oud, sándalo, vetiver y un toque de vainilla negra que deja una estela inolvidable.</p>',
    handle: 'noir-absolu',
    productType: 'Amaderado',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Noir Absolu Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&h=800&fit=crop', altText: 'Noir Absolu Detalle' } },
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
    title: 'Citrus Sunrise',
    description: 'Frescura mediterránea en cada gota. Bergamota italiana, limón de Amalfi, naranja sanguina y un fondo de cedro blanco para una experiencia revitalizante.',
    descriptionHtml: '<p>Frescura mediterránea en cada gota. Bergamota italiana, limón de Amalfi, naranja sanguina y un fondo de cedro blanco para una experiencia revitalizante.</p>',
    handle: 'citrus-sunrise',
    productType: 'Cítrico',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=800&fit=crop', altText: 'Citrus Sunrise Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop', altText: 'Citrus Sunrise Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '75.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-3-1', title: '30ml', price: { amount: '75.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-3-2', title: '50ml', price: { amount: '110.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-3-3', title: '100ml', price: { amount: '159.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-4',
    title: 'Ámbar Oriental',
    description: 'Un viaje sensorial a tierras lejanas. Ámbar dorado, incienso, cardamomo y pachulí se entrelazan en esta fragancia exótica y seductora.',
    descriptionHtml: '<p>Un viaje sensorial a tierras lejanas. Ámbar dorado, incienso, cardamomo y pachulí se entrelazan en esta fragancia exótica y seductora.</p>',
    handle: 'ambar-oriental',
    productType: 'Oriental',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop', altText: 'Ámbar Oriental Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&h=800&fit=crop', altText: 'Ámbar Oriental Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '125.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '150.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-4-1', title: '30ml', price: { amount: '125.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-4-2', title: '50ml', price: { amount: '175.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-4-3', title: '100ml', price: { amount: '245.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-5',
    title: 'Jazmín Nocturno',
    description: 'El encanto del jazmín bajo la luna. Jazmín sambac, tuberosa, ylang-ylang y un suave fondo de musgo blanco crean una fragancia floral hipnótica.',
    descriptionHtml: '<p>El encanto del jazmín bajo la luna. Jazmín sambac, tuberosa, ylang-ylang y un suave fondo de musgo blanco crean una fragancia floral hipnótica.</p>',
    handle: 'jazmin-nocturno',
    productType: 'Floral',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=800&fit=crop', altText: 'Jazmín Nocturno Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&h=800&fit=crop', altText: 'Jazmín Nocturno Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '95.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-5-1', title: '30ml', price: { amount: '95.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-5-2', title: '50ml', price: { amount: '139.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-5-3', title: '100ml', price: { amount: '199.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-6',
    title: 'Cedro & Cuero',
    description: 'Masculinidad refinada en estado puro. Cedro del Atlas, cuero italiano, pimienta negra y un toque de tabaco rubio para el hombre sofisticado.',
    descriptionHtml: '<p>Masculinidad refinada en estado puro. Cedro del Atlas, cuero italiano, pimienta negra y un toque de tabaco rubio para el hombre sofisticado.</p>',
    handle: 'cedro-cuero',
    productType: 'Amaderado',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop', altText: 'Cedro & Cuero Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop', altText: 'Cedro & Cuero Detalle' } },
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
    title: 'Brisa Marina',
    description: 'El espíritu del océano capturado en un frasco. Notas acuáticas, sal marina, pomelo y madera flotante evocan la libertad de la costa.',
    descriptionHtml: '<p>El espíritu del océano capturado en un frasco. Notas acuáticas, sal marina, pomelo y madera flotante evocan la libertad de la costa.</p>',
    handle: 'brisa-marina',
    productType: 'Cítrico',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Brisa Marina Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Brisa Marina Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '85.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '99.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-7-1', title: '30ml', price: { amount: '85.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-7-2', title: '50ml', price: { amount: '125.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-7-3', title: '100ml', price: { amount: '179.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-8',
    title: 'Especias de Marrakech',
    description: 'Un bazar de aromas en tu piel. Azafrán, canela, comino y rosa turca se mezclan con oud y ámbar en esta fragancia oriental inolvidable.',
    descriptionHtml: '<p>Un bazar de aromas en tu piel. Azafrán, canela, comino y rosa turca se mezclan con oud y ámbar en esta fragancia oriental inolvidable.</p>',
    handle: 'especias-marrakech',
    productType: 'Oriental',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Especias de Marrakech Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=800&fit=crop', altText: 'Especias de Marrakech Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '165.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-8-1', title: '30ml', price: { amount: '165.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-8-2', title: '50ml', price: { amount: '225.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-8-3', title: '100ml', price: { amount: '315.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-9',
    title: 'Lavanda Provenzal',
    description: 'Los campos de lavanda de la Provenza francesa en una fragancia relajante. Lavanda silvestre, romero, salvia y un fondo de musgo de roble.',
    descriptionHtml: '<p>Los campos de lavanda de la Provenza francesa en una fragancia relajante. Lavanda silvestre, romero, salvia y un fondo de musgo de roble.</p>',
    handle: 'lavanda-provenzal',
    productType: 'Floral',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=800&fit=crop', altText: 'Lavanda Provenzal Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop', altText: 'Lavanda Provenzal Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '79.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-9-1', title: '30ml', price: { amount: '79.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-9-2', title: '50ml', price: { amount: '119.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-9-3', title: '100ml', price: { amount: '169.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-10',
    title: 'Vetiver Intenso',
    description: 'La tierra húmeda después de la lluvia. Vetiver haitiano, raíz de iris, madera de gaiac y un toque ahumado de incienso para una fragancia terrosa y elegante.',
    descriptionHtml: '<p>La tierra húmeda después de la lluvia. Vetiver haitiano, raíz de iris, madera de gaiac y un toque ahumado de incienso para una fragancia terrosa y elegante.</p>',
    handle: 'vetiver-intenso',
    productType: 'Amaderado',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&h=800&fit=crop', altText: 'Vetiver Intenso Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&h=800&fit=crop', altText: 'Vetiver Intenso Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '145.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '175.00', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-10-1', title: '30ml', price: { amount: '145.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-10-2', title: '50ml', price: { amount: '195.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-10-3', title: '100ml', price: { amount: '275.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-11',
    title: 'Mandarina Siciliana',
    description: 'Sol y vitalidad del Mediterráneo. Mandarina de Sicilia, neroli, petit grain y un fondo de almizcle blanco para una fragancia luminosa y optimista.',
    descriptionHtml: '<p>Sol y vitalidad del Mediterráneo. Mandarina de Sicilia, neroli, petit grain y un fondo de almizcle blanco para una fragancia luminosa y optimista.</p>',
    handle: 'mandarina-siciliana',
    productType: 'Cítrico',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop', altText: 'Mandarina Siciliana Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Mandarina Siciliana Detalle' } },
      ]
    },
    priceRange: { minVariantPrice: { amount: '69.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    variants: {
      edges: [
        { node: { id: 'variant-11-1', title: '30ml', price: { amount: '69.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '30ml' }] } },
        { node: { id: 'variant-11-2', title: '50ml', price: { amount: '99.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '50ml' }] } },
        { node: { id: 'variant-11-3', title: '100ml', price: { amount: '149.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Tamaño', value: '100ml' }] } },
      ]
    }
  },
  {
    id: 'product-12',
    title: 'Oud Majestuoso',
    description: 'La esencia de la realeza oriental. Oud camboyano, rosa de Taif, azafrán iraní y ámbar gris en una fragancia opulenta y majestuosa.',
    descriptionHtml: '<p>La esencia de la realeza oriental. Oud camboyano, rosa de Taif, azafrán iraní y ámbar gris en una fragancia opulenta y majestuosa.</p>',
    handle: 'oud-majestuoso',
    productType: 'Oriental',
    options: [
      { id: 'size', name: 'Tamaño', values: ['30ml', '50ml', '100ml'] }
    ],
    images: {
      edges: [
        { node: { url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop', altText: 'Oud Majestuoso Perfume' } },
        { node: { url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop', altText: 'Oud Majestuoso Detalle' } },
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
