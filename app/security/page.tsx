export default function SecurityPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Security</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Security</h2>
            <p className="text-gray-700 mb-4">
              At Community Pledges, we take the security of your data and payments seriously. 
              We implement industry-standard security measures to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Security</h2>
            <p className="text-gray-700 mb-4">
              We use Stripe for payment processing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>PCI DSS Compliance:</strong> Stripe is certified to PCI Service Provider Level 1, the most stringent level</li>
              <li><strong>Encryption:</strong> All payment data is encrypted with TLS 1.2+ during transmission</li>
              <li><strong>No Card Storage:</strong> We never store your full credit card numbers on our servers</li>
              <li><strong>Secure Tokens:</strong> Payment methods are stored as secure tokens with Stripe</li>
              <li><strong>3D Secure:</strong> Support for additional authentication when required</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your data is protected through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>HTTPS Everywhere:</strong> All connections use secure HTTPS encryption</li>
              <li><strong>Database Security:</strong> Encrypted data at rest and in transit</li>
              <li><strong>Access Controls:</strong> Strict role-based access to sensitive data</li>
              <li><strong>Regular Backups:</strong> Automated daily backups with encryption</li>
              <li><strong>Secure Authentication:</strong> OAuth 2.0 for account security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Security</h2>
            <p className="text-gray-700 mb-4">
              We recommend these security best practices:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use a strong, unique password for your OAuth provider</li>
              <li>Enable two-factor authentication on your Google/Discord account</li>
              <li>Never share your account credentials</li>
              <li>Log out from shared or public devices</li>
              <li>Monitor your account activity regularly</li>
              <li>Report suspicious activity immediately</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Security</h2>
            <p className="text-gray-700 mb-4">
              Our platform infrastructure includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Cloud Hosting:</strong> Hosted on secure, reliable cloud infrastructure</li>
              <li><strong>DDoS Protection:</strong> Advanced protection against distributed attacks</li>
              <li><strong>Monitoring:</strong> 24/7 system monitoring and alerting</li>
              <li><strong>Regular Updates:</strong> Timely security patches and updates</li>
              <li><strong>Rate Limiting:</strong> Protection against brute force attacks</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Controls</h2>
            <p className="text-gray-700 mb-4">
              You have control over your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal data at any time</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data on request</li>
              <li>Manage notification preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Incident Response</h2>
            <p className="text-gray-700 mb-4">
              In the event of a security incident:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We have a detailed incident response plan</li>
              <li>Affected users will be notified promptly</li>
              <li>We work to contain and resolve issues quickly</li>
              <li>Post-incident analysis to prevent recurrence</li>
              <li>Transparency in our communication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Security Issues</h2>
            <p className="text-gray-700 mb-4">
              If you discover a security vulnerability:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Please report it responsibly through our support ticket system</li>
              <li>Include detailed information about the vulnerability</li>
              <li>Give us time to address the issue before public disclosure</li>
              <li>We appreciate and acknowledge security researchers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We carefully vet our third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Stripe:</strong> Payment processing and payout management</li>
              <li><strong>OAuth Providers:</strong> Google, Discord for authentication</li>
              <li><strong>Email Service:</strong> Secure transactional email delivery</li>
              <li>All partners maintain high security standards</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance</h2>
            <p className="text-gray-700 mb-4">
              We strive to comply with applicable regulations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>GDPR (General Data Protection Regulation)</li>
              <li>PCI DSS through Stripe</li>
              <li>Data protection best practices</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
            <p className="text-gray-700">
              If you have questions about our security practices or need to report a security 
              concern, please create a support ticket. We take all security matters seriously 
              and will respond promptly.
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



