"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Clapperboard, ImagePlus } from "lucide-react"
import type { MediaItem } from "@/data/showcase-media"

// ─────────────────────────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_IMAGE_DURATION = 4000 // ms
const VIDEO_POLL_MS = 80 // ความถี่ poll currentTime (ms)

// ─────────────────────────────────────────────────────────────────────────────
//  Props
// ─────────────────────────────────────────────────────────────────────────────
interface ShowcaseMediaPlayerProps {
  items: MediaItem[]
  bgColor: string
  /** When true, player fills its parent container height (no fixed aspect ratio). */
  fillContainer?: boolean
  /** Overlay elements (channel badge, category badge, close btn) passed as children */
  children?: React.ReactNode
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helper: progress segments (IG Story style)
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({
  count,
  current,
  progress,
}: {
  count: number
  current: number
  progress: number // 0–1 for the current segment
}) {
  if (count === 0) return null
  return (
    <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-[3px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.35)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width:
                i < current ? "100%" : i === current ? `${progress * 100}%` : "0%",
              background: i <= current ? "#f3f84a" : "transparent",
              transition: i === current ? "width 0.08s linear" : "none",
            }}
          />
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Empty state — จอพรีวิวสวยๆ แม้ยังไม่มีคลิป
// ─────────────────────────────────────────────────────────────────────────────
function EmptyPreview({ bgColor }: { bgColor: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
      {/* Icon cluster */}
      <div className="relative">
        <div
          className="w-20 h-20 flex items-center justify-center"
          style={{
            background: "rgba(26,14,0,0.18)",
            border: "3px solid rgba(26,14,0,0.35)",
            borderRadius: "16px",
          }}
        >
          <Clapperboard
            className="w-10 h-10"
            style={{ color: "rgba(26,14,0,0.5)" }}
          />
        </div>
        {/* small badge */}
        <div
          className="absolute -bottom-2 -right-2 w-7 h-7 flex items-center justify-center"
          style={{
            background: "#f3f84a",
            border: "2px solid #1a0e00",
            borderRadius: "999px",
          }}
        >
          <ImagePlus className="w-3.5 h-3.5" style={{ color: "#1a0e00" }} />
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-1 space-y-1">
        <p
          className="font-black text-sm uppercase"
          style={{
            color: "rgba(26,14,0,0.6)",
            letterSpacing: "0.08em",
            textShadow: `0 1px 0 ${bgColor}`,
          }}
        >
          Preview
        </p>
        <p
          className="font-mono text-xs"
          style={{ color: "rgba(26,14,0,0.4)" }}
        >
          เพิ่มสื่อใน data/showcase-media.ts
        </p>
      </div>

      {/* Dashed border hint */}
      <div
        className="absolute inset-4 rounded-xl pointer-events-none"
        style={{
          border: "2px dashed rgba(26,14,0,0.18)",
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main Player
// ─────────────────────────────────────────────────────────────────────────────
export function ShowcaseMediaPlayer({
  items,
  bgColor,
  fillContainer = false,
  children,
}: ShowcaseMediaPlayerProps) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const [isMediaReady, setIsMediaReady] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  // ใช้ ref เดียวเก็บ timer ทั้งหมด (image timeout + interval, video interval)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasItems = items.length > 0
  const current = items[index]
  const total = items.length

  // ── Clear all timers ────────────────────────────────────────────────────────
  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number) => {
      if (!hasItems) return
      clearAllTimers()
      setProgress(0)
      setIsMediaReady(false)
      setIndex(((next % total) + total) % total)
    },
    [clearAllTimers, total, hasItems]
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  // ── Image progress: setInterval-based, ไม่ขึ้นกับ closure ─────────────────
  const startImageProgress = useCallback(
    (duration: number) => {
      clearAllTimers()
      const startedAt = Date.now()

      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startedAt
        const p = Math.min(elapsed / duration, 1)
        setProgress(p)
        if (p >= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
        }
      }, 50)

      timeoutRef.current = setTimeout(() => {
        // ใช้ functional update เพื่อ goNext ผ่าน ref
        setIndex((prev) => {
          const next = ((prev + 1) % total + total) % total
          setProgress(0)
          setIsMediaReady(false)
          return next
        })
      }, duration)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearAllTimers, total]
  )

  // ── Video progress: poll currentTime จาก DOM element โดยตรง ────────────────
  const startVideoPolling = useCallback(() => {
    clearAllTimers()
    timerRef.current = setInterval(() => {
      const vid = videoRef.current
      if (!vid) return
      if (vid.duration > 0) {
        setProgress(vid.currentTime / vid.duration)
      }
    }, VIDEO_POLL_MS)
  }, [clearAllTimers])

  // ── Effect: เมื่อ index เปลี่ยน (รวมถึง image progress) ────────────────────
  useEffect(() => {
    clearAllTimers()
    setProgress(0)
    setIsMediaReady(false)

    if (!current) return

    if (current.type === "image") {
      startImageProgress(current.duration ?? DEFAULT_IMAGE_DURATION)
    }
    // วิดีโอ: startVideoPolling จะถูกเรียกใน onCanPlay / onPlay

    return () => clearAllTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // ── Mute sync ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted, index])

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        ...(fillContainer
          ? { width: "100%", height: "100%" }
          : { aspectRatio: "16/9", maxHeight: "38vh" }),
        background: bgColor,
        borderTopLeftRadius: "21px",
        borderTopRightRadius: "21px",
      }}
    >
      {/* ── IG Story progress bar (only when has items) ── */}
      <ProgressBar count={total} current={index} progress={progress} />

      {/* ── Media OR empty preview ── */}
      {hasItems ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Video */}
          {current?.type === "video" && (
            <video
              ref={videoRef}
              key={`vid-${index}`}
              src={current.src}
              autoPlay
              muted={muted}
              playsInline
              className="w-full h-full"
              style={{ objectFit: "contain", background: bgColor }}
              onCanPlay={() => {
                setIsMediaReady(true)
                videoRef.current?.play().catch(() => null)
                startVideoPolling()
              }}
              onPlay={() => {
                // kick polling อีกครั้งถ้า autoPlay ทำงานก่อน onCanPlay
                startVideoPolling()
              }}
              onEnded={() => {
                setProgress(1)
                goNext()
              }}
            />
          )}

          {/* Image */}
          {current?.type === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`img-${index}`}
              src={current.src}
              alt=""
              className="w-full h-full"
              style={{ objectFit: "contain", background: bgColor }}
              onLoad={() => setIsMediaReady(true)}
            />
          )}

          {/* Loading shimmer */}
          {!isMediaReady && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: `${bgColor}cc` }}
            />
          )}
        </div>
      ) : (
        /* ── Empty preview placeholder ── */
        <EmptyPreview bgColor={bgColor} />
      )}

      {/* ── Mute toggle (only when current is video) ── */}
      {hasItems && current?.type === "video" && (
        <button
          id="showcase-player-mute"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={(e) => {
            e.stopPropagation()
            setMuted((m) => !m)
          }}
          className="absolute top-[3.75rem] right-4 z-40 w-9 h-9 flex items-center justify-center transition-all hover:scale-110 duration-200"
          style={{
            background: "rgba(26,14,0,0.55)",
            border: "2px solid rgba(255,255,255,0.35)",
            borderRadius: "999px",
            color: "#fff",
            backdropFilter: "blur(6px)",
          }}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* ── Prev / Next (only when has items) ── */}
      {hasItems && (
        <>
          <button
            id="showcase-player-prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center transition-all hover:scale-110 active:scale-95 duration-200"
            style={{
              background: "rgba(26,14,0,0.6)",
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: "999px",
              color: "#fff",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            id="showcase-player-next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center transition-all hover:scale-110 active:scale-95 duration-200"
            style={{
              background: "rgba(26,14,0,0.6)",
              border: "2px solid rgba(255,255,255,0.45)",
              borderRadius: "999px",
              color: "#fff",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* ── Counter (only when has items) ── */}
      {hasItems && (
        <div
          className="absolute top-[3.75rem] left-4 z-30 font-mono font-black text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(243,248,74,0.9)",
            color: "#1a0e00",
            border: "2px solid #1a0e00",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      )}

      {/* ── Children: channel badge, category badge, close btn, title overlay ── */}
      {children}
    </div>
  )
}
