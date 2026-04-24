import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { emailType, email, userName } = await request.json()

    if (!email || !emailType) {
      return NextResponse.json({ error: 'Email and type are required' }, { status: 400 })
    }

    let result

    switch (emailType) {
      case 'paymentReminder':
        result = await emailService.sendPaymentReminder(
          email, 
          userName || 'Test User', 
          '$10.00', 
          '2024-01-15'
        )
        break
      
      case 'accountSuspension':
        result = await emailService.sendAccountSuspension(
          email, 
          userName || 'Test User', 
          'Payment overdue'
        )
        break
      
      case 'ticketResponse':
        result = await emailService.sendTicketResponse(
          email, 
          userName || 'Test User', 
          '12345', 
          'Thank you for contacting us. We have resolved your issue.'
        )
        break
      
      case 'passwordReset':
        result = await emailService.sendPasswordReset(
          email, 
          userName || 'Test User', 
          `https://communitypledges.com/reset-password?token=test123`
        )
        break
      
      case 'declinedPayment':
        result = await emailService.sendDeclinedPayment(
          email, 
          userName || 'Test User', 
          '$15.00', 
          'Insufficient funds'
        )
        break
      
      case 'receivedPayment':
        result = await emailService.sendReceivedPayment(
          email, 
          userName || 'Test User', 
          '$25.00', 
          'Test Server'
        )
        break
      
      case 'removedPledge':
        result = await emailService.sendRemovedPledge(
          'test-user-id',
          email, 
          userName || 'Test User', 
          'Test Server', 
          'Payment method expired'
        )
        break
      
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      result,
      message: `Test ${emailType} email sent to ${email}` 
    })
  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 })
  }
}