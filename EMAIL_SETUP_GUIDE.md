# Email Setup Guide for Community Pledges

## Domain Configuration

Your email system is configured to use:
- **Domain**: `communitypledges.com`
- **From Email**: `noreply@communitypledges.com`
- **API Key**: `re_hKjrVRmS_5BCjyKsdJ8dyTFuWqqKY4TcD`

## Step 1: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Resend API Key
RESEND_API_KEY=re_hKjrVRmS_5BCjyKsdJ8dyTFuWqqKY4TcD

# Email Configuration
EMAIL_FROM=noreply@communitypledges.com
EMAIL_FROM_NAME=Community Pledges
```

## Step 2: Configure Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `communitypledges.com`
4. Choose "Vercel" as your DNS provider
5. Resend will provide DNS records to add

## Step 3: Add DNS Records in Vercel

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains" section
3. Add the DNS records provided by Resend:
   - CNAME records for email authentication
   - TXT records for domain verification

## Step 4: Verify Domain

1. Go back to Resend dashboard
2. Click "Verify Domain" for `communitypledges.com`
3. Wait for verification (usually takes a few minutes)

## Step 5: Test Email System

Once verified, test the email system:

```bash
POST https://communitypledges.com/api/email/test
{
  "emailType": "paymentReminder",
  "email": "your-email@example.com",
  "userName": "Test User"
}
```

## Email Types Available

- `paymentReminder` - Payment due notifications
- `accountSuspension` - Account suspension alerts
- `ticketResponse` - Support ticket responses
- `passwordReset` - Password reset emails
- `declinedPayment` - Failed payment notifications
- `receivedPayment` - Payment confirmation
- `removedPledge` - Pledge removal notifications

## Troubleshooting

### Common Issues:

1. **Domain not verified**: Check DNS records are correctly added
2. **Emails going to spam**: Add SPF/DKIM records (provided by Resend)
3. **API errors**: Verify RESEND_API_KEY is correct

### DNS Records Needed:

Resend will provide these records (example):
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

## Next Steps

After domain setup:
1. Add user email preferences to database
2. Create user dashboard for email settings
3. Integrate email triggers throughout the app
4. Add email logging and tracking


