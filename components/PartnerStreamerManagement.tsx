'use client'

import { useState, useEffect } from 'react'
import { Play, Plus, Edit2, Trash2, Star, CheckCircle, XCircle, Info } from 'lucide-react'

interface PartnerStreamer {
  id: string
  username: string
  displayName: string
  priority: number
  isActive: boolean
  createdAt: string
  addedByUser: {
    id: string
    name: string | null
    email: string | null
  }
}

export default function PartnerStreamerManagement() {
  const [streamers, setStreamers] = useState<PartnerStreamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    priority: 0,
    isActive: true
  })

  useEffect(() => {
    fetchStreamers()
  }, [])

  const fetchStreamers = async () => {
    try {
      const response = await fetch('/api/admin/partner-streamers')
      const data = await response.json()
      
      if (response.ok) {
        setStreamers(data)
      } else {
        setError(data.error || 'Failed to load streamers')
      }
    } catch (err) {
      setError('Failed to load streamers')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const url = editingId 
        ? `/api/admin/partner-streamers/${editingId}`
        : '/api/admin/partner-streamers'
      
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save streamer')
        return
      }

      // Reset form and refresh list
      setFormData({ username: '', displayName: '', priority: 0, isActive: true })
      setShowAddForm(false)
      setEditingId(null)
      fetchStreamers()
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const handleEdit = (streamer: PartnerStreamer) => {
    setFormData({
      username: streamer.username,
      displayName: streamer.displayName,
      priority: streamer.priority,
      isActive: streamer.isActive
    })
    setEditingId(streamer.id)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner streamer?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/partner-streamers/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchStreamers()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete streamer')
      }
    } catch (err) {
      setError('Failed to delete streamer')
    }
  }

  const cancelForm = () => {
    setFormData({ username: '', displayName: '', priority: 0, isActive: true })
    setShowAddForm(false)
    setEditingId(null)
    setError('')
  }

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Partner Streamers</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage Twitch streamers that appear on the homepage when live
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Streamer</span>
        </button>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">How Priority Works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Higher priority (0-1000) = shown first when multiple streamers are live</li>
              <li>Only active streamers are checked for live status</li>
              <li>The homepage checks for live streamers every 2 minutes</li>
              <li>Only one streamer displays at a time (highest priority)</li>
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Streamer' : 'Add New Streamer'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitch Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                  required
                  disabled={!!editingId}
                  placeholder="e.g., hrry (lowercase, no @)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Lowercase only, no @ symbol</p>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  required
                  placeholder="e.g., HRRY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">How it appears on site</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority (0-1000)
                </label>
                <input
                  id="priority"
                  type="number"
                  min="0"
                  max="1000"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Higher = shown first</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Status
                </label>
                <label className="flex items-center space-x-2 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Active (shown when live)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                {editingId ? 'Update Streamer' : 'Add Streamer'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Streamers List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">
            Partner Streamers ({streamers.length})
          </h3>
        </div>
        
        {streamers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Play className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No partner streamers added yet</p>
            <p className="text-sm mt-1">Click &quot;Add Streamer&quot; to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {streamers.map((streamer) => (
              <div key={streamer.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{streamer.displayName}</h4>
                        {streamer.isActive ? (
                          <span title="Active">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </span>
                        ) : (
                          <span title="Inactive">
                            <XCircle className="w-4 h-4 text-red-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">@{streamer.username}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-semibold">{streamer.priority}</span>
                      </div>

                      <div className="text-xs text-gray-500">
                        Added by {streamer.addedByUser.name || 'Unknown'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(streamer)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(streamer.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

