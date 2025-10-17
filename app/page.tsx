"use client"

import Link from "next/link"
import { useState } from "react"
import { AboutSheet } from "@/components/about-sheet"
import { ProjectsSheet } from "@/components/projects-sheet"
import { ThreeBackground } from "@/components/three-background"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#333333] dark:text-[#e0e0e0] relative overflow-hidden transition-colors duration-500">
      <ThreeBackground />

      {/* Navigation */}
      <nav className="w-full px-4 sm:px-8 py-4 sm:py-6 relative z-10">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto gap-4">
          <button
            onClick={() => {
              setAboutOpen(false)
              setProjectsOpen(false)
            }}
            className="text-xs sm:text-sm tracking-wide hover:opacity-70 transition-opacity"
          >
            ( HOME )
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 relative z-10">
        <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-[120px] leading-none text-[#666666] dark:text-[#999999] mb-6 sm:mb-8 text-center transition-colors duration-500">
          Kamo.Dev
        </h1>
        <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm">
          <button onClick={() => setAboutOpen(true)} className="hover:opacity-70 transition-opacity">
            ( ABOUT )
          </button>
          <button onClick={() => setProjectsOpen(true)} className="hover:opacity-70 transition-opacity">
            ( PROJECTS )
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-8 py-4 sm:py-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end max-w-[1400px] mx-auto text-xs gap-6 sm:gap-0">
          <div className="flex flex-col gap-1">
            <div className="font-medium mb-1">LINKS</div>
            <Link
              href="https://github.com/Kamohelo23"
              target="_blank"
              className="hover:opacity-70 transition-opacity flex items-center gap-1"
            >
              GITHUB <span className="text-[10px]">↗</span>
            </Link>
          </div>
          <div className="text-xs">
            <div>CREATED BY</div>
            <div>KAMO.DEV</div>
          </div>
          <div className="text-xs">© 2025</div>
        </div>
      </footer>

      <AboutSheet isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ProjectsSheet isOpen={projectsOpen} onClose={() => setProjectsOpen(false)} />
    </div>
  )
}
