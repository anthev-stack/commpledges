// Email configuration for Community Pledges
export const EMAIL_CONFIG = {
  // Domain settings
  domain: 'communitypledges.com',
  
  // From email addresses
  from: {
    noreply: 'noreply@communitypledges.com',
    support: 'support@communitypledges.com',
    notifications: 'notifications@communitypledges.com',
  },
  
  // Default sender name
  senderName: 'Community Pledges',
  
  // Email types and their default settings
  emailTypes: {
    paymentReminders: true,
    accountSuspension: true,
    ticketResponses: true,
    passwordReset: true,
    declinedPayments: true,
    receivedPayments: true,
    removedPledge: true,
  },
  
  // Template settings
  templates: {
    brandColor: '#10b981', // emerald-500
    logoUrl: 'https://communitypledges.com/logo.png', // Update with actual logo URL
    supportUrl: 'https://communitypledges.com/support',
    dashboardUrl: 'https://communitypledges.com/dashboard',
  }
} as const

// Helper function to get the appropriate from email for different types
export function getFromEmail(type: 'noreply' | 'support' | 'notifications' = 'noreply'): string {
  return EMAIL_CONFIG.from[type]
}

// Helper function to get the full sender string
export function getSenderString(type: 'noreply' | 'support' | 'notifications' = 'noreply'): string {
  return `${EMAIL_CONFIG.senderName} <${getFromEmail(type)}>`
}


