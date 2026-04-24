import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { emailService } from "@/lib/email"
import Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
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
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment succeeded:", paymentIntent.id)
        
        // Send payment confirmation email
        if (paymentIntent.metadata?.userId && paymentIntent.metadata?.serverName) {
          try {
            const user = await prisma.user.findUnique({
              where: { id: paymentIntent.metadata.userId }
            })
            
            if (user?.email) {
              await emailService.sendReceivedPayment(
                user.email,
                user.name || 'User',
                `$${(paymentIntent.amount / 100).toFixed(2)}`,
                paymentIntent.metadata.serverName
              )
            }
          } catch (error) {
            console.error('Failed to send payment confirmation email:', error)
          }
        }
        
        // Payment tracking is handled by the cron job for pledges
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment failed:", paymentIntent.id)
        
        // Send declined payment email
        if (paymentIntent.metadata?.userId) {
          try {
            const user = await prisma.user.findUnique({
              where: { id: paymentIntent.metadata.userId }
            })
            
            if (user?.email) {
              await emailService.sendDeclinedPayment(
                user.email,
                user.name || 'User',
                `$${(paymentIntent.amount / 100).toFixed(2)}`,
                paymentIntent.last_payment_error?.message || 'Payment declined'
              )
            }
          } catch (error) {
            console.error('Failed to send declined payment email:', error)
          }
        }
        
        // Payment failures are handled by the cron job for pledges
        break
      }

      case "account.updated": {
        const account = event.data.object as Stripe.Account

        // Update user's Stripe Connect status
        const user = await prisma.user.findFirst({
          where: {
            stripeAccountId: account.id,
          },
        })

        if (user) {
          const isComplete = account.details_submitted && account.charges_enabled

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripeOnboardingComplete: isComplete,
              stripeAccountStatus: isComplete ? "active" : "pending",
            },
          })

          console.log("Account updated:", account.id, "Complete:", isComplete)
        }
        break
      }

      default:
        console.log("Unhandled event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
