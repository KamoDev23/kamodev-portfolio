"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  read: boolean
}

function AdminMessagesContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()

  const secret = searchParams?.get("secret")

  useEffect(() => {
    if (secret === "kamodev23admin") {
      setAuthenticated(true)
      fetchMessages()
    }
  }, [secret])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/messages?secret=kamodev23admin`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      } else {
        setError("Failed to fetch messages")
      }
    } catch (err) {
      setError("Error fetching messages")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "kamodev23admin") {
      router.push("/admin/messages?secret=kamodev23admin")
    } else {
      setError("Incorrect password")
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] flex items-center justify-center p-4 transition-colors duration-500">
        <div className="bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm p-8 rounded-sm border border-[#333333]/10 dark:border-[#e0e0e0]/10 w-full max-w-md">
          <h1 className="text-2xl font-medium mb-6 text-[#333333] dark:text-[#e0e0e0]">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#666666] dark:text-[#999999] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/50 dark:bg-[#1a1a1a]/50 border border-[#333333]/20 dark:border-[#e0e0e0]/20 rounded-sm focus:outline-none focus:border-[#333333] dark:focus:border-[#e0e0e0] text-[#333333] dark:text-[#e0e0e0] transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#333333] dark:bg-[#e0e0e0] text-white dark:text-[#1a1a1a] py-3 rounded-sm hover:bg-[#000000] dark:hover:bg-white transition-all duration-300 font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] p-4 sm:p-8 transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-medium mb-2 text-[#333333] dark:text-[#e0e0e0]">Messages</h1>
          <p className="text-sm text-[#666666] dark:text-[#999999]">Contact form submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#666666] dark:text-[#999999]">Loading messages...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600 dark:text-red-400">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-[#666666] dark:text-[#999999]">No messages yet</div>
        ) : (
          <div className="space-y-4">
            {messages
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((message) => (
                <div
                  key={message.id}
                  className="bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm p-6 rounded-sm border border-[#333333]/10 dark:border-[#e0e0e0]/10 hover:border-[#333333]/20 dark:hover:border-[#e0e0e0]/20 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                    <div>
                      <h3 className="font-medium text-[#333333] dark:text-[#e0e0e0] mb-1">{message.name}</h3>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-sm text-[#666666] dark:text-[#999999] hover:opacity-70 transition-opacity"
                      >
                        {message.email}
                      </a>
                    </div>
                    <span className="text-xs text-[#666666] dark:text-[#999999] font-mono">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#333333] dark:text-[#e0e0e0] whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] flex items-center justify-center text-[#666666] dark:text-[#999999]">Loading...</div>}>
      <AdminMessagesContent />
    </Suspense>
  )
}
