"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { ContactForm } from "./contact-form"

interface AboutSheetProps {
  isOpen: boolean
  onClose: () => void
}

const timeline = [
  {
    year: "2025",
    title: "Full-Stack Developer - Tech Lead",
    company: "Ellusion Co",
    description: "Leading development of scalable web applications",
  },
  {
    year: "2024",
    title: "Full-Stack Developer",
    company: "Ellusion Co.",
    description: "Built modern web experiences for enterprise clients",
  },
  {
    year: "2023",
    title: "Frontend Developer",
    company: "Ellusion Co.",
    description: "Crafted beautiful user interfaces and interactions for mobile applications",
  },
  {
    year: "2022",
    title: "Junior Developer",
    company: "Mbula R&D",
    description: "Started journey in web development",
  },
]

export function AboutSheet({ isOpen, onClose }: AboutSheetProps) {
  const [contactFormOpen, setContactFormOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-[#f5f5f5] dark:bg-[#1a1a1a] z-50 transition-all duration-700 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 hover:opacity-70 transition-opacity text-[#333333] dark:text-[#e0e0e0]"
              aria-label="Close"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Header */}
            <div className="mb-8 animate-fade-in">
              <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#666666] dark:text-[#999999] mb-3 sm:mb-4 transition-colors duration-500">
                About
              </h2>
              <div className="w-12 sm:w-16 h-[1px] bg-[#333333]/20 dark:bg-[#e0e0e0]/20 transition-colors duration-500" />
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-h-[calc(100vh-180px)] overflow-hidden">
              {/* Left Column - Profile Card */}
              <div className="animate-slide-up">
                <div className="bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm p-6 rounded-sm border border-[#333333]/10 dark:border-[#e0e0e0]/10 hover:border-[#333333]/20 dark:hover:border-[#e0e0e0]/20 transition-all duration-500 h-full">
                  {/* Profile Image */}
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#333333]/20 dark:border-[#e0e0e0]/20">
                      <Image
                        src="/professional-developer-portrait.png"
                        alt="Kamo.Dev Profile"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-[#333333] dark:text-[#e0e0e0] transition-colors duration-500">
                        Kamo.Dev
                      </h3>
                      <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-sm text-[#666666] dark:text-[#999999] transition-colors duration-500 mb-4">
                      Full-Stack & System Developer
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#666666] dark:text-[#999999] mb-4">
                      A passionate developer crafting beautiful digital experiences and robust company-level management systems.
                      Specializing in modern web technologies, AI/ML solutions, and enterprise system development.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium mb-3 tracking-wide text-[#333333] dark:text-[#e0e0e0]">
                      SKILLS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Python",
                        "AI/ML",
                        "Node.js",
                        "Google Cloud",
                        "Firebase",
                        "Tailwind",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 bg-[#333333]/5 dark:bg-[#e0e0e0]/5 hover:bg-[#333333]/10 dark:hover:bg-[#e0e0e0]/10 transition-colors rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-y border-[#333333]/10 dark:border-[#e0e0e0]/10 transition-colors duration-500">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-medium mb-1 text-[#333333] dark:text-[#e0e0e0]">
                        50+
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#666666] dark:text-[#999999]">projects</div>
                    </div>
                    <div className="text-center border-l border-[#333333]/10 dark:border-[#e0e0e0]/10">
                      <div className="text-lg sm:text-xl font-medium mb-1 text-[#333333] dark:text-[#e0e0e0]">
                        100%
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#666666] dark:text-[#999999]">success</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-6 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#666666] dark:text-[#999999]">Email:</span>
                      <a
                        href="mailto:kamo.dev23@gmail.com"
                        className="hover:opacity-70 transition-opacity text-[#333333] dark:text-[#e0e0e0]"
                      >
                        kamo.dev23@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#666666] dark:text-[#999999]">Location:</span>
                      <span className="text-[#333333] dark:text-[#e0e0e0]">Remote / Global</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#666666] dark:text-[#999999]">Status:</span>
                      <span className="flex items-center gap-1.5 text-[#333333] dark:text-[#e0e0e0]">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Available for projects
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setContactFormOpen(true)}
                    className="w-full bg-[#333333] dark:bg-[#e0e0e0] text-white dark:text-[#1a1a1a] py-3 rounded-sm hover:bg-[#000000] dark:hover:bg-white transition-all duration-300 text-sm font-medium"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>

              {/* Right Column - Career Timeline */}
              <div className="animate-slide-up delay-100">
                <div className="bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm p-6 rounded-sm border border-[#333333]/10 dark:border-[#e0e0e0]/10 hover:border-[#333333]/20 dark:hover:border-[#e0e0e0]/20 transition-all duration-500 h-full overflow-y-auto">
                  <h3 className="text-xs font-medium mb-6 tracking-wide text-[#333333] dark:text-[#e0e0e0]">
                    CAREER TIMELINE
                  </h3>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[6px] top-0 bottom-0 w-[1px] bg-[#333333]/20 dark:bg-[#e0e0e0]/20" />

                    {/* Timeline Items */}
                    <div className="space-y-6">
                      {timeline.map((item, index) => (
                        <div key={index} className="relative pl-6 group">
                          {/* Timeline Dot */}
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#333333] dark:bg-[#e0e0e0] group-hover:scale-125 transition-transform duration-300" />

                          {/* Content */}
                          <div>
                            <div className="flex items-start justify-between mb-1 gap-2">
                              <h4 className="font-medium text-sm text-[#333333] dark:text-[#e0e0e0]">
                                {item.title}
                              </h4>
                              <span className="text-[10px] sm:text-xs text-[#666666] dark:text-[#999999] font-mono flex-shrink-0">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-xs text-[#666666] dark:text-[#999999] mb-1">{item.company}</p>
                            <p className="text-xs text-[#666666] dark:text-[#999999]/80 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Popup */}
      <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
    </>
  )
}
