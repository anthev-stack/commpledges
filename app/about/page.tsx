import Link from "next/link"
import { Metadata } from "next"
import { Server, Users, DollarSign, Heart, Shield, Zap, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Community Pledges - Keep Gaming Servers Alive Together",
  description: "Community Pledges helps gaming communities share server hosting costs. Support Minecraft, Rust, ARK, Valheim, and other game servers through monthly pledges. Join thousands of gamers keeping servers alive.",
  keywords: "about community pledges, gaming server platform, server hosting costs, community funding, gaming server support, pledge platform, minecraft server hosting, rust server hosting, gaming community platform",
  openGraph: {
    title: "About Community Pledges - Keep Gaming Servers Alive Together",
    description: "Help gaming communities share server hosting costs. Support your favorite servers through monthly pledges.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              COMMUNITY PLEDGES
            </h1>
            <p className="text-2xl md:text-3xl text-emerald-100 mb-8 max-w-4xl mx-auto">
              Keeping gaming community servers alive since 2025
            </p>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Share the cost of community servers with your members. Together, we make gaming communities sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              We believe great gaming communities shouldn&apos;t die because of hosting costs. Community Pledges makes it easy for players to chip in and support the servers they love, creating sustainable communities where everyone benefits.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How Community Pledges Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Split Cost Sharing</h3>
              <p className="text-gray-300 text-lg">
                Pay only what you pledged or less. We optimize costs to reduce everyone&apos;s payments when others pledge alongside you, respecting your pledge limit.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Community Driven</h3>
              <p className="text-gray-300 text-lg">
                Join forces with other community members to make server costs more affordable for server owners and sustainable for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Transparent Process</h3>
              <p className="text-gray-300 text-lg">
                See exactly what you&apos;ll pay and how your pledge helped reduce costs for everyone else if you pledged more!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Gamers Love Community Pledges</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <Shield className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Secure Payments</h3>
              <p className="text-gray-300">
                All transactions processed through Stripe. Your payment information is encrypted and never stored on our servers.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <Zap className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Smart Optimization</h3>
              <p className="text-gray-300">
                Our algorithm automatically adjusts payments to minimize costs while respecting everyone&apos;s pledge limits.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <Server className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Game Support</h3>
              <p className="text-gray-300">
                Support servers for Minecraft, Rust, ARK, Valheim, and many other popular multiplayer games.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <Users className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Growing Community</h3>
              <p className="text-gray-300">
                Join thousands of gamers already using Community Pledges to keep their favorite servers running.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <Heart className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">No Hidden Fees</h3>
              <p className="text-gray-300">
                Transparent pricing with no surprise charges. See exactly what you&apos;ll pay before committing.
              </p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <DollarSign className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Flexible Amounts</h3>
              <p className="text-gray-300">
                Pledge what you can afford - $2, $5, $10, or more. Every contribution helps keep servers online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-8">
              <div className="text-5xl font-bold text-emerald-400 mb-2">$0</div>
              <p className="text-gray-300 text-lg">Platform Fee to Get Started</p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-8">
              <div className="text-5xl font-bold text-emerald-400 mb-2">24/7</div>
              <p className="text-gray-300 text-lg">Server Monitoring & Support</p>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-8">
              <div className="text-5xl font-bold text-emerald-400 mb-2">100%</div>
              <p className="text-gray-300 text-lg">Transparent Cost Tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-sm border-2 border-emerald-500/30 rounded-2xl shadow-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Community Pledges today and help keep gaming servers alive!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servers"
                className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span>Browse Servers</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


