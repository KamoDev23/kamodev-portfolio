"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-white/95 dark:bg-[#222222]/95 backdrop-blur-md p-6 rounded-sm border border-[#333333]/20 dark:border-[#e0e0e0]/20 shadow-2xl w-[340px] sm:w-[400px] transition-colors duration-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#333333] dark:text-[#e0e0e0] tracking-wide">
            GET IN TOUCH
          </h3>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity text-[#333333] dark:text-[#e0e0e0]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs text-[#666666] dark:text-[#999999] mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm bg-white/50 dark:bg-[#1a1a1a]/50 border border-[#333333]/20 dark:border-[#e0e0e0]/20 rounded-sm focus:outline-none focus:border-[#333333] dark:focus:border-[#e0e0e0] transition-colors text-[#333333] dark:text-[#e0e0e0]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs text-[#666666] dark:text-[#999999] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm bg-white/50 dark:bg-[#1a1a1a]/50 border border-[#333333]/20 dark:border-[#e0e0e0]/20 rounded-sm focus:outline-none focus:border-[#333333] dark:focus:border-[#e0e0e0] transition-colors text-[#333333] dark:text-[#e0e0e0]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs text-[#666666] dark:text-[#999999] mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="w-full px-3 py-2 text-sm bg-white/50 dark:bg-[#1a1a1a]/50 border border-[#333333]/20 dark:border-[#e0e0e0]/20 rounded-sm focus:outline-none focus:border-[#333333] dark:focus:border-[#e0e0e0] transition-colors resize-none text-[#333333] dark:text-[#e0e0e0]"
              placeholder="Your message..."
            />
          </div>

          {submitStatus === "success" && (
            <div className="text-xs text-green-600 dark:text-green-400">Message sent successfully!</div>
          )}

          {submitStatus === "error" && (
            <div className="text-xs text-red-600 dark:text-red-400">Failed to send message. Please try again.</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#333333] dark:bg-[#e0e0e0] text-white dark:text-[#1a1a1a] py-2.5 rounded-sm hover:bg-[#000000] dark:hover:bg-white transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}
