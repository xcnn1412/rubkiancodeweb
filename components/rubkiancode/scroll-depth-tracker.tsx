"use client"

// ════════════════════════════════════════════════════════════════════════
// SCROLL DEPTH TRACKER — ส่ง GA event เมื่อ scroll ถึง 25/50/75/90%
// ════════════════════════════════════════════════════════════════════════
// mount 1 ครั้งใน root layout — track ทุกหน้า
// reset เมื่อ pathname เปลี่ยน (รองรับ SPA navigation ของ Next.js App Router)
//
// GA4 enhanced measurement มี scroll_depth ที่ 90% อยู่แล้ว
// แต่นี่เพิ่ม 25/50/75% เพื่อ funnel ละเอียดกว่า
// ════════════════════════════════════════════════════════════════════════

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackScrollDepth } from "@/lib/analytics"

const MILESTONES = [25, 50, 75, 90] as const

export function ScrollDepthTracker() {
  const pathname = usePathname()
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    fired.current = new Set()

    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      if (scrollHeight <= 0) return
      const percent = (scrollTop / scrollHeight) * 100

      for (const m of MILESTONES) {
        if (percent >= m && !fired.current.has(m)) {
          fired.current.add(m)
          trackScrollDepth(m)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  return null
}
