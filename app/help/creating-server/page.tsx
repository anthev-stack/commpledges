import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creating a Server - Help Center | Community Pledges",
  description: "Learn how to create and manage your game server listing on Community Pledges",
}

export default function CreatingServerPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Creating a Server</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Follow this guide to create and list your gaming server on Community Pledges.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Prerequisites</h2>
            <ul className="text-gray-300 space-y-2">
              <li>A Community Pledges account (sign up or log in)</li>
              <li>Your server details ready (name, description, game)</li>
              <li>A Stripe account for receiving payouts</li>
              <li>Optional: Discord webhook URL for notifications</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 1: Navigate to Dashboard</h2>
            <ol className="text-gray-300 space-y-3">
              <li>Log in to your Community Pledges account</li>
              <li>Click on your profile in the top right</li>
              <li>Select &quot;Dashboard&quot; from the dropdown</li>
              <li>Click the &quot;Create Server&quot; button</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 2: Fill in Server Details</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <h3 className="text-lg font-semibold text-white mb-3">Required Information:</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong className="text-white">Server Name:</strong> The name of your server</li>
                <li><strong className="text-white">Game:</strong> Select the game from our supported list</li>
                <li><strong className="text-white">Description:</strong> Describe your server and community</li>
                <li><strong className="text-white">Monthly Cost:</strong> How much it costs to run your server</li>
                <li><strong className="text-white">Region:</strong> Your server&apos;s location</li>
                <li><strong className="text-white">Connection Details:</strong> IP address and port for players</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 3: Set Up Stripe Payouts</h2>
            <p className="text-gray-300 mb-4">
              To receive pledge payments, you need to connect a Stripe account:
            </p>
            <ol className="text-gray-300 space-y-3">
              <li>Complete the Stripe Connect onboarding process</li>
              <li>Provide your bank account details</li>
              <li>Verify your identity (required by Stripe)</li>
              <li>Wait for approval (usually instant)</li>
            </ol>
            <p className="text-gray-300 mt-4">
              See our <Link href="/help/stripe-setup" className="text-emerald-400 hover:text-emerald-300">Stripe Setup Guide</Link> for detailed instructions.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 4: Optional - Discord Webhook</h2>
            <p className="text-gray-300 mb-4">
              Get notified in Discord when users pledge to your server:
            </p>
            <ol className="text-gray-300 space-y-3">
              <li>Go to your Discord server settings</li>
              <li>Create a webhook in your desired channel</li>
              <li>Copy the webhook URL</li>
              <li>Paste it in the Discord Webhook field</li>
            </ol>
            <p className="text-gray-300 mt-4">
              See our <Link href="/help/discord-webhooks" className="text-emerald-400 hover:text-emerald-300">Discord Webhook Guide</Link> for detailed instructions.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 5: Publish Your Server</h2>
            <p className="text-gray-300 mb-4">
              Once all required fields are filled in:
            </p>
            <ol className="text-gray-300 space-y-3">
              <li>Review all your information</li>
              <li>Make sure your Stripe account is connected</li>
              <li>Click &quot;Create Server&quot;</li>
              <li>Your server will now appear in the server browser</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Managing Your Server</h2>
            <p className="text-gray-300 mb-4">
              After creating your server, you can:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Edit server details anytime from your dashboard</li>
              <li>View pledge statistics and member activity</li>
              <li>Track payment processing and withdrawals</li>
              <li>Update your Discord webhook URL</li>
              <li>Mark your server as private (invite-only)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Tips for Success</h2>
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-6 my-4">
              <ul className="text-gray-300 space-y-3">
                <li><strong className="text-emerald-400">Write a detailed description:</strong> Help potential pledgers understand your community</li>
                <li><strong className="text-emerald-400">Be transparent about costs:</strong> Show exactly what the money goes towards</li>
                <li><strong className="text-emerald-400">Engage with pledgers:</strong> Thank your supporters and keep them updated</li>
                <li><strong className="text-emerald-400">Keep information current:</strong> Update connection details if they change</li>
                <li><strong className="text-emerald-400">Use Discord notifications:</strong> Stay informed about new pledges</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/stripe-setup" className="block text-emerald-400 hover:text-emerald-300">
              → Stripe Payout Setup
            </Link>
            <Link href="/help/discord-webhooks" className="block text-emerald-400 hover:text-emerald-300">
              → Discord Webhook Setup
            </Link>
            <Link href="/help/optimization" className="block text-emerald-400 hover:text-emerald-300">
              → Understanding Optimization
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


