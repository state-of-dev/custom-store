import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Manejar el evento
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        console.log("Checkout session completed:", session.id)
        console.log("Metadata:", session.metadata)

        // Actualizar el pedido en la base de datos
        const order = await prisma.order.update({
          where: {
            stripeSessionId: session.id,
          },
          data: {
            status: "PROCESANDO",
            paymentStatus: "PAID",
          },
        })

        console.log("Order updated to PROCESANDO:", order.orderNumber)
        break
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session

        // Marcar el pedido como cancelado si la sesión expiró
        await prisma.order.update({
          where: {
            stripeSessionId: session.id,
          },
          data: {
            status: "CANCELADO",
            paymentStatus: "FAILED",
          },
        })

        console.log("Order marked as CANCELADO (session expired)")
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
