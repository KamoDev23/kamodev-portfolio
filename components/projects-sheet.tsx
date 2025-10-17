"use client"

import { useEffect, useState } from "react"
import { X, ExternalLink, Lock } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectsSheetProps {
  isOpen: boolean
  onClose: () => void
}

interface Project {
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  locked: boolean
  lockReason?: string
  fullDescription?: string
  features?: string[]
  liveUrl?: string
}

const projects: Project[] = [
  {
    title: "TempNest",
    description: "Temporary File Hosting Platform",
    tags: ["Next.js", "Firebase", "Typescript"],
    year: "2025",
    image: "/tempnest.png",
    locked: false,
    fullDescription: "TempNest is a modern, minimalistic temporary file hosting web app. It allows users to instantly upload and share files without requiring signup, offering a smooth, privacy-focused experience. Files are stored securely with automatic deletion after 7 days, making it ideal for quick, temporary file sharing.",
    features: [
      "No Signup Needed – Instantly share files with a unique browser-based user ID, no account required.",
      "7-Day Auto Expiry – Files are automatically deleted after 7 days.",
      "Public/Private Control – Mark files as private (direct link only) or public (appear in shared buckets).",
      "Bucket Sharing – Group files into a single link for easy multi-file sharing and ZIP downloads.",
      "QR Code Sharing – Auto-generated QR codes for every file and bucket, downloadable as PNGs.",
     ],
    liveUrl: "https://tempnest-teal.vercel.app/"
  },
  {
    title: "Love Jones (Demo)",
    description: "E-commerce platform for clothing rentals",
    tags: ["Next.js", "Stripe", "Typescript"],
    year: "2025",
    image: "/lovejones.png",
    locked: false,
    fullDescription: "Love Jones is a premium baby outfit rental platform designed for parents who want stylish, high-quality clothing for their babies (ages 0–24 months) for special occasions like christenings, birthdays, photoshoots, and holidays—without the cost of buying items their child will quickly outgrow. Outfits are available to rent at affordable daily rates.",
    features: [
      "Smart Booking System: Flexible, real-time rental scheduling with automated booking and deposit management.",
      "Comprehensive Product Catalog: Curated, filterable baby outfit collections by age, style, and availability.",
      "Secure Stripe Payment Integration: Safe, multi-method payment processing with automated deposits and refunds.",
      "Admin Dashboard: Centralized control for bookings, inventory, analytics, and customer insights.",
      "User-Friendly Experience: Seamless mobile-friendly interface with guest checkout and wishlist options.",
     ],
    liveUrl: "https://love-jones.vercel.app/"
  },
  {
    title: "Clear Prove",
    description: "Workflow automation and document management system",
    tags: ["Typescript", "Python", "Google-API"],
    year: "2024",
    image: "/ai-analytics-dashboard.png",
    locked: true,
    lockReason: "Private Client Project",
  },
  {
    title: "Drive Link",
    description: "Real-time vehicle and driver management application",
    tags: ["Dart", "Firebase", "Flutter"],
    year: "2023",
    image: "/social-media-app-interface.png",
    locked: true,
    lockReason: "In Development",
  },
  {
    title: "SmartMarks",
    description: "X.com bookmark manager with AI-powered organization",
    tags: ["Next.js", "OpenAI-API", "Typescript"],
    year: "2025",
    image: "/smartmarks.png",
    locked: false,
    fullDescription: "SmartMarks is an intelligent bookmark management platform for X (formerly Twitter) that syncs your saved content, enhances it with AI insights, and offers powerful tools to help you organize and rediscover valuable information from your bookmarks.",
    features: [
      "X Bookmark Sync: Automatically imports all your X bookmarks with full metadata, media, and threading.",
      "Smart Quote & Retweet Handling: Clearly displays quoted tweets and retweets with original context and your commentary.",
      "Rich Media Viewer: Full-screen viewing and downloading of images and videos with metadata and controls.",
      "AI-Powered Insights: Weekly AI analysis of your bookmarks, trends, and personalized content suggestions.",
      "Folder Organization: Custom folder creation with drag-and-drop to visually organize bookmarks.",
      "Reader Mode: Clean, distraction-free reading with AI summaries and explanations for articles and threads.",
     ],
   },
   {
    title: "Smartline",
    description: "Workshop management system",
    tags: ["Next.js", "IMAP/SMTP", "Typescript"],
    year: "2024",
    image: "/smartline.png",
    locked: false,
    fullDescription: "SmartMarks is an intelligent bookmark management platform for X (formerly Twitter) that syncs your saved content, enhances it with AI insights, and offers powerful tools to help you organize and rediscover valuable information from your bookmarks.",
    features: [
      "Project & Workshop Management: End-to-end project tracking with real-time statuses, Gantt views, and document/vehicle history management.",
      "Professional Accounting: Double-entry bookkeeping with 70+ accounts, journal automation, and real-time financial reporting.",
      "Integrated Mail System: OAuth-secured email access with IMAP/SMTP, real-time sync, and attachment handling.",
      "Quote & Invoice Management: VAT-compliant quoting and invoicing with PDF export, aging reports, and status tracking.",
      "Bank Statement Auto-Categorization: CSV import, AI-based transaction tagging, and automatic journal posting.",
      "South African Tax Compliance: Automated VAT, PAYE, UIF, and SDL tracking with SARS-ready reporting and summaries.",
     ],
   },
  // {
  //   title: "Portfolio Builder",
  //   description: "No-code tool for creating stunning portfolios",
  //   tags: ["React", "Node.js", "MongoDB"],
  //   year: "2023",
  //   image: "/portfolio-builder-website-editor.jpg",
  //   locked: false,
  //   fullDescription: "An intuitive drag-and-drop portfolio builder that empowers creatives to build stunning portfolio websites without writing code. Features a rich component library, real-time preview, and one-click deployment.",
  //   features: [
  //     "Drag-and-drop visual editor with live preview",
  //     "Pre-built templates and customizable components",
  //     "Built-in SEO optimization tools",
  //     "Custom domain support and automatic HTTPS",
  //     "Analytics integration for visitor tracking",
  //     "Export to code option for developers"
  //   ],
  //   liveUrl: "https://example.com/portfolio-builder"
  // },
  // {
  //   title: "Fitness Tracker",
  //   description: "Track workouts and nutrition with ease",
  //   tags: ["React Native", "Firebase", "Charts"],
  //   year: "2023",
  //   image: "/fitness-tracking-app.png",
  //   locked: true,
  //   lockReason: "Private Client Project",
  // },
  // {
  //   title: "Music Streaming",
  //   description: "Discover and stream your favorite tracks",
  //   tags: ["Next.js", "Audio API", "Supabase"],
  //   year: "2022",
  //   image: "/music-streaming-app-player-interface.jpg",
  //   locked: true,
  //   lockReason: "In Development",
  // },
]

