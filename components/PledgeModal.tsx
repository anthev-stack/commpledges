"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { MIN_PLEDGE, MAX_PLEDGE } from "@/lib/constants"
import { useCurrency } from "./CurrencyProvider"
import { Lightbulb, DollarSign, CreditCard, TrendingDown, Users } from "lucide-react"

interface PledgeModalProps {
  server: {
    id: string
    name: string
    cost: number
    owner: {
      name: string
    }
  }
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function PledgeModal({ server, isOpen, onClose, onSuccess }: PledgeModalProps) {
  const { data: session } = useSession()
  const { currency, symbol, convertFromUSD, convertToUSD, formatPrice } = useCurrency()
  const [amount, setAmount] = useState("10")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [pledgeStatus, setPledgeStatus] = useState<any>(null)
  const [loadingStatus, setLoadingStatus] = useState(true)

  useEffect(() => {
    if (isOpen) {
      fetchPledgeStatus()
    } else {
      setError("")
      setMessage("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const fetchPledgeStatus = async () => {
    setLoadingStatus(true)
    try {
      const response = await fetch(`/api/servers/${server.id}/pledge`)
      const data = await response.json()
      setPledgeStatus(data)
      
      // Set amount to existing pledge amount if user has one (convert from USD)
      if (data.hasPledge && data.userPledge) {
        const convertedAmount = convertFromUSD(data.userPledge.amount)
        setAmount(convertedAmount.toFixed(2))
      } else {
        const defaultConverted = convertFromUSD(10)
        setAmount(defaultConverted.toFixed(2))
      }
    } catch (error) {
      console.error("Error fetching pledge status:", error)
      setAmount("10")
    } finally {
      setLoadingStatus(false)
    }
  }

  const handlePledge = async () => {
    const pledgeAmountInUserCurrency = parseFloat(amount)
    
    if (isNaN(pledgeAmountInUserCurrency)) {
      setError(`Please enter a valid amount`)
      return
    }

    // Convert user's currency input to USD for storage
    const pledgeAmountUSD = convertToUSD(pledgeAmountInUserCurrency)
    
    // Check min/max in USD
    if (pledgeAmountUSD < MIN_PLEDGE || pledgeAmountUSD > MAX_PLEDGE) {
      const minConverted = convertFromUSD(MIN_PLEDGE)
      const maxConverted = convertFromUSD(MAX_PLEDGE)
      setError(`Pledge must be between ${symbol}${minConverted.toFixed(2)} and ${symbol}${maxConverted.toFixed(2)}`)
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/servers/${server.id}/pledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: pledgeAmountUSD }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create pledge")
        return
      }

      setMessage(data.message)
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleUnpledge = async () => {
    if (!confirm("Are you sure you want to cancel your pledge?")) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/servers/${server.id}/pledge`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to cancel pledge")
        return
      }

      setMessage("Pledge cancelled successfully!")
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 1500)
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800">
          <h2 className="text-xl font-bold text-white">
            {pledgeStatus?.hasPledge ? "Manage Pledge" : "Make a Pledge"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {loadingStatus ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : pledgeStatus?.hasPledge ? (
            // User already has a pledge - show management options
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Your Current Pledge
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong className="text-white">Pledged Amount:</strong> {formatPrice(pledgeStatus.userPledge.amount)}/month</p>
                  <p><strong className="text-white">Estimated Payment:</strong> {formatPrice(pledgeStatus.userPledge.optimizedAmount || pledgeStatus.userPledge.amount)}/month</p>
                  {pledgeStatus.userPledge.optimizedAmount < pledgeStatus.userPledge.amount && (
                    <p className="text-green-400 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      You&apos;re saving {formatPrice(pledgeStatus.userPledge.amount - pledgeStatus.userPledge.optimizedAmount)}/month thanks to optimization!
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleUnpledge}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                {loading ? "Cancelling..." : "Cancel Pledge"}
              </button>
            </div>
          ) : !session ? (
            // Guest user
            <div className="space-y-4">
              <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sign In Required
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  You need to be logged in to pledge to a server.
                </p>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          ) : !pledgeStatus?.canPledge ? (
            // Server at capacity
            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Server at Capacity
                </h3>
                <p className="text-sm text-gray-300">
                  This server has reached maximum pledgers ({pledgeStatus.maxPledges} people).
                </p>
              </div>
            </div>
          ) : (
            // Create pledge form
            <div className="space-y-4">
              <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Server:</strong> {server.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Monthly cost: {formatPrice(server.cost)} • {pledgeStatus.currentPledges}/{pledgeStatus.maxPledges} pledgers
                </p>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-900/30 border border-green-700/50 text-green-300 px-4 py-3 rounded-lg text-sm">
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Monthly Pledge ({symbol}{convertFromUSD(MIN_PLEDGE).toFixed(2)}-{symbol}{convertFromUSD(MAX_PLEDGE).toFixed(2)})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">{symbol}</span>
                  <input
                    type="number"
                    min={convertFromUSD(MIN_PLEDGE)}
                    max={convertFromUSD(MAX_PLEDGE)}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  />
                </div>
                {currency !== 'USD' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Amounts are displayed in {currency} but stored in USD
                  </p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[2, 5, 10, 15, 20].map((presetUSD) => {
                  const convertedPreset = convertFromUSD(presetUSD)
                  const roundedPreset = Math.round(convertedPreset)
                  return (
                    <button
                      key={presetUSD}
                      type="button"
                      onClick={() => setAmount(roundedPreset.toFixed(2))}
                      className="px-3 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition text-sm font-medium text-gray-300 bg-slate-900"
                    >
                      {symbol}{roundedPreset}
                    </button>
                  )
                })}
              </div>

              {/* Optimization Preview */}
              {parseFloat(amount) >= MIN_PLEDGE && parseFloat(amount) <= MAX_PLEDGE && (
                <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-white mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-emerald-400" />
                    Smart Optimization
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-indigo-400" />
                      You pledge: <strong className="text-white ml-1">${parseFloat(amount).toFixed(2)}/month</strong>
                    </p>
                    <p className="text-green-400 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Est. payment: <strong className="ml-1">${Math.min(parseFloat(amount), server.cost / (pledgeStatus.currentPledges + 1)).toFixed(2)}/month</strong>
                    </p>
                    <p className="text-xs text-gray-400 mt-2 flex items-start">
                      <Users className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>When more people join, your cost goes down! The more pledgers, the less everyone pays.</span>
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handlePledge}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : `Pledge $${amount}/month`}
              </button>

              <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Your saved payment method will be charged automatically each month
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}