import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Creating Communities - Help Center | Community Pledges",
  description: "Learn how to create and manage your gaming community profile on Community Pledges",
}

export default function CreatingCommunitiesPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">Creating Communities</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              Build your gaming community profile and attract new members with Community Pledges.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What is a Community?</h2>
            <p className="text-gray-300 mb-4">
              A community is a collection of related servers managed by the same organization or group. Think of it as your gaming clan, guild, or organization&apos;s hub.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Step 1: Create Your Community</h2>
            <ol className="text-gray-300 space-y-3">
              <li>Log in to your account</li>
              <li>Go to your Dashboard</li>
              <li>Click &quot;Create Community&quot;</li>
              <li>Fill in the required details</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Required Information</h2>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 my-4">
              <ul className="text-gray-300 space-y-2">
                <li><strong className="text-white">Community Name:</strong> Your organization or clan name</li>
                <li><strong className="text-white">Description:</strong> What your community is about</li>
                <li><strong className="text-white">Tags:</strong> Categories that describe your community (e.g., Casual, Competitive, PvP)</li>
                <li><strong className="text-white">Website:</strong> Optional link to your community website</li>
                <li><strong className="text-white">Discord:</strong> Optional Discord server invite link</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Linking Servers to Your Community</h2>
            <p className="text-gray-300 mb-4">
              When creating or editing a server, you can link it to your community:
            </p>
            <ol className="text-gray-300 space-y-3">
              <li>Go to server creation or edit page</li>
              <li>Select your community from the dropdown</li>
              <li>Save the server</li>
              <li>The server will now appear on your community page</li>
            </ol>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Benefits of Communities</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Showcase all your servers in one place</li>
              <li>Build your brand and recognition</li>
              <li>Attract members across multiple games</li>
              <li>Professional presentation for multi-game organizations</li>
              <li>Easier for members to find all your servers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Managing Your Community</h2>
            <p className="text-gray-300 mb-4">
              From your dashboard, you can:
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>Edit community details anytime</li>
              <li>Update tags and categories</li>
              <li>Add or remove linked servers</li>
              <li>View community statistics</li>
              <li>See all members across your servers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Best Practices</h2>
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-lg p-6 my-4">
              <ul className="text-gray-300 space-y-3">
                <li><strong className="text-emerald-400">Consistent branding:</strong> Use the same name and style across all platforms</li>
                <li><strong className="text-emerald-400">Clear description:</strong> Explain what makes your community unique</li>
                <li><strong className="text-emerald-400">Active presence:</strong> Keep your servers updated and active</li>
                <li><strong className="text-emerald-400">Engage members:</strong> Use Discord and other platforms to build community</li>
                <li><strong className="text-emerald-400">Update regularly:</strong> Keep information current and accurate</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Community vs Server</h2>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Community</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>Organization or clan</li>
                  <li>Multiple servers</li>
                  <li>Cross-game presence</li>
                  <li>Brand building</li>
                </ul>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Server</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>Individual game server</li>
                  <li>Specific game instance</li>
                  <li>Pledge destination</li>
                  <li>Connection details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Related Articles</h3>
          <div className="space-y-2">
            <Link href="/help/creating-server" className="block text-emerald-400 hover:text-emerald-300">
              → Creating a Server
            </Link>
            <Link href="/communities" className="block text-emerald-400 hover:text-emerald-300">
              → Browse Communities
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


