import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Server Boosting - Help Center | Community Pledges",
  description: "Learn how to boost your server to the top of the browse page for 24 hours",
}

export default function ServerBoostingPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Server Boosting</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Boost your server to the top of the browse page and attract more pledgers.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What is Server Boosting?</h2>
            <p className="text-gray-300 mb-4">
              Server boosting is a feature that promotes your server to the top of the server browser for 24 hours, giving you maximum visibility to potential pledgers.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How to Boost Your Server</h2>
            <ol className="text-gray-300 space-y-3">
              <li>Go to your server&apos;s page</li>
              <li>Click the &quot;Boost Server&quot; button</li>
              <li>Complete the payment</li>
              <li>Your server will immediately appear at the top of the browse page</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Boost Duration</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <ul className="text-gray-300 space-y-2">
                <li><strong className="text-white">Duration:</strong> 24 hours from time of purchase</li>
                <li><strong className="text-white">Countdown:</strong> See remaining time on your server page</li>
                <li><strong className="text-white">Re-boost:</strong> Can boost again immediately after expiration</li>
                <li><strong className="text-white">Multiple boosts:</strong> Purchases stack (extend duration)</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Benefits of Boosting</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Top position in server browser</li>
              <li>Special boost badge on your server card</li>
              <li>Increased visibility to potential pledgers</li>
              <li>Higher chance of getting new members</li>
              <li>Stand out from other servers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Pricing</h2>
            <p className="text-gray-300 mb-4">
              Boost pricing is competitive and helps support the Community Pledges platform. The current boost price is displayed on your server page.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Best Times to Boost</h2>
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-6 my-4">
              <ul className="text-gray-300 space-y-2">
                <li>When launching a new server</li>
                <li>During peak gaming hours (evenings/weekends)</li>
                <li>When running special events</li>
                <li>After major server updates</li>
                <li>When needing to reach pledge goals quickly</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Boost History</h2>
            <p className="text-gray-300 mb-4">
              You can view your boost history in:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Your server&apos;s dashboard</li>
              <li>Activity log in settings</li>
              <li>Shows all past boosts and their effectiveness</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/creating-server" className="block text-emerald-400 hover:text-emerald-300">
              → Creating a Server
            </Link>
            <Link href="/servers" className="block text-emerald-400 hover:text-emerald-300">
              → Browse Servers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


