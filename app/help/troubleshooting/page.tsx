import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Troubleshooting - Help Center | Community Pledges",
  description: "Common issues and solutions for pledgers and server owners on Community Pledges",
}

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/help"
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Help Center
        </Link>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Troubleshooting</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Find solutions to common issues and learn how to resolve problems quickly.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Payment Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Payment Declined</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Check with your bank to ensure international payments are enabled</li>
                  <li>Verify your card has sufficient funds</li>
                  <li>Make sure card details are entered correctly</li>
                  <li>Try a different payment method</li>
                  <li>Contact your bank if the issue persists</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Can&apos;t Add Payment Method</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Ensure you&apos;re using a supported card type</li>
                  <li>Check that the card isn&apos;t already saved</li>
                  <li>Clear your browser cache and try again</li>
                  <li>Try a different browser</li>
                  <li>Disable browser extensions that might interfere</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Payment Not Processing</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Wait a few minutes and check your email for confirmation</li>
                  <li>Check your dashboard for payment status</li>
                  <li>Look for any error messages in your activity log</li>
                  <li>Contact support if payment shows as pending for more than 1 hour</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Account Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Can&apos;t Log In</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Check if you signed up with Discord or Email/Password</li>
                  <li>Use the &quot;Forgot Password&quot; link if you forgot your password</li>
                  <li>Make sure you&apos;re using the correct email address</li>
                  <li>Clear your browser cookies and try again</li>
                  <li>Try incognito/private mode</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Email Already in Use</h3>
                <p className="text-gray-300 mb-3">This means you already have an account:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Try logging in instead of signing up</li>
                  <li>Check if you signed up with Discord OAuth</li>
                  <li>Use the forgot password feature if needed</li>
                  <li>Contact support if you believe this is an error</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Not Receiving Emails</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Check your spam/junk folder</li>
                  <li>Add noreply@communitypledges.com to your contacts</li>
                  <li>Check your email preferences in settings</li>
                  <li>Verify your email address is correct in your profile</li>
                  <li>Wait a few minutes as emails may be delayed</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Server Owner Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Stripe Onboarding Failed</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Complete all required fields in the Stripe form</li>
                  <li>Provide accurate business/personal information</li>
                  <li>Upload required verification documents</li>
                  <li>Contact Stripe support for account-specific issues</li>
                  <li>Try the onboarding process again from your dashboard</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Not Receiving Payouts</h3>
                <p className="text-gray-300 mb-3">Possible causes:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Stripe account not fully verified</li>
                  <li>Minimum payout threshold not met</li>
                  <li>Bank account details incorrect</li>
                  <li>Payout schedule timing (check Stripe dashboard)</li>
                  <li>Account under review by Stripe</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Discord Webhook Not Working</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Verify the webhook URL is correct</li>
                  <li>Check Discord server permissions</li>
                  <li>Make sure the webhook wasn&apos;t deleted in Discord</li>
                  <li>Test by creating a new webhook</li>
                  <li>See our <Link href="/help/discord-webhooks" className="text-emerald-400 hover:text-emerald-300">Discord Webhook Guide</Link></li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">General Issues</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Page Not Loading</h3>
                <p className="text-gray-300 mb-3">Try these steps:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Refresh the page (Ctrl+F5 or Cmd+Shift+R)</li>
                  <li>Clear your browser cache</li>
                  <li>Try a different browser</li>
                  <li>Check your internet connection</li>
                  <li>Disable browser extensions temporarily</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Features Not Working</h3>
                <p className="text-gray-300 mb-3">Possible solutions:</p>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>Make sure JavaScript is enabled</li>
                  <li>Update your browser to the latest version</li>
                  <li>Check browser console for errors (F12)</li>
                  <li>Try logging out and back in</li>
                  <li>Contact support with error details</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Still Having Issues?</h2>
            <p className="text-gray-300 mb-4">
              If none of these solutions work:
            </p>
            <ol className="text-gray-300 space-y-2">
              <li>Check our other help articles for more specific guidance</li>
              <li>Visit our <Link href="/tickets/create" className="text-emerald-400 hover:text-emerald-300">support ticket page</Link></li>
              <li>Provide as much detail as possible about the issue</li>
              <li>Include screenshots if helpful</li>
              <li>Our support team will respond as soon as possible</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Get Help</h3>
          <div className="space-y-2">
            <Link href="/tickets/create" className="block text-emerald-400 hover:text-emerald-300">
              → Create Support Ticket
            </Link>
            <Link href="/tickets" className="block text-emerald-400 hover:text-emerald-300">
              → View My Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


