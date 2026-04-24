export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Community Pledges, you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              Community Pledges is a platform that enables users to collectively fund game servers and 
              community projects through monthly pledges. We facilitate payment processing but are not 
              responsible for the operation or maintenance of individual servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current information</li>
              <li>Not sharing your account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pledges and Payments</h2>
            <p className="text-gray-700 mb-4">
              By making a pledge:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You authorize recurring monthly charges to your payment method</li>
              <li>Charges occur 2 days before the server&apos;s withdrawal day</li>
              <li>Your actual payment may be optimized based on total pledges</li>
              <li>You can cancel your pledge at any time</li>
              <li>Refunds are subject to our refund policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Server Owners</h2>
            <p className="text-gray-700 mb-4">
              As a server owner, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate information about your server</li>
              <li>Use pledged funds for the stated server costs</li>
              <li>Complete Stripe onboarding for payment processing</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-700 mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Misrepresent server information or pledge usage</li>
              <li>Attempt to defraud users or the platform</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Interfere with the service&apos;s operation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your account at any time for violations 
              of these terms or for any other reason we deem necessary to protect our service or users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
              uninterrupted access or that the service will be error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Community Pledges shall not be liable for any indirect, incidental, special, or 
              consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service 
              after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us through our support ticket system.
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


