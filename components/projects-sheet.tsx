"use client"

import { useEffect } from "react"
import { X, ExternalLink, Lock } from "lucide-react"
import Image from "next/image"

interface ProjectsSheetProps {
  isOpen: boolean
  onClose: () => void
}

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout",
    tags: ["Next.js", "Stripe", "Tailwind"],
    year: "2024",
    image: "/modern-ecommerce-interface.png",
    locked: false,
  },
  {
    title: "AI Dashboard",
    description: "Analytics platform powered by machine learning",
    tags: ["React", "Python", "D3.js"],
    year: "2024",
    image: "/ai-analytics-dashboard.png",
    locked: true,
    lockReason: "Private Client Project",
  },
  {
    title: "Social Media App",
    description: "Real-time messaging and content sharing",
    tags: ["Next.js", "WebSocket", "PostgreSQL"],
    year: "2023",
    image: "/social-media-app-interface.png",
    locked: true,
    lockReason: "In Development",
  },
  {
    title: "Portfolio Builder",
    description: "No-code tool for creating stunning portfolios",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2023",
    image: "/portfolio-builder-website-editor.jpg",
    locked: false,
  },
  {
    title: "Fitness Tracker",
    description: "Track workouts and nutrition with ease",
    tags: ["React Native", "Firebase", "Charts"],
    year: "2023",
    image: "/fitness-tracking-app.png",
    locked: true,
    lockReason: "Private Client Project",
  },
  {
    title: "Music Streaming",
    description: "Discover and stream your favorite tracks",
    tags: ["Next.js", "Audio API", "Supabase"],
    year: "2022",
    image: "/music-streaming-app-player-interface.jpg",
    locked: true,
    lockReason: "In Development",
  },
]

export function ProjectsSheet({ isOpen, onClose }: ProjectsSheetProps) {
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
        className={`fixed inset-x-0 bottom-0 bg-[#f5f5f5] dark:bg-[#1a1a1a] z-50 transition-transform duration-700 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Header */}
            <div className="mb-12 sm:mb-16 animate-fade-in">
              <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#666666] dark:text-[#999999] mb-4 sm:mb-6">
                Projects
              </h2>
              <div className="w-16 sm:w-24 h-[1px] bg-[#333333]/20" />
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project, index) => (
                <button
                  key={index}
                  className={`group bg-white/70 dark:bg-[#222222]/70 backdrop-blur-sm rounded-lg border border-[#333333]/10 dark:border-[#e0e0e0]/10 transition-all duration-500 text-left animate-slide-up overflow-hidden relative ${
                    project.locked
                      ? "cursor-not-allowed"
                      : "hover:border-[#333333]/30 dark:hover:border-[#e0e0e0]/30 hover:scale-[1.03] hover:shadow-2xl"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => !project.locked && console.log(`[v0] Clicked project: ${project.title}`)}
                  disabled={project.locked}
                >
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-[#333333]/5 to-[#333333]/10">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        project.locked
                          ? "blur-sm grayscale opacity-40"
                          : "group-hover:scale-110"
                      }`}
                    />

                    {/* Locked Overlay */}
                    {project.locked && (
                      <div className="absolute inset-0 bg-[#f5f5f5]/50 dark:bg-[#1a1a1a]/50 backdrop-blur-[2px] flex flex-col items-center justify-center">
                        <div className="bg-white/90 dark:bg-[#222222]/90 backdrop-blur-sm p-4 rounded-full mb-3">
                          <Lock className="w-6 h-6 text-[#333333] dark:text-[#e0e0e0]" />
                        </div>
                        <span className="text-xs font-medium text-[#333333] dark:text-[#e0e0e0] bg-white/90 dark:bg-[#222222]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          {project.lockReason}
                        </span>
                      </div>
                    )}

                    {/* Overlay on hover (only for unlocked) */}
                    {!project.locked && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}

                    {/* Year Badge */}
                    <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full ${
                      project.locked ? "opacity-50" : ""
                    }`}>
                      <span className="text-xs font-mono text-[#333333]">{project.year}</span>
                    </div>

                    {/* External Link Icon (only for unlocked) */}
                    {!project.locked && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                        <ExternalLink className="w-4 h-4 text-[#333333]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${project.locked ? "opacity-60" : ""}`}>
                    {/* Title */}
                    <h3 className={`text-lg sm:text-xl font-medium mb-3 transition-colors ${
                      project.locked ? "" : "group-hover:text-[#000000]"
                    }`}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 bg-[#333333]/5 transition-colors rounded-full ${
                            project.locked ? "" : "group-hover:bg-[#333333]/10"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
