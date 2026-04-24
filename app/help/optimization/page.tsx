import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Understanding Optimization - Help Center | Community Pledges",
  description: "Learn how our smart cost optimization algorithm works to reduce payments for everyone",
}

export default function OptimizationPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Understanding Optimization</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Our smart optimization algorithm ensures fair cost distribution while respecting everyone&apos;s pledge limits.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How It Works</h2>
            <p className="text-gray-300 mb-4">
              When multiple people pledge to a server, we calculate the optimal payment distribution to minimize costs for everyone while staying within pledge limits.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Example Scenario</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <p className="text-white font-semibold mb-3">Server Monthly Cost: $30</p>
              <ul className="text-gray-300 space-y-2">
                <li>User A pledges: $20/month</li>
                <li>User B pledges: $10/month</li>
                <li>User C pledges: $5/month</li>
              </ul>
              <p className="text-emerald-400 font-semibold mt-4">Total Pledges: $35</p>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Without Optimization:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>User A pays: $20</li>
              <li>User B pays: $10</li>
              <li>User C pays: $0 (server already funded)</li>
              <li>Total collected: $30</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">With Optimization:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>User A pays: $12 (reduced from $20)</li>
              <li>User B pays: $12 (increased from $10)</li>
              <li>User C pays: $5 (their full pledge)</li>
              <li>Total collected: $30 (meets server cost exactly)</li>
            </ul>

            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-6 my-6">
              <p className="text-emerald-300 font-semibold mb-2">Benefits:</p>
              <ul className="text-gray-300 space-y-2">
                <li>Everyone contributes fairly based on their capacity</li>
                <li>Higher pledgers save money when others join</li>
                <li>More people can participate</li>
                <li>Server costs are met exactly</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Key Principles</h2>
            <ol className="text-gray-300 space-y-4">
              <li>
                <strong className="text-white">No one pays more than their pledge:</strong> Your pledge is your maximum, never your minimum
              </li>
              <li>
                <strong className="text-white">Fair distribution:</strong> The algorithm balances payments across all pledgers
              </li>
              <li>
                <strong className="text-white">Real-time updates:</strong> Payments adjust automatically when people join or leave
              </li>
              <li>
                <strong className="text-white">Transparent:</strong> You can see exactly what you&apos;ll pay before committing
              </li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">When Costs Aren&apos;t Met</h2>
            <p className="text-gray-300 mb-4">
              If total pledges don&apos;t cover the server cost:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Everyone pays their full pledge amount</li>
              <li>The server owner covers the remaining difference</li>
              <li>Server owners can adjust their target cost or seek more pledgers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Viewing Your Optimized Payment</h2>
            <p className="text-gray-300 mb-4">
              To see your optimized payment amount:
            </p>
            <ol className="text-gray-300 space-y-2">
              <li>Go to the server page</li>
              <li>Look at the &quot;Your Pledge&quot; section</li>
              <li>You&apos;ll see both your pledge limit and actual payment amount</li>
              <li>The difference shows how much you&apos;re saving through optimization</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/how-to-pledge" className="block text-emerald-400 hover:text-emerald-300">
              → How to Pledge
            </Link>
            <Link href="/help/payment-methods" className="block text-emerald-400 hover:text-emerald-300">
              → Payment Methods
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


