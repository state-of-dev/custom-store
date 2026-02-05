import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Empezando seed de productos...')

  // Crear colecciones
  const collections = [
    {
      handle: 'florales',
      title: 'Fragancias Florales',
      description: 'Perfumes con notas florales delicadas y románticas',
    },
    {
      handle: 'amaderadas',
      title: 'Fragancias Amaderadas',
      description: 'Perfumes con notas de madera, cálidas y sofisticadas',
    },
    {
      handle: 'citricas',
      title: 'Fragancias Cítricas',
      description: 'Perfumes frescos y energizantes con notas cítricas',
    },
    {
      handle: 'orientales',
      title: 'Fragancias Orientales',
      description: 'Perfumes exóticos con especias y resinas',
    },
  ]

  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { handle: collection.handle },
      update: {},
      create: collection,
    })
  }

  console.log('✅ Colecciones creadas')

  // Datos de productos
  const products = [
    {
      handle: 'rosa-eterna',
      title: 'Rosa Eterna',
      description: 'Una fragancia floral exquisita que captura la esencia de rosas frescas al amanecer. Notas de salida de rosa damascena, corazón de peonía y fondo de almizcle blanco.',
      descriptionHtml: '<p>Una fragancia floral exquisita que captura la esencia de rosas frescas al amanecer. Notas de salida de rosa damascena, corazón de peonía y fondo de almizcle blanco.</p>',
      productType: 'Floral',
      images: [
        { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Rosa Eterna Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop', altText: 'Rosa Eterna Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-1-1', priceAmount: '89.00', compareAtPrice: '110.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-1-2', priceAmount: '129.00', compareAtPrice: '110.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-1-3', priceAmount: '189.00', compareAtPrice: '110.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'noir-absolu',
      title: 'Noir Absolu',
      description: 'Un perfume amaderado intenso y misterioso. Notas de oud, sándalo, vetiver y un toque de vainilla negra que deja una estela inolvidable.',
      descriptionHtml: '<p>Un perfume amaderado intenso y misterioso. Notas de oud, sándalo, vetiver y un toque de vainilla negra que deja una estela inolvidable.</p>',
      productType: 'Amaderado',
      images: [
        { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Noir Absolu Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&h=800&fit=crop', altText: 'Noir Absolu Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-2-1', priceAmount: '149.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-2-2', priceAmount: '199.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-2-3', priceAmount: '279.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'citrus-sunrise',
      title: 'Citrus Sunrise',
      description: 'Frescura mediterránea en cada gota. Bergamota italiana, limón de Amalfi, naranja sanguina y un fondo de cedro blanco para una experiencia revitalizante.',
      descriptionHtml: '<p>Frescura mediterránea en cada gota. Bergamota italiana, limón de Amalfi, naranja sanguina y un fondo de cedro blanco para una experiencia revitalizante.</p>',
      productType: 'Cítrico',
      images: [
        { url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=800&fit=crop', altText: 'Citrus Sunrise Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop', altText: 'Citrus Sunrise Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-3-1', priceAmount: '75.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-3-2', priceAmount: '110.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-3-3', priceAmount: '159.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'ambar-oriental',
      title: 'Ámbar Oriental',
      description: 'Un viaje sensorial a tierras lejanas. Ámbar dorado, incienso, cardamomo y pachulí se entrelazan en esta fragancia exótica y seductora.',
      descriptionHtml: '<p>Un viaje sensorial a tierras lejanas. Ámbar dorado, incienso, cardamomo y pachulí se entrelazan en esta fragancia exótica y seductora.</p>',
      productType: 'Oriental',
      images: [
        { url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop', altText: 'Ámbar Oriental Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&h=800&fit=crop', altText: 'Ámbar Oriental Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-4-1', priceAmount: '125.00', compareAtPrice: '150.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-4-2', priceAmount: '175.00', compareAtPrice: '150.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-4-3', priceAmount: '245.00', compareAtPrice: '150.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'jazmin-nocturno',
      title: 'Jazmín Nocturno',
      description: 'El encanto del jazmín bajo la luna. Jazmín sambac, tuberosa, ylang-ylang y un suave fondo de musgo blanco crean una fragancia floral hipnótica.',
      descriptionHtml: '<p>El encanto del jazmín bajo la luna. Jazmín sambac, tuberosa, ylang-ylang y un suave fondo de musgo blanco crean una fragancia floral hipnótica.</p>',
      productType: 'Floral',
      images: [
        { url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=800&fit=crop', altText: 'Jazmín Nocturno Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&h=800&fit=crop', altText: 'Jazmín Nocturno Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-5-1', priceAmount: '95.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-5-2', priceAmount: '139.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-5-3', priceAmount: '199.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'cedro-cuero',
      title: 'Cedro & Cuero',
      description: 'Masculinidad refinada en estado puro. Cedro del Atlas, cuero italiano, pimienta negra y un toque de tabaco rubio para el hombre sofisticado.',
      descriptionHtml: '<p>Masculinidad refinada en estado puro. Cedro del Atlas, cuero italiano, pimienta negra y un toque de tabaco rubio para el hombre sofisticado.</p>',
      productType: 'Amaderado',
      images: [
        { url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop', altText: 'Cedro & Cuero Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop', altText: 'Cedro & Cuero Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-6-1', priceAmount: '135.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-6-2', priceAmount: '185.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-6-3', priceAmount: '259.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'brisa-marina',
      title: 'Brisa Marina',
      description: 'El espíritu del océano capturado en un frasco. Notas acuáticas, sal marina, pomelo y madera flotante evocan la libertad de la costa.',
      descriptionHtml: '<p>El espíritu del océano capturado en un frasco. Notas acuáticas, sal marina, pomelo y madera flotante evocan la libertad de la costa.</p>',
      productType: 'Cítrico',
      images: [
        { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Brisa Marina Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Brisa Marina Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-7-1', priceAmount: '85.00', compareAtPrice: '99.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-7-2', priceAmount: '125.00', compareAtPrice: '99.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-7-3', priceAmount: '179.00', compareAtPrice: '99.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'especias-marrakech',
      title: 'Especias de Marrakech',
      description: 'Un bazar de aromas en tu piel. Azafrán, canela, comino y rosa turca se mezclan con oud y ámbar en esta fragancia oriental inolvidable.',
      descriptionHtml: '<p>Un bazar de aromas en tu piel. Azafrán, canela, comino y rosa turca se mezclan con oud y ámbar en esta fragancia oriental inolvidable.</p>',
      productType: 'Oriental',
      images: [
        { url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop', altText: 'Especias de Marrakech Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&h=800&fit=crop', altText: 'Especias de Marrakech Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-8-1', priceAmount: '165.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-8-2', priceAmount: '225.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-8-3', priceAmount: '315.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'lavanda-provenzal',
      title: 'Lavanda Provenzal',
      description: 'Los campos de lavanda de la Provenza francesa en una fragancia relajante. Lavanda silvestre, romero, salvia y un fondo de musgo de roble.',
      descriptionHtml: '<p>Los campos de lavanda de la Provenza francesa en una fragancia relajante. Lavanda silvestre, romero, salvia y un fondo de musgo de roble.</p>',
      productType: 'Floral',
      images: [
        { url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=800&fit=crop', altText: 'Lavanda Provenzal Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop', altText: 'Lavanda Provenzal Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-9-1', priceAmount: '79.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-9-2', priceAmount: '119.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-9-3', priceAmount: '169.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'vetiver-intenso',
      title: 'Vetiver Intenso',
      description: 'La tierra húmeda después de la lluvia. Vetiver haitiano, raíz de iris, madera de gaiac y un toque ahumado de incienso para una fragancia terrosa y elegante.',
      descriptionHtml: '<p>La tierra húmeda después de la lluvia. Vetiver haitiano, raíz de iris, madera de gaiac y un toque ahumado de incienso para una fragancia terrosa y elegante.</p>',
      productType: 'Amaderado',
      images: [
        { url: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&h=800&fit=crop', altText: 'Vetiver Intenso Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&h=800&fit=crop', altText: 'Vetiver Intenso Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-10-1', priceAmount: '145.00', compareAtPrice: '175.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-10-2', priceAmount: '195.00', compareAtPrice: '175.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-10-3', priceAmount: '275.00', compareAtPrice: '175.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'mandarina-siciliana',
      title: 'Mandarina Siciliana',
      description: 'Sol y vitalidad del Mediterráneo. Mandarina de Sicilia, neroli, petit grain y un fondo de almizcle blanco para una fragancia luminosa y optimista.',
      descriptionHtml: '<p>Sol y vitalidad del Mediterráneo. Mandarina de Sicilia, neroli, petit grain y un fondo de almizcle blanco para una fragancia luminosa y optimista.</p>',
      productType: 'Cítrico',
      images: [
        { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop', altText: 'Mandarina Siciliana Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop', altText: 'Mandarina Siciliana Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-11-1', priceAmount: '69.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-11-2', priceAmount: '99.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-11-3', priceAmount: '149.00', sizeMl: 100 },
      ],
    },
    {
      handle: 'oud-majestuoso',
      title: 'Oud Majestuoso',
      description: 'La esencia de la realeza oriental. Oud camboyano, rosa de Taif, azafrán iraní y ámbar gris en una fragancia opulenta y majestuosa.',
      descriptionHtml: '<p>La esencia de la realeza oriental. Oud camboyano, rosa de Taif, azafrán iraní y ámbar gris en una fragancia opulenta y majestuosa.</p>',
      productType: 'Oriental',
      images: [
        { url: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop', altText: 'Oud Majestuoso Perfume', position: 0 },
        { url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop', altText: 'Oud Majestuoso Detalle', position: 1 },
      ],
      variants: [
        { title: '30ml', sku: 'variant-12-1', priceAmount: '295.00', compareAtPrice: '350.00', sizeMl: 30 },
        { title: '50ml', sku: 'variant-12-2', priceAmount: '425.00', compareAtPrice: '350.00', sizeMl: 50 },
        { title: '100ml', sku: 'variant-12-3', priceAmount: '595.00', compareAtPrice: '350.00', sizeMl: 100 },
      ],
    },
  ]

  // Crear productos con sus variantes e imágenes
  for (const productData of products) {
    const { images, variants, ...productInfo } = productData

    const product = await prisma.product.upsert({
      where: { handle: productInfo.handle },
      update: {},
      create: {
        ...productInfo,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
      },
    })

    console.log(`✅ Producto creado: ${product.title}`)
  }

  console.log('🎉 Seed completado!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
