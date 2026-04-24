import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payment Methods - Help Center | Community Pledges",
  description: "Learn how to add, update, and manage your payment methods on Community Pledges",
}

export default function PaymentMethodsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Payment Methods</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Learn how to add, update, and manage your payment methods for making pledges.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Adding a Payment Method</h2>
            <ol className="text-gray-300 space-y-3">
              <li>Go to your <Link href="/settings" className="text-emerald-400 hover:text-emerald-300">Settings page</Link></li>
              <li>Scroll to the &quot;Payment Methods&quot; section</li>
              <li>Click &quot;Add Payment Method&quot;</li>
              <li>Enter your card details (processed securely by Stripe)</li>
              <li>Click &quot;Save Card&quot;</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Supported Payment Methods</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Credit Cards (Visa, Mastercard, American Express)</li>
              <li>Debit Cards</li>
              <li>More payment methods coming soon</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Managing Payment Methods</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <h3 className="text-lg font-semibold text-white mb-3">You can:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Add multiple payment methods</li>
                <li>Set a default payment method</li>
                <li>Update card details</li>
                <li>Remove old or expired cards</li>
                <li>View all your saved payment methods</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Security</h2>
            <p className="text-gray-300 mb-4">
              We take payment security seriously:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li><strong className="text-white">Stripe Integration:</strong> All payments processed by Stripe (industry-leading security)</li>
              <li><strong className="text-white">No Storage:</strong> We never store your full card details on our servers</li>
              <li><strong className="text-white">PCI Compliant:</strong> Stripe handles all PCI DSS compliance</li>
              <li><strong className="text-white">Encrypted:</strong> All payment data is encrypted in transit and at rest</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Payment Processing</h2>
            <p className="text-gray-300 mb-4">
              When you make a pledge:
            </p>
            <ol className="text-gray-300 space-y-3">
              <li>Your payment method is charged monthly</li>
              <li>You receive an email receipt for each payment</li>
              <li>Payments are processed on the same day each month</li>
              <li>You can cancel your pledge anytime (takes effect next billing cycle)</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Failed Payments</h2>
            <p className="text-gray-300 mb-4">
              If a payment fails:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>You&apos;ll receive an email notification</li>
              <li>We&apos;ll automatically retry the payment</li>
              <li>Update your payment method in settings if needed</li>
              <li>After multiple failures, your pledge may be suspended</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Removing a Payment Method</h2>
            <p className="text-gray-300 mb-4">
              Before removing a payment method:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Make sure it&apos;s not set as your default method</li>
              <li>Ensure you have no active pledges using this method</li>
              <li>Add a replacement payment method first</li>
            </ul>
            <p className="text-gray-300 mt-4">
              To remove: Go to Settings → Payment Methods → Click the trash icon next to the card
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Troubleshooting</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <p className="text-white font-semibold mb-3">Common Issues:</p>
              <div className="space-y-4">
                <div>
                  <p className="text-white">Card declined:</p>
                  <p className="text-gray-300 text-sm">Check with your bank, ensure sufficient funds, verify card details are correct</p>
                </div>
                <div>
                  <p className="text-white">Can&apos;t add card:</p>
                  <p className="text-gray-300 text-sm">Make sure you&apos;re entering valid card information and that the card is not already saved</p>
                </div>
                <div>
                  <p className="text-white">Can&apos;t remove card:</p>
                  <p className="text-gray-300 text-sm">Cancel any active pledges first, or add a new default payment method</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/how-to-pledge" className="block text-emerald-400 hover:text-emerald-300">
              → How to Pledge
            </Link>
            <Link href="/help/troubleshooting" className="block text-emerald-400 hover:text-emerald-300">
              → Troubleshooting
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


