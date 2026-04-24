export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 mb-4">
              This refund policy outlines the circumstances under which refunds may be issued for 
              pledges made on Community Pledges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Pledge Cancellations</h2>
            <p className="text-gray-700 mb-4">
              You can cancel your pledge at any time:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cancellations take effect immediately</li>
              <li>You will not be charged for future billing cycles</li>
              <li>No partial refunds for the current billing period</li>
              <li>Your access continues until the end of the paid period</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligible Refunds</h2>
            <p className="text-gray-700 mb-4">
              Refunds may be issued in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Duplicate or erroneous charges</li>
              <li>Technical errors in payment processing</li>
              <li>Server owner fraud or misrepresentation</li>
              <li>Server is permanently shut down by owner</li>
              <li>Service unavailability due to platform issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Refundable Situations</h2>
            <p className="text-gray-700 mb-4">
              Refunds will NOT be issued for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Change of mind after a successful payment</li>
              <li>Server downtime or performance issues (contact server owner)</li>
              <li>Bans or restrictions from individual servers</li>
              <li>Failure to cancel before the next billing cycle</li>
              <li>Voluntary account closure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Request Process</h2>
            <p className="text-gray-700 mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2">
              <li>Create a support ticket through our platform</li>
              <li>Provide your transaction details and reason for refund</li>
              <li>Include any relevant evidence or documentation</li>
              <li>Allow 5-7 business days for review</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Timeframe</h2>
            <p className="text-gray-700 mb-4">
              If approved:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Refunds are processed within 5-7 business days</li>
              <li>Funds return to your original payment method</li>
              <li>Bank processing may take an additional 3-5 business days</li>
              <li>You will receive an email confirmation when processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Chargebacks</h2>
            <p className="text-gray-700 mb-4">
              Please contact us before initiating a chargeback:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Chargebacks may result in immediate account suspension</li>
              <li>We&apos;ll work with you to resolve any payment disputes</li>
              <li>Fraudulent chargebacks may result in permanent ban</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Server Owner Payouts</h2>
            <p className="text-gray-700 mb-4">
              For server owners:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Payouts are processed through Stripe Connect</li>
              <li>Payout disputes should be directed to Stripe support</li>
              <li>Platform fees are non-refundable</li>
              <li>You&apos;re responsible for refunds to your pledgers if you shut down</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact for Refunds</h2>
            <p className="text-gray-700">
              For all refund requests and inquiries, please create a support ticket through our 
              platform. Our support team will review your case and respond within 1-2 business days.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: October 2025
          </p>
        </div>
      </div>
    </div>
  )
}


