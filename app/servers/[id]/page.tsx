"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Copy, Check, Heart, HeartHandshake, Edit3, Trash2, Eye, Settings, Zap, X } from "lucide-react"
import PledgeModal from "@/components/PledgeModal"
import ServerStats from "@/components/ServerStats"
import { Price } from "@/components/Price"
import { useCurrency } from "@/components/CurrencyProvider"

export const dynamic = 'force-dynamic'

interface Server {
  id: string
  name: string
  description: string
  gameType: string
  serverIp: string
  playerCount: number
  cost: number
  withdrawalDay: number
  imageUrl: string
  isRealm?: boolean
  owner: {
    id: string
    name: string
    image: string
    stripeAccountId: string
    stripeOnboardingComplete: boolean
  }
  community?: {
    id: string
    name: string
    imageUrl: string | null
  } | null
  pledges: Array<{
    id: string
    amount: number
    optimizedAmount: number | null
    createdAt: string
    updatedAt: string
    user: {
      id: string
      name: string
      image: string
    }
  }>
  totalPledged: number
  totalOptimized: number
  pledgerCount: number
}

export default function ServerPage({ params }: { params: Promise<{ id: string }> }) {
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()
  const [server, setServer] = useState<Server | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showPledgeModal, setShowPledgeModal] = useState(false)
  const [serverId, setServerId] = useState("")
  const [userPledge, setUserPledge] = useState<any>(null)
  const [checkingPledge, setCheckingPledge] = useState(true)
  const [gameBannerUrl, setGameBannerUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setServerId(resolvedParams.id)
    }
    loadParams()
  }, [params])

  const fetchGameBanner = useCallback(async () => {
    if (!server?.gameType) return

    try {
      // First try to get game-specific banner
      const gameResponse = await fetch(`/api/admin/game-banners?type=game-banner&gameType=${encodeURIComponent(server.gameType)}`)
      
      if (gameResponse.ok) {
        const gameData = await gameResponse.json()
        setGameBannerUrl(gameData.dataUrl)
        return
      }

      // If no game-specific banner, try default banner
      const defaultResponse = await fetch('/api/admin/game-banners?type=default-banner')
      
      if (defaultResponse.ok) {
        const defaultData = await defaultResponse.json()
        setGameBannerUrl(defaultData.dataUrl)
      }
    } catch (error) {
      console.error('Failed to fetch game banner:', error)
    }
  }, [server?.gameType])

  const checkUserPledge = async () => {
    if (!serverId) return
    
    setCheckingPledge(true)
    try {
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/servers/${serverId}/pledge?t=${Date.now()}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Pledge status data:', data) // Debug log
        setUserPledge(data.hasPledge ? data.userPledge : null)
      }
    } catch (error) {
      console.error("Error checking pledge:", error)
    } finally {
      setCheckingPledge(false)
    }
  }

  const fetchServer = async () => {
    try {
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/servers/${serverId}?t=${Date.now()}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Server not found")
        return
      }

      setServer(data)
    } catch (err) {
      setError("Failed to load server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (serverId) {
      fetchServer()
      checkUserPledge()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverId])

  useEffect(() => {
    if (server?.gameType) {
      fetchGameBanner()
    }
  }, [server?.gameType, fetchGameBanner])

  useEffect(() => {
    // Show success message if redirected from payment
    if (searchParams.get("donation") === "success" && typeof window !== 'undefined') {
      // Could add a success toast/notification here
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [searchParams])

  const handlePledgeSuccess = () => {
    setShowPledgeModal(false)
    fetchServer()
    checkUserPledge()
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleRemovePledge = async () => {
    if (!confirm("Are you sure you want to remove your pledge?")) {
      return
    }

    try {
      const response = await fetch(`/api/servers/${serverId}/pledge`, {
        method: "DELETE",
      })

      if (response.ok) {
        setUserPledge(null)
        fetchServer()
        checkUserPledge()
        alert("Pledge removed successfully!")
      } else {
        const data = await response.json()
        alert(data.error || "Failed to remove pledge")
      }
    } catch (error) {
      console.error("Remove pledge error:", error)
      alert("Failed to remove pledge")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading server...</p>
        </div>
      </div>
    )
  }

  if (error || !server) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Server Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/servers"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Browse Servers
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = Math.min((server.totalPledged / server.cost) * 100, 100)
  const maxPledgers = Math.floor(server.cost / 2) // $2 minimum

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className={`relative h-80 overflow-hidden ${gameBannerUrl ? '' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
        {gameBannerUrl && (
          <>
            {/* Blurred background image */}
            <Image
              src={gameBannerUrl}
              alt={server.gameType}
              fill
              className="object-cover blur-sm scale-110"
            />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/servers"
              className="inline-flex items-center text-white hover:text-gray-200 mb-3 drop-shadow-lg"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Servers
            </Link>
            <span className="inline-block px-3 py-1 bg-emerald-600/90 text-white text-sm font-semibold rounded drop-shadow-lg mb-4">
              {server.gameType}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow-lg">
              {server.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Server</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {server.description || "No description provided."}
              </p>

              {server.serverIp && (
                <div className="mt-4 p-4 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">SERVER IP:</p>
                  <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                    <code className="text-sm text-emerald-400 font-mono flex-1">{server.serverIp}</code>
                    <button
                      onClick={() => copyToClipboard(server.serverIp)}
                      className="ml-3 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                      title="Copy IP address"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Linked Community */}
            {server.community && (
              <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Part of Community</h2>
                <Link
                  href={`/communities/${server.community.id}`}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition"
                >
                  {server.community.imageUrl ? (
                    <Image
                      src={server.community.imageUrl}
                      alt={server.community.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-15 h-15 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl text-white font-bold">
                        {server.community.name[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{server.community.name}</h3>
                    <p className="text-sm text-gray-600">View community profile →</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Active Pledgers */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Pledgers</h2>
              {server.pledges.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pledges yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {server.pledges.map((pledge) => (
                    <div key={pledge.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0">
                      {pledge.user.image ? (
                        <Image
                          src={pledge.user.image}
                          alt={pledge.user.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {pledge.user.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            {pledge.user.name || "Anonymous"}
                          </span>
                          <div className="text-right">
                            <span className="text-indigo-600 font-semibold block">
                              <Price amountUSD={pledge.amount} showCode={false} />/mo
                            </span>
                            {pledge.optimizedAmount && (
                              <span className={`text-xs ${pledge.optimizedAmount < pledge.amount ? 'text-green-600' : 'text-gray-500'}`}>
                                pays <Price amountUSD={pledge.optimizedAmount} showCode={false} />
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Pledged {new Date(pledge.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Realm Info or Live Server Stats */}
            {server.isRealm ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg shadow p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-900">MINECRAFT REALM</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>This is a private realm. Players join through realm invitations, not public IP ADDRESSES.</p>
                      <p className="mt-2 font-semibold">Live server stats are not available for realms.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : server.serverIp ? (
              <ServerStats serverId={server.id} gameType={server.gameType} />
            ) : null}

            {/* Pledge Card */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 sticky top-6">
              {/* Stats */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <Price amountUSD={server.totalPledged} showCode={true} />
                </div>
                <p className="text-sm text-gray-600">
                  pledged by {server.pledgerCount} {server.pledgerCount === 1 ? "person" : "people"}
                </p>
                {server.totalOptimized > 0 && server.totalOptimized < server.totalPledged && (
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    💰 Optimized to <Price amountUSD={server.totalOptimized} showCode={false} />/mo
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{progressPercentage.toFixed(0)}% funded</span>
                  <span><Price amountUSD={server.cost} showCode={false} />/mo needed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {server.pledgerCount}/{maxPledgers} slots filled
                </p>
              </div>

              {/* Payment Schedule */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📅 Payment Schedule</h3>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>
                    <strong>Charge Date:</strong> Day {server.withdrawalDay - 2} of each month
                  </p>
                  <p>
                    <strong>Payment Due:</strong> Day {server.withdrawalDay} of each month
                  </p>
                  <p className="text-blue-700 mt-2">
                    Pledgers are charged 2 days before the server payment is due, ensuring funds arrive on time.
                  </p>
                </div>
              </div>

              {/* Pledge Buttons */}
              {server.owner.stripeOnboardingComplete ? (
                checkingPledge ? (
                  <div className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold text-center">
                    Checking pledge status...
                  </div>
                ) : userPledge ? (
                  <div className="space-y-3">
                    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">Your Pledge</p>
                          <p className="text-2xl font-bold text-emerald-400">{formatPrice(userPledge.amount)}/month</p>
                          {userPledge.optimizedAmount && userPledge.optimizedAmount < userPledge.amount && (
                            <p className="text-sm text-emerald-300 mt-1">
                              Actually paying: {formatPrice(userPledge.optimizedAmount)}/month 💰
                            </p>
                          )}
                        </div>
                        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPledgeModal(true)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Edit3 className="w-5 h-5" />
                      <span>Change Pledge Amount</span>
                    </button>
                    <button
                      onClick={handleRemovePledge}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <X className="w-5 h-5" />
                      <span>Remove Pledge</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowPledgeModal(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <HeartHandshake className="w-5 h-5" />
                    <span>Make a Pledge</span>
                  </button>
                )
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-yellow-800">
                    Server owner hasn&apos;t set up payouts yet
                  </p>
                </div>
              )}

            </div>

            {/* Server Owner Card */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Server Owner</h3>
              <div className="flex items-center">
                {server.owner.image ? (
                  <Image
                    src={server.owner.image}
                    alt={server.owner.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {server.owner.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{server.owner.name || "Anonymous"}</p>
                  <Link
                    href={`/users/${server.owner.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pledge Modal */}
      <PledgeModal
        server={server}
        isOpen={showPledgeModal}
        onClose={() => setShowPledgeModal(false)}
        onSuccess={handlePledgeSuccess}
      />
    </div>
  )
}
