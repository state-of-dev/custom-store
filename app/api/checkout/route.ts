import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const authSession = await getServerSession(authOptions)
    const { items, customerInfo } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 })
    }

    // Generar número de orden único
    const orderNumber = `PC-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    console.log("Creating checkout session for order:", orderNumber)
    console.log("Items:", items)
    console.log("Customer:", customerInfo)

    // Calcular totales
    const subtotal = items.reduce((sum: number, item: any) =>
      sum + (item.price * item.quantity), 0)
    const shipping = 99 // $99 MXN envío fijo
    const total = subtotal + shipping

    // Crear line items para Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.productName,
          description: item.variantName,
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }))

    // Agregar shipping como line item
    lineItems.push({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: 'Envío estándar',
          description: 'Entrega en 3-7 días hábiles',
        },
        unit_amount: 9900, // $99 MXN
      },
      quantity: 1,
    })

    // Crear Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?order=${orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?cancelled=true`,
      customer_email: customerInfo.email,
      metadata: {
        order_number: orderNumber,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        shipping_address: JSON.stringify(customerInfo.address),
        items_data: JSON.stringify(items),
        subtotal: subtotal.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
      },
    })

    console.log("Stripe session created:", stripeSession.id)

    // Guardar la orden en la base de datos
    await prisma.order.create({
      data: {
        orderNumber,
        userId: authSession?.user?.id,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        shippingAddress: JSON.stringify(customerInfo.address),
        subtotal,
        shipping,
        total,
        status: 'PROCESANDO',
        paymentStatus: 'PENDING',
        stripeSessionId: stripeSession.id,
        items: {
          create: items.map((item: any) => ({
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            price: item.price,
            quantity: item.quantity,
          }))
        }
      }
    })

    console.log("Order saved to database:", orderNumber)

    return NextResponse.json({
      url: stripeSession.url,
      orderNumber,
      sessionId: stripeSession.id
    })
  } catch (error: any) {
    console.error("Error en checkout:", error)
    return NextResponse.json(
      { error: error.message || "Error al crear sesión de pago" },
      { status: 500 }
    )
  }
}
