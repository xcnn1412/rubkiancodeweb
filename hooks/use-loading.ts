'use client'

import { useState, useEffect, useRef } from 'react'
import { LOADING_CONFIG } from '@/data/loading-config'

/**
 * useLoading — จัดการ state ของ Loading Screen
 *
 * Returns:
 *  - isVisible: boolean — ควรแสดง Loading Screen หรือไม่
 *  - progress: number  — 0–100 ความคืบหน้าของ progress bar
 *  - statusIndex: number — index ของ statusMessage ที่แสดงอยู่
 */
export function useLoading() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  const startTimeRef = useRef<number>(Date.now())
  const progressRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const statusTimerRef = useRef<NodeJS.Timeout | null>(null)

  const { minDurationMs, exitDelayMs, fadeOutDurationMs, statusMessages } = LOADING_CONFIG

  useEffect(() => {
    startTimeRef.current = Date.now()

    // ── Animate progress bar เลียนแบบการโหลดจริง
    const animateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current
      const naturalProgress = Math.min((elapsed / minDurationMs) * 100, 95)

      // ease-out curve: วิ่งเร็วตอนแรก ช้าลงเมื่อใกล้ 95%
      const eased = naturalProgress < 50
        ? naturalProgress * 1.6
        : 80 + (naturalProgress - 50) * 0.6

      const clamped = Math.min(Math.max(eased, 0), 95)
      progressRef.current = clamped
      setProgress(clamped)

      if (elapsed < minDurationMs) {
        rafRef.current = requestAnimationFrame(animateProgress)
      }
    }

    rafRef.current = requestAnimationFrame(animateProgress)

    // ── Cycle status messages
    const msgCount = statusMessages.length
    const msgInterval = Math.floor(minDurationMs / msgCount)

    statusTimerRef.current = setInterval(() => {
      setStatusIndex(prev => Math.min(prev + 1, msgCount - 1))
    }, msgInterval)

    // ── Trigger exit after minDuration
    const exitTimer = setTimeout(() => {
      // Flash progress to 100%
      setProgress(100)

      setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => setIsVisible(false), fadeOutDurationMs)
      }, exitDelayMs)
    }, minDurationMs)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (statusTimerRef.current) clearInterval(statusTimerRef.current)
      clearTimeout(exitTimer)
    }
  }, [minDurationMs, exitDelayMs, fadeOutDurationMs, statusMessages])

  return { isVisible, isFadingOut, progress, statusIndex }
}
