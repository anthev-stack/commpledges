import { Resend } from 'resend'
import { EMAIL_CONFIG, getSenderString } from './email-config'

let resendClient: Resend | null = null

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!resendClient) resendClient = new Resend(key)
  return resendClient
}

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
}

// Email template generators
export const emailTemplates = {
  paymentReminder: (userName: string, amount: string, dueDate: string): EmailTemplate => ({
    subject: 'Payment Reminder - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Payment Reminder</h2>
        <p>Hello ${userName},</p>
        <p>This is a friendly reminder that you have a payment of <strong>${amount}</strong> due on ${dueDate}.</p>
        <p>Please log in to your account to make the payment and avoid any service interruptions.</p>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/dashboard" 
             style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Dashboard
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `,
    text: `Payment Reminder - Hello ${userName}, you have a payment of ${amount} due on ${dueDate}. Please log in to your account to make the payment.`
  }),

  accountSuspension: (userName: string, reason: string): EmailTemplate => ({
    subject: 'Account Suspended - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Account Suspended</h2>
        <p>Hello ${userName},</p>
        <p>Your account has been suspended due to: <strong>${reason}</strong></p>
        <p>To reactivate your account, please contact our support team.</p>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/tickets/create" 
             style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Contact Support
          </a>
        </div>
      </div>
    `,
    text: `Account Suspended - Hello ${userName}, your account has been suspended due to: ${reason}. Please contact support to reactivate.`
  }),

  ticketResponse: (userName: string, ticketId: string, response: string): EmailTemplate => ({
    subject: `Ticket Response - #${ticketId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Ticket Response</h2>
        <p>Hello ${userName},</p>
        <p>We have responded to your support ticket #${ticketId}:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
          ${response}
        </div>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/tickets/${ticketId}" 
             style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Ticket
          </a>
        </div>
      </div>
    `,
    text: `Ticket Response - Hello ${userName}, we have responded to your support ticket #${ticketId}: ${response}`
  }),

  passwordReset: (userName: string, resetLink: string): EmailTemplate => ({
    subject: 'Password Reset - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8b5cf6;">Password Reset</h2>
        <p>Hello ${userName},</p>
        <p>You requested a password reset for your Community Pledges account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
        </p>
      </div>
    `,
    text: `Password Reset - Hello ${userName}, you requested a password reset. Click here to reset: ${resetLink}`
  }),

  declinedPayment: (userName: string, amount: string, reason: string): EmailTemplate => ({
    subject: 'Payment Declined - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Payment Declined</h2>
        <p>Hello ${userName},</p>
        <p>Your payment of <strong>${amount}</strong> was declined.</p>
        <p>Reason: ${reason}</p>
        <p>Please update your payment method and try again.</p>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/dashboard" 
             style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Update Payment Method
          </a>
        </div>
      </div>
    `,
    text: `Payment Declined - Hello ${userName}, your payment of ${amount} was declined. Reason: ${reason}. Please update your payment method.`
  }),

  receivedPayment: (userName: string, amount: string, serverName: string): EmailTemplate => ({
    subject: 'Payment Received - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Payment Received</h2>
        <p>Hello ${userName},</p>
        <p>Thank you! We have successfully received your payment of <strong>${amount}</strong> for <strong>${serverName}</strong>.</p>
        <p>Your pledge is now active and helping to support the community server.</p>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/dashboard" 
             style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Dashboard
          </a>
        </div>
      </div>
    `,
    text: `Payment Received - Hello ${userName}, we have successfully received your payment of ${amount} for ${serverName}. Thank you!`
  }),

  removedPledge: (userName: string, serverName: string, reason: string): EmailTemplate => ({
    subject: 'Pledge Removed - Community Pledges',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">Pledge Removed</h2>
        <p>Hello ${userName},</p>
        <p>Your pledge for <strong>${serverName}</strong> has been removed.</p>
        <p>Reason: ${reason}</p>
        <p>If you believe this is an error, please contact our support team.</p>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/tickets/create" 
             style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Contact Support
          </a>
        </div>
      </div>
    `,
    text: `Pledge Removed - Hello ${userName}, your pledge for ${serverName} has been removed. Reason: ${reason}.`
  }),

  // Admin notifications
  adminNewTicket: (ticketId: string, userName: string, userEmail: string, subject: string, message: string): EmailTemplate => ({
    subject: `[ADMIN] New Support Ticket #${ticketId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">🎫 New Support Ticket</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Ticket ID:</strong> #${ticketId}</p>
          <p><strong>From:</strong> ${userName} (${userEmail})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 15px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/staff/tickets/${ticketId}" 
             style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View & Respond to Ticket
          </a>
        </div>
      </div>
    `,
    text: `New Support Ticket #${ticketId} from ${userName} (${userEmail})\nSubject: ${subject}\n\n${message}`
  }),

  adminPaymentFailed: (userName: string, userEmail: string, amount: string, serverName: string, failureCount: number): EmailTemplate => ({
    subject: `[ADMIN] Payment Failure Alert - ${userName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">💳 Payment Failure Alert</h2>
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #ef4444;">
          <p><strong>User:</strong> ${userName} (${userEmail})</p>
          <p><strong>Server:</strong> ${serverName}</p>
          <p><strong>Amount:</strong> ${amount}</p>
          <p><strong>Failed Attempts:</strong> ${failureCount}/3</p>
          ${failureCount >= 3 ? '<p style="color: #ef4444; font-weight: bold;">⚠️ User has been automatically suspended</p>' : ''}
        </div>
        <p style="color: #666;">This is an automated alert for payment monitoring.</p>
      </div>
    `,
    text: `Payment Failure Alert\nUser: ${userName} (${userEmail})\nServer: ${serverName}\nAmount: ${amount}\nFailed Attempts: ${failureCount}/3`
  }),

  adminUserSuspended: (userName: string, userEmail: string, reason: string): EmailTemplate => ({
    subject: `[ADMIN] User Suspended - ${userName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">⚠️ User Account Suspended</h2>
        <div style="background-color: #fffbeb; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <p><strong>User:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Reason:</strong> ${reason}</p>
        </div>
        <div style="margin: 30px 0;">
          <a href="${`https://${EMAIL_CONFIG.domain}`}/staff" 
             style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Staff Dashboard
          </a>
        </div>
      </div>
    `,
    text: `User Account Suspended\nUser: ${userName} (${userEmail})\nReason: ${reason}`
  }),

  adminNewServer: (serverName: string, ownerName: string, ownerEmail: string, gameType: string, cost: string): EmailTemplate => ({
    subject: `[ADMIN] New Server Created - ${serverName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">🎮 New Server Created</h2>
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981;">
          <p><strong>Server:</strong> ${serverName}</p>
          <p><strong>Owner:</strong> ${ownerName} (${ownerEmail})</p>
          <p><strong>Game:</strong> ${gameType}</p>
          <p><strong>Monthly Cost:</strong> ${cost}</p>
        </div>
      </div>
    `,
    text: `New Server Created: ${serverName}\nOwner: ${ownerName} (${ownerEmail})\nGame: ${gameType}\nCost: ${cost}`
  })
}

// Main email sending function
export async function sendEmail(options: EmailOptions) {
  try {
    const resend = getResend()
    if (!resend) {
      console.error('Email sending skipped: RESEND_API_KEY is not set')
      return { success: false, error: new Error('RESEND_API_KEY is not configured') }
    }

    const { data, error } = await resend.emails.send({
      from: options.from || getSenderString('noreply'),
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    if (error) {
      console.error('Email sending failed:', error)
      return { success: false, error }
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

// Helper function to check if user wants to receive specific email type
export async function shouldSendEmail(userIdOrEmail: string, emailType: keyof typeof emailTemplates): Promise<boolean> {
  try {
    // Admin emails always send, don't check preferences
    const adminEmailTypes = ['adminNewTicket', 'adminPaymentFailed', 'adminUserSuspended', 'adminNewServer']
    if (adminEmailTypes.includes(emailType)) {
      return true
    }

    const { prisma } = await import('./prisma')
    
    // Check if the input is an email or user ID
    const isEmail = userIdOrEmail.includes('@')
    let userId = userIdOrEmail
    
    if (isEmail) {
      // Look up user ID from email
      const user = await prisma.user.findUnique({
        where: { email: userIdOrEmail },
        select: { id: true }
      })
      
      if (!user) {
        console.error('User not found for email:', userIdOrEmail)
        return false
      }
      
      userId = user.id
    }
    
    const preferences = await prisma.userEmailPreferences.findUnique({
      where: { userId }
    })
    
    if (!preferences) {
      // If no preferences exist, create default ones (all true)
      await prisma.userEmailPreferences.create({
        data: {
          userId,
          paymentReminders: true,
          accountSuspension: true,
          ticketResponses: true,
          passwordReset: true,
          declinedPayments: true,
          receivedPayments: true,
          removedPledge: true,
        }
      })
      return true
    }
    
    // Map email types to preference fields
    const preferenceMap: Record<string, boolean> = {
      paymentReminder: preferences.paymentReminders,
      accountSuspension: preferences.accountSuspension,
      ticketResponse: preferences.ticketResponses,
      passwordReset: preferences.passwordReset,
      declinedPayment: preferences.declinedPayments,
      receivedPayment: preferences.receivedPayments,
      removedPledge: preferences.removedPledge,
    }
    
    return preferenceMap[emailType] ?? true
  } catch (error) {
    console.error('Error checking email preferences:', error)
    // If there's an error, default to sending the email
    return true
  }
}

// Convenience functions for each email type
export const emailService = {
  async sendPaymentReminder(to: string, userName: string, amount: string, dueDate: string) {
    if (!(await shouldSendEmail(to, 'paymentReminder'))) return
    const template = emailTemplates.paymentReminder(userName, amount, dueDate)
    return sendEmail({ to, ...template })
  },

  async sendAccountSuspension(to: string, userName: string, reason: string) {
    if (!(await shouldSendEmail(to, 'accountSuspension'))) return
    const template = emailTemplates.accountSuspension(userName, reason)
    return sendEmail({ to, ...template })
  },

  async sendTicketResponse(to: string, userName: string, ticketId: string, response: string) {
    if (!(await shouldSendEmail(to, 'ticketResponse'))) return
    const template = emailTemplates.ticketResponse(userName, ticketId, response)
    return sendEmail({ to, ...template })
  },

  async sendPasswordReset(to: string, userName: string, resetLink: string) {
    if (!(await shouldSendEmail(to, 'passwordReset'))) return
    const template = emailTemplates.passwordReset(userName, resetLink)
    return sendEmail({ to, ...template })
  },

  async sendDeclinedPayment(to: string, userName: string, amount: string, reason: string) {
    if (!(await shouldSendEmail(to, 'declinedPayment'))) return
    const template = emailTemplates.declinedPayment(userName, amount, reason)
    return sendEmail({ to, ...template })
  },

  async sendReceivedPayment(to: string, userName: string, amount: string, serverName: string) {
    if (!(await shouldSendEmail(to, 'receivedPayment'))) return
    const template = emailTemplates.receivedPayment(userName, amount, serverName)
    return sendEmail({ to, ...template })
  },

  async sendRemovedPledge(userId: string, to: string, userName: string, serverName: string, reason: string) {
    if (!(await shouldSendEmail(userId, 'removedPledge'))) return
    const template = emailTemplates.removedPledge(userName, serverName, reason)
    return sendEmail({ to, ...template })
  },

  // Admin notification functions - always sent to admin email
  async sendAdminNewTicket(ticketId: string, userName: string, userEmail: string, subject: string, message: string) {
    const template = emailTemplates.adminNewTicket(ticketId, userName, userEmail, subject, message)
    return sendEmail({ to: 'communitypledges@gmail.com', ...template })
  },

  async sendAdminPaymentFailed(userName: string, userEmail: string, amount: string, serverName: string, failureCount: number) {
    const template = emailTemplates.adminPaymentFailed(userName, userEmail, amount, serverName, failureCount)
    return sendEmail({ to: 'communitypledges@gmail.com', ...template })
  },

  async sendAdminUserSuspended(userName: string, userEmail: string, reason: string) {
    const template = emailTemplates.adminUserSuspended(userName, userEmail, reason)
    return sendEmail({ to: 'communitypledges@gmail.com', ...template })
  },

  async sendAdminNewServer(serverName: string, ownerName: string, ownerEmail: string, gameType: string, cost: string) {
    const template = emailTemplates.adminNewServer(serverName, ownerName, ownerEmail, gameType, cost)
    return sendEmail({ to: 'communitypledges@gmail.com', ...template })
  }
}
