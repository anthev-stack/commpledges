import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Currency & Pricing - Help Center | Community Pledges",
  description: "Learn how currency conversion works and understand pricing on Community Pledges",
}

export default function CurrencyPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Currency & Pricing</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Understand how currency conversion works and how pricing is calculated on Community Pledges.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Supported Currencies</h2>
            <p className="text-gray-300 mb-4">
              Community Pledges supports multiple currencies including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">USD</p>
                <p className="text-gray-400 text-sm">US Dollar</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">EUR</p>
                <p className="text-gray-400 text-sm">Euro</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">GBP</p>
                <p className="text-gray-400 text-sm">British Pound</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">AUD</p>
                <p className="text-gray-400 text-sm">Australian Dollar</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">CAD</p>
                <p className="text-gray-400 text-sm">Canadian Dollar</p>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center">
                <p className="text-white font-semibold">+ More</p>
                <p className="text-gray-400 text-sm">Many others</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How Currency Conversion Works</h2>
            <ol className="text-gray-300 space-y-3">
              <li>Server costs are listed in the server owner&apos;s currency</li>
              <li>You can view prices in your preferred currency</li>
              <li>Conversion rates are updated in real-time</li>
              <li>You&apos;re charged in your payment method&apos;s currency</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Changing Your Display Currency</h2>
            <p className="text-gray-300 mb-4">
              To change the currency shown on the site:
            </p>
            <ol className="text-gray-300 space-y-2">
              <li>Look for the currency selector in the top navigation</li>
              <li>Click on the current currency (e.g., USD)</li>
              <li>Select your preferred currency from the dropdown</li>
              <li>All prices will update automatically</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Exchange Rate Information</h2>
            <p className="text-gray-300 mb-4">
              Our currency conversion:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Uses real-time exchange rates from reliable financial data providers</li>
              <li>Updates multiple times per day</li>
              <li>Includes a small conversion fee (handled by Stripe)</li>
              <li>Shows approximate conversions for display purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Payment Processing</h2>
            <p className="text-gray-300 mb-4">
              When you make a payment:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>You&apos;re charged in your card&apos;s currency</li>
              <li>Your bank may apply their own conversion rate</li>
              <li>Stripe handles the currency conversion</li>
              <li>The server owner receives funds in their currency</li>
            </ul>

            <div className="bg-amber-950/30 border border-amber-700/50 rounded-lg p-6 my-6">
              <p className="text-amber-300 font-semibold mb-2">Note:</p>
              <p className="text-gray-300 text-sm">
                Final amounts may vary slightly due to exchange rate fluctuations between display time and payment processing. Your bank may also charge international transaction fees.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">For Server Owners</h2>
            <p className="text-gray-300 mb-4">
              As a server owner:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Set your server cost in your local currency</li>
              <li>Payouts are sent in your Stripe account&apos;s currency</li>
              <li>Select your country during Stripe onboarding</li>
              <li>Currency is set based on your country selection</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/how-to-pledge" className="block text-emerald-400 hover:text-emerald-300">
              → How to Pledge
            </Link>
            <Link href="/help/stripe-setup" className="block text-emerald-400 hover:text-emerald-300">
              → Stripe Payout Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


