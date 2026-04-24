import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch user's email preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const preferences = await prisma.userEmailPreferences.findUnique({
      where: { userId: session.user.id }
    })

    // If no preferences exist, return defaults
    if (!preferences) {
      return NextResponse.json({
        paymentReminders: true,
        accountSuspension: true,
        ticketResponses: true,
        passwordReset: true,
        declinedPayments: true,
        receivedPayments: true,
        removedPledge: true,
      })
    }

    return NextResponse.json({
      paymentReminders: preferences.paymentReminders,
      accountSuspension: preferences.accountSuspension,
      ticketResponses: preferences.ticketResponses,
      passwordReset: preferences.passwordReset,
      declinedPayments: preferences.declinedPayments,
      receivedPayments: preferences.receivedPayments,
      removedPledge: preferences.removedPledge,
    })
  } catch (error) {
    console.error('Error fetching email preferences:', error)
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 })
  }
}

// PUT - Update user's email preferences
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      paymentReminders,
      accountSuspension,
      ticketResponses,
      passwordReset,
      declinedPayments,
      receivedPayments,
      removedPledge,
    } = body

    // Upsert preferences (create if doesn't exist, update if it does)
    const preferences = await prisma.userEmailPreferences.upsert({
      where: { userId: session.user.id },
      update: {
        paymentReminders: paymentReminders ?? true,
        accountSuspension: accountSuspension ?? true,
        ticketResponses: ticketResponses ?? true,
        passwordReset: passwordReset ?? true,
        declinedPayments: declinedPayments ?? true,
        receivedPayments: receivedPayments ?? true,
        removedPledge: removedPledge ?? true,
      },
      create: {
        userId: session.user.id,
        paymentReminders: paymentReminders ?? true,
        accountSuspension: accountSuspension ?? true,
        ticketResponses: ticketResponses ?? true,
        passwordReset: passwordReset ?? true,
        declinedPayments: declinedPayments ?? true,
        receivedPayments: receivedPayments ?? true,
        removedPledge: removedPledge ?? true,
      }
    })

    return NextResponse.json({
      success: true,
      preferences: {
        paymentReminders: preferences.paymentReminders,
        accountSuspension: preferences.accountSuspension,
        ticketResponses: preferences.ticketResponses,
        passwordReset: preferences.passwordReset,
        declinedPayments: preferences.declinedPayments,
        receivedPayments: preferences.receivedPayments,
        removedPledge: preferences.removedPledge,
      }
    })
  } catch (error) {
    console.error('Error updating email preferences:', error)
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 })
  }
}