export function ProjectsSheet({ isOpen, onClose }: ProjectsSheetProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [denyingProject, setDenyingProject] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setExpandedProject(null)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleProjectClick = (index: number, project: Project) => {
    if (project.locked) {
      // Trigger denial animation
      setDenyingProject(index)
      setTimeout(() => setDenyingProject(null), 600)
    } else {
      setExpandedProject(expandedProject === index ? null : index)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (expandedProject !== null) {
            setExpandedProject(null)
          } else {
            onClose()
          }
        }}
      />

      {/* Sheet */}
<div
  className={`fixed inset-0 bg-[#f5f5f5] dark:bg-[#1a1a1a] z-50 transition-all duration-700 ease-out ${
    isOpen ? "translate-y-0" : "translate-y-full"
  }`}
>
  <div className="max-h-screen overflow-y-auto relative">

          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 hover:opacity-70 transition-opacity z-10 text-[#333333] dark:text-[#e0e0e0]"
              aria-label="Close"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Header */}
            <div className="mb-12 sm:mb-16 animate-fade-in">
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#666666] dark:text-[#999999] mb-4 sm:mb-6">
                Projects
              </h2>
              <div className="w-16 sm:w-24 h-[1px] bg-[#333333]/20 dark:bg-[#e0e0e0]/20" />
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  layout
                  className={`${
                    expandedProject === index
                      ? "sm:col-span-2 lg:col-span-3"
                      : ""
                  }`}
                  animate={
                    denyingProject === index
                      ? {
                          x: [0, -10, 10, -10, 10, 0],
                          rotate: [0, -2, 2, -2, 2, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <button
                    className={`group bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm rounded-lg border border-[#333333]/10 dark:border-[#e0e0e0]/10 transition-all duration-500 text-left animate-slide-up overflow-hidden relative w-full ${
                      project.locked
                        ? "cursor-not-allowed"
                        : expandedProject === index
                        ? "border-[#333333]/30 dark:border-[#e0e0e0]/30"
                        : "hover:border-[#333333]/30 dark:hover:border-[#e0e0e0]/30 hover:scale-[1.03] hover:shadow-2xl"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleProjectClick(index, project)}
                  >
                    <div className={`${expandedProject === index ? "sm:flex sm:gap-6" : ""}`}>
                      {/* Project Image */}
                      <div className={`relative overflow-hidden bg-gradient-to-br from-[#333333]/5 to-[#333333]/10 ${
                        expandedProject === index
                          ? "sm:w-1/2 h-64 sm:h-[500px]"
                          : "h-48 sm:h-56"
                      }`}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className={`object-cover transition-all duration-700 ${
                            project.locked
                              ? "blur-sm grayscale opacity-40"
                              : expandedProject !== index ? "group-hover:scale-110" : ""
                          }`}
                        />

                        {/* Locked Overlay */}
                        {project.locked && (
                          <motion.div
                            className="absolute inset-0 bg-[#f5f5f5]/50 dark:bg-[#1a1a1a]/50 backdrop-blur-[2px] flex flex-col items-center justify-center"
                            animate={
                              denyingProject === index
                                ? {
                                    backgroundColor: [
                                      "rgba(245, 245, 245, 0.5)",
                                      "rgba(255, 100, 100, 0.3)",
                                      "rgba(245, 245, 245, 0.5)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                          >
                            <motion.div
                              className="bg-white/90 dark:bg-[#222222]/90 backdrop-blur-sm p-4 rounded-full mb-3"
                              animate={
                                denyingProject === index
                                  ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
                                  : {}
                              }
                              transition={{ duration: 0.5 }}
                            >
                              <Lock className="w-6 h-6 text-[#333333] dark:text-[#e0e0e0]" />
                            </motion.div>
                            <span className="text-xs font-medium text-[#333333] dark:text-[#e0e0e0] bg-white/90 dark:bg-[#222222]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                              {project.lockReason}
                            </span>
                          </motion.div>
                        )}

                        {/* Overlay on hover (only for unlocked) */}
                        {!project.locked && expandedProject !== index && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}

                        {/* Year Badge */}
                        <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full ${
                          project.locked ? "opacity-50" : ""
                        }`}>
                          <span className="text-xs font-mono text-[#333333]">{project.year}</span>
                        </div>

                        {/* External Link Icon (only for unlocked and not expanded) */}
                        {/* {!project.locked && expandedProject !== index && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <ExternalLink className="w-4 h-4 text-[#333333]" />
                          </div>
                        )} */}
                      </div>

                      {/* Content */}
                      <div className={`p-6 ${project.locked ? "opacity-60" : ""} ${
                        expandedProject === index ? "sm:w-1/2 sm:overflow-y-auto sm:max-h-[500px]" : ""
                      }`}>
                        {/* Title */}
                        <h3 className={`text-lg sm:text-xl font-medium mb-3 transition-colors ${
                          project.locked ? "" : "group-hover:text-[#000000] dark:group-hover:text-white"
                        }`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4">
                          {expandedProject === index && project.fullDescription
                            ? project.fullDescription
                            : project.description}
                        </p>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedProject === index && project.features && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mb-4"
                            >
                              <h4 className="text-xs font-medium mb-2 tracking-wide text-[#333333] dark:text-[#e0e0e0]">
                                KEY FEATURES
                              </h4>
                              <ul className="space-y-2">
                                {project.features.map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-[#666666] dark:text-[#999999] leading-relaxed flex items-start"
                                  >
                                    <span className="mr-2 mt-1 w-1 h-1 bg-[#333333] dark:bg-[#e0e0e0] rounded-full flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-1 bg-[#333333]/5 dark:bg-[#e0e0e0]/5 transition-colors rounded-full ${
                                project.locked ? "" : "group-hover:bg-[#333333]/10 dark:group-hover:bg-[#e0e0e0]/10"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Preview Button */}
                        {expandedProject === index && project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-[#333333] dark:bg-[#e0e0e0] text-white dark:text-[#1a1a1a] px-4 py-2 rounded-sm hover:bg-[#000000] dark:hover:bg-white transition-all duration-300 text-sm font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Preview Project
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
