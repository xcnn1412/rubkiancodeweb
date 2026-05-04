"use client"

import { useEffect, useRef } from "react"

const CODE_TOKENS = [
  // brackets & operators
  "</>", "{}", "()", "[]", "=>", "===", "!==", "&&", "||", "??", "++", "--", "...",
  // keywords
  "const", "let", "var", "function", "return", "import", "export", "default",
  "async", "await", "class", "extends", "new", "this", "null", "undefined",
  "true", "false", "if", "else", "for", "while", "try", "catch",
  // common snippets
  ".map()", ".filter()", ".reduce()", "console.log()", "useState()", "useEffect()",
  "npm i", "git push", "git commit", "node .", "yarn dev",
  // numbers & hex
  "0x1F", "0b1010", "NaN", "Infinity", "Math.PI",
  // symbols
  "#!", "@", "$", "%", "~", "^", "|", "&", "*", "//",
]

interface Particle {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

interface CodeBgProps {
  opacity?: number
  particleCount?: number
  className?: string
}

export function CodeBg({ opacity = 1, particleCount = 55, className = "" }: CodeBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = ["#bbbf41ff", "#709195ff", "rgba(159, 158, 158, 1)", "#f3f84a", "#93c8cf"]

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // Create particles
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const speed = Math.random() * 0.8 + 0.3
      const angle = Math.random() * Math.PI * 2
      return {
        text: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.floor(Math.random() * 9) + 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.3 + 0.15,
      }
    })

    let animId: number
    let isVisible = false   // Intersection Observer state
    let isTabActive = true  // Page Visibility API state

    const draw = () => {
      // Only animate when both visible in viewport AND tab is active
      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        // Bounce off walls
        const textWidth = ctx.measureText(p.text).width
        if (p.x <= 0) {
          p.x = 0
          p.vx = Math.abs(p.vx)
        } else if (p.x + textWidth >= canvas.width) {
          p.x = canvas.width - textWidth
          p.vx = -Math.abs(p.vx)
        }
        if (p.y - p.size <= 0) {
          p.y = p.size
          p.vy = Math.abs(p.vy)
        } else if (p.y >= canvas.height) {
          p.y = canvas.height
          p.vy = -Math.abs(p.vy)
        }

        p.x += p.vx
        p.y += p.vy

        // Draw
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.font = `bold ${p.size}px 'Courier New', 'Consolas', monospace`
        ctx.fillStyle = p.color
        ctx.fillText(p.text, p.x, p.y)
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    // ── Intersection Observer: pause when canvas leaves viewport ──
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvas)

    // ── Page Visibility API: pause when tab is hidden ──
    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [particleCount])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
