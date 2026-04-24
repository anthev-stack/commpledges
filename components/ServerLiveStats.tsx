"use client"

import { useState, useEffect } from "react"

interface ServerLiveStatsProps {
  serverId: string
  serverIp: string | null
}

export default function ServerLiveStats({ serverId, serverIp }: ServerLiveStatsProps) {
  const [stats, setStats] = useState<{ online: number; max: number; map?: string | null } | null>(null)
  const [isOffline, setIsOffline] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!serverIp) {
      setLoading(false)
      return
    }

    fetchStats()
    // Refresh every 60 seconds for browser page (less frequent than individual page)
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverId])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}/stats`)
      const data = await response.json()
      
      if (response.ok && data.stats?.online && data.stats?.players) {
        setStats({
          online: data.stats.players.online,
          max: data.stats.players.max,
          map: data.stats.map || null,
        })
        setIsOffline(false)
      } else {
        setStats(null)
        setIsOffline(true)
      }
    } catch (error) {
      console.error("Failed to fetch server stats:", error)
      setStats(null)
      setIsOffline(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <span className="flex items-center text-gray-400">
        <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        ...
      </span>
    )
  }

  if (!serverIp) {
    return null
  }

  // Show offline status
  if (isOffline || !stats) {
    return (
      <span className="flex items-center text-red-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
        <span className="text-xs font-medium">Offline</span>
      </span>
    )
  }

  return (
    <span className="flex items-center text-gray-300">
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className={stats.online > 0 ? 'text-green-400' : ''}>
        {stats.online}/{stats.max}
      </span>
      <span className="text-gray-500 ml-1 text-xs">online</span>
      {stats.map && (
        <>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-gray-400 text-xs">{stats.map}</span>
        </>
      )}
    </span>
  )
}


