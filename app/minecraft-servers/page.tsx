import Link from "next/link"
import { Metadata } from "next"
import { Server, Users, DollarSign, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: "Minecraft Servers - Find & Support Community Minecraft Servers | Community Pledges",
  description: "Browse and support Minecraft community servers. Help keep your favorite Minecraft servers alive by pledging monthly. Join thousands of players sharing server hosting costs.",
  keywords: "minecraft servers, minecraft community servers, minecraft server hosting, minecraft server costs, support minecraft servers, minecraft server pledges, minecraft multiplayer, minecraft community",
  openGraph: {
    title: "Minecraft Servers - Community Pledges",
    description: "Browse and support Minecraft community servers. Help keep your favorite Minecraft servers alive by pledging monthly.",
    type: "website",
  },
}

export default function MinecraftServersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Minecraft Community Servers
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Discover and support amazing Minecraft servers. Help keep your favorite communities alive by sharing hosting costs.
            </p>
            <Link
              href="/servers?game=Minecraft"
              className="inline-flex items-center space-x-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
            >
              <Search className="w-5 h-5" />
              <span>Browse Minecraft Servers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Community Pledges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">What is Community Pledges?</h2>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto">
              Community Pledges is a platform that helps gaming communities share the cost of server hosting. Instead of one person paying for everything, everyone chips in what they can afford.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Affordable for Everyone</h3>
                <p className="text-gray-300">
                  Pledge as little as $2/month. Our smart system optimizes costs so you often pay less than you pledged.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
                <p className="text-gray-300">
                  When more people join, costs get split further. Everyone benefits when the community grows together.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Keep Servers Alive</h3>
                <p className="text-gray-300">
                  Help your favorite Minecraft servers stay online. Server owners can focus on building great communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Minecraft Servers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Support Minecraft Servers?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">For Players</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Keep your favorite server running</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Support server owners and admins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Ensure server stays online 24/7</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Help pay for better hardware and plugins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Be part of a sustainable community</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">For Server Owners</h3>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Reduce your financial burden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Get consistent monthly support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Transparent payment tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Automated payment processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>Focus on building your community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">1</div>
              <h3 className="font-semibold text-white mb-2">Find a Server</h3>
              <p className="text-sm text-gray-300">
                Browse Minecraft servers and find one you love to play on
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">2</div>
              <h3 className="font-semibold text-white mb-2">Choose Your Pledge</h3>
              <p className="text-sm text-gray-300">
                Decide how much you want to contribute monthly ($2, $5, $10, or more)
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">3</div>
              <h3 className="font-semibold text-white mb-2">Auto-Optimization</h3>
              <p className="text-sm text-gray-300">
                Our system optimizes payments so you often pay less than your pledge
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-3">4</div>
              <h3 className="font-semibold text-white mb-2">Server Stays Online</h3>
              <p className="text-sm text-gray-300">
                Server owner receives funds to keep the server running smoothly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-sm border-2 border-emerald-500/30 rounded-2xl shadow-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Support Minecraft Servers?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of players helping to keep Minecraft communities alive. Browse servers, choose your pledge amount, and make a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servers?game=Minecraft"
                className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Browse Minecraft Servers</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How much does it cost to pledge?</h3>
              <p className="text-gray-300">
                You can pledge as little as $2/month or as much as you want. You set your maximum, and our optimization system often reduces what you actually pay when others join.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I cancel my pledge anytime?</h3>
              <p className="text-gray-300">
                Yes! You can cancel your pledge at any time from your dashboard. Cancellations take effect at the end of your current billing period.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What happens to my pledge?</h3>
              <p className="text-gray-300">
                100% of your pledge (minus payment processing fees) goes directly to the server owner to cover hosting costs. We take a small platform fee to keep Community Pledges running.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How do I know the server is legitimate?</h3>
              <p className="text-gray-300">
                All server owners must verify their Stripe account and provide legitimate contact information. You can also check server reviews and member counts.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I pledge to multiple servers?</h3>
              <p className="text-gray-300">
                Absolutely! You can support as many Minecraft servers as you want. Each pledge is managed separately in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose Community Pledges for Minecraft?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Secure Payments</h3>
              <p className="text-gray-300 text-sm">
                All transactions processed through Stripe, the industry leader in payment security. Your financial information is never stored on our servers.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Smart Cost Splitting</h3>
              <p className="text-gray-300 text-sm">
                Our algorithm automatically optimizes how costs are split. When more players pledge, everyone&apos;s payments decrease proportionally.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Transparent Process</h3>
              <p className="text-gray-300 text-sm">
                See exactly where your money goes. View server costs, total pledges, and how your contribution helps the community.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">No Hidden Fees</h3>
              <p className="text-gray-300 text-sm">
                What you see is what you pay. No surprise charges, no hidden fees. Just honest, transparent pricing.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Cancel Anytime</h3>
              <p className="text-gray-300 text-sm">
                No long-term commitments. Cancel your pledge whenever you want with no penalties or fees.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Community First</h3>
              <p className="text-gray-300 text-sm">
                Built by gamers, for gamers. We understand the importance of keeping gaming communities alive and thriving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start Supporting Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            Find Minecraft servers that need your support and help keep the community alive.
          </p>
          <Link
            href="/servers?game=Minecraft"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
          >
            <Search className="w-5 h-5" />
            <span>Browse All Minecraft Servers</span>
          </Link>
        </div>
      </section>
    </div>
  )
}


