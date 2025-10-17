"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Initial color based on theme
    const isDark = theme === "dark"

    // Create multiple layers of circles with different depths
    const layers: { circles: THREE.Mesh[]; depth: number; speed: number }[] = []
    const layerCount = 2
    const cols = 8
    const rows = 5
    const spacing = 3.5

    for (let layer = 0; layer < layerCount; layer++) {
      const circles: THREE.Mesh[] = []
      const depth = -3 - layer * 3 // Each layer further back
      const startX = -(cols * spacing) / 2
      const startY = -(rows * spacing) / 2
      const layerScale = 1 + layer * 0.15 // Larger circles in back for perspective
      const layerOpacity = (isDark ? 0.06 : 0.04) * (1 - layer * 0.15) // Much more subtle

      const circleGeometry = new THREE.SphereGeometry(0.25 * layerScale, 16, 16)
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x999999 : 0xcccccc,
        transparent: true,
        opacity: layerOpacity,
        wireframe: true,
      })

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const circle = new THREE.Mesh(circleGeometry, circleMaterial.clone())

          circle.position.x = startX + i * spacing + (layer % 2) * (spacing / 2) // Offset alternate layers
          circle.position.y = startY + j * spacing + (layer % 2) * (spacing / 2)
          circle.position.z = depth

          circle.userData = {
            originalX: circle.position.x,
            originalY: circle.position.y,
            originalZ: circle.position.z,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            phaseZ: Math.random() * Math.PI * 2,
            layer: layer,
            col: i,
            row: j,
          }

          circles.push(circle)
          scene.add(circle)
        }
      }

      layers.push({
        circles,
        depth,
        speed: 1 - layer * 0.15, // Slower movement for further layers (parallax)
      })
    }

    // Add connecting lines between circles in same layer
    const lineGroups: THREE.Line[][] = []
    layers.forEach((layer) => {
      const lines: THREE.Line[] = []
      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x888888 : 0xdddddd,
        transparent: true,
        opacity: 0,
      })

      for (let i = 0; i < layer.circles.length; i++) {
        const circle = layer.circles[i]
        const neighbors = [
          layer.circles[i + 1], // Right
          layer.circles[i + rows], // Below
        ].filter(Boolean)

        neighbors.forEach((neighbor) => {
          const lineGeometry = new THREE.BufferGeometry()
          const positions = new Float32Array([
            circle.position.x,
            circle.position.y,
            circle.position.z,
            neighbor.position.x,
            neighbor.position.y,
            neighbor.position.z,
          ])
          lineGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
          const line = new THREE.Line(lineGeometry, lineMaterial.clone())
          lines.push(line)
          scene.add(line)
        })
      }
      lineGroups.push(lines)
    })

    // Add ambient particles floating between layers
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 80
    const particlePositions = new Float32Array(particleCount * 3)
    const particleVelocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30
      particlePositions[i * 3 + 2] = Math.random() * -20 - 3
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005,
      })
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0xaaaaaa : 0xdddddd,
      transparent: true,
      opacity: isDark ? 0.15 : 0.1,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse position interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Camera parallax movement
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Animate each layer with different speeds (parallax depth)
      layers.forEach((layer, layerIndex) => {
        layer.circles.forEach((circle) => {
          const col = circle.userData.col
          const row = circle.userData.row

          // Complex wave patterns across the grid
          const waveX = Math.sin(elapsedTime * 0.3 + col * 0.3 + layerIndex) * 0.3
          const waveY = Math.cos(elapsedTime * 0.25 + row * 0.3 + layerIndex) * 0.3
          const waveZ =
            Math.sin(elapsedTime * 0.4 + circle.userData.phaseZ + col * 0.2 + row * 0.2) * 1.5

          // Apply waves with layer-specific speed
          circle.position.x = circle.userData.originalX + waveX * layer.speed
          circle.position.y = circle.userData.originalY + waveY * layer.speed
          circle.position.z = circle.userData.originalZ + waveZ * layer.speed

          // 3D rotation based on time and position
          circle.rotation.x = elapsedTime * 0.15 + col * 0.1
          circle.rotation.y = elapsedTime * 0.12 + row * 0.1
          circle.rotation.z = elapsedTime * 0.08 + (col + row) * 0.05

          // Scale pulsing with ripple effect from center
          const distanceFromCenter = Math.sqrt(
            Math.pow(circle.userData.originalX, 2) + Math.pow(circle.userData.originalY, 2)
          )
          const ripple = Math.sin(elapsedTime * 2 - distanceFromCenter * 0.5) * 0.08
          const scale = 1 + ripple + Math.sin(elapsedTime * 0.5 + circle.userData.phaseY) * 0.05
          circle.scale.set(scale, scale, 1)

          // Mouse influence on opacity with distance-based falloff
          const screenX = circle.position.x - camera.position.x
          const screenY = circle.position.y - camera.position.y
          const distanceToMouse = Math.sqrt(screenX * screenX + screenY * screenY) / 8

          const baseMaterial = circle.material as THREE.MeshBasicMaterial
          const layerOpacity = (isDark ? 0.06 : 0.04) * (1 - layerIndex * 0.15)
          const mouseInfluence = Math.max(0, 1 - distanceToMouse)
          baseMaterial.opacity =
            layerOpacity * 0.5 + layerOpacity * mouseInfluence * 1.5 + ripple * 0.1
        })
      })

      // Animate connecting lines
      lineGroups.forEach((lines, layerIndex) => {
        const layer = layers[layerIndex]
        lines.forEach((line, lineIndex) => {
          const positions = line.geometry.attributes.position.array as Float32Array

          // Update line positions to follow circles
          const circleIndex1 = Math.floor(lineIndex / 2)
          const circleIndex2 = circleIndex1 + (lineIndex % 2 === 0 ? 1 : rows)

          if (layer.circles[circleIndex1] && layer.circles[circleIndex2]) {
            const c1 = layer.circles[circleIndex1]
            const c2 = layer.circles[circleIndex2]

            positions[0] = c1.position.x
            positions[1] = c1.position.y
            positions[2] = c1.position.z
            positions[3] = c2.position.x
            positions[4] = c2.position.y
            positions[5] = c2.position.z

            line.geometry.attributes.position.needsUpdate = true

            // Calculate line opacity based on proximity to mouse
            const midX = (c1.position.x + c2.position.x) / 2 - camera.position.x
            const midY = (c1.position.y + c2.position.y) / 2 - camera.position.y
            const distToMouse = Math.sqrt(midX * midX + midY * midY) / 8

            const lineMaterial = line.material as THREE.LineBasicMaterial
            lineMaterial.opacity = Math.max(0, Math.min(0.12, (1 - distToMouse) * 0.15))
          }
        })
      })

      // Animate floating particles
      const positions = particlesGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x
        positions[i * 3 + 1] += particleVelocities[i].y
        positions[i * 3 + 2] += particleVelocities[i].z

        // Wrap around screen edges
        if (Math.abs(positions[i * 3]) > 25) particleVelocities[i].x *= -1
        if (Math.abs(positions[i * 3 + 1]) > 15) particleVelocities[i].y *= -1
        if (positions[i * 3 + 2] > -3 || positions[i * 3 + 2] < -23) particleVelocities[i].z *= -1

        // Subtle attraction to mouse
        const dx = mouse.x * 20 - positions[i * 3]
        const dy = mouse.y * 15 - positions[i * 3 + 1]
        particleVelocities[i].x += dx * 0.00001
        particleVelocities[i].y += dy * 0.00001
      }
      particlesGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      renderer.dispose()

      // Dispose all layers
      layers.forEach((layer) => {
        layer.circles.forEach((circle) => {
          circle.geometry.dispose()
          const material = circle.material as THREE.MeshBasicMaterial
          material.dispose()
        })
      })

      // Dispose all lines
      lineGroups.forEach((lines) => {
        lines.forEach((line) => {
          line.geometry.dispose()
          const material = line.material as THREE.LineBasicMaterial
          material.dispose()
        })
      })

      // Dispose particles
      particlesGeometry.dispose()
      particlesMaterial.dispose()

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
