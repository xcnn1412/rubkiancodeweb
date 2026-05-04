"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight, Camera, ImageIcon } from "lucide-react"
import { CodeBg } from "@/components/effects/code-bg"
import { PHOTOBOOTH_RESULTS } from "@/data/photobooth-results-media"
import type { PhotoboothResultItem } from "@/data/photobooth-results-media"

// ─── Frame Colors ─────────────────────────────────────────────────────────────
const FRAME_COLORS = {
  frameBody:     "#cddce9",
  frameBorder:   "#555856",
  headerBg:      "#f4e6af",
  headerText:    "#1a0e00",
  captionBg:     "#f4e6af",
  captionText:   "#555856",
  captionBorder: "#1a0e00",
  activeShadow:  "#1a0e00",
} as const

const CARD_W_BASE   = 480   // layout width of each slot (px)
const SLOT_RATIO    = 1.05  // side-card center is this fraction × CARD_W from active center
const TRANSITION_MS = 500   // CSS transition duration

// ─── Circular distance (signed shortest path) ─────────────────────────────────
// Returns: 0 = active, 1 = right, -1 = left, ±2 = buffer, etc.
function circDiff(i: number, active: number, total: number): number {
  const raw = ((i - active) % total + total) % total
  return raw > total / 2 ? raw - total : raw
}

// ─────────────────────────────────────────────────────────────────────────────
//  How it works (seamless infinite loop, no reset):
//
//  Every card is position:absolute. Its `left` CSS property equals:
//    containerW/2  +  d * SLOT  -  CARD_W/2
//  where d = circDiff(i, activeIdx, total) is the signed circular distance.
//
//  When activeIdx changes by ±1:
//    - Visible cards (|d|<=1) AND the cards entering/leaving (|prevD|<=1 OR |d|<=1)
//      animate their `left` property via CSS transition → smooth slide.
//    - Cards that are invisible AND stay invisible just teleport in place.
//      (They skip past the visible area while opacity=0, user sees nothing.)
//
//  This is mathematically equivalent to a dial/wheel carousel — no copy, no reset.
// ─────────────────────────────────────────────────────────────────────────────

export function PhotoboothResultsSection() {
  const items = PHOTOBOOTH_RESULTS
  const total = items.length

  const [activeIdx, setActiveIdx] = useState(0)
  // direction: 1 = going forward/next, -1 = going back/prev
  // Used to compute prevActiveIdx for transition decisions.
  const [direction, setDirection] = useState<1 | -1>(1)
  // instant: true briefly when jumping via dots (skip transition)
  const [instant, setInstant] = useState(false)

  const videoRef    = useRef<HTMLVideoElement>(null)
  const timeoutRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(0)

  // ── Measure container width ───────────────────────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const CARD_W = containerW > 0
    ? Math.min(CARD_W_BASE, Math.floor(containerW * (containerW < 500 ? 0.78 : 0.62)))
    : CARD_W_BASE
  // SLOT: center-to-center distance between adjacent cards.
  // Using SLOT_RATIO × CARD_W gives tight layout where sides feel close but clearly smaller.
  const SLOT = Math.floor(CARD_W * SLOT_RATIO)

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIdx((p) => (p + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIdx((p) => (p - 1 + total) % total)
  }, [total])

  const goTo = useCallback((target: number) => {
    if (target === activeIdx) return
    const delta = circDiff(target, activeIdx, total)
    if (Math.abs(delta) === 1) {
      // Adjacent — animate normally
      setDirection(delta > 0 ? 1 : -1)
      setActiveIdx(target)
    } else {
      // Multiple steps — instant jump from dots
      setInstant(true)
      setDirection(delta > 0 ? 1 : -1)
      setActiveIdx(target)
      requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)))
    }
  }, [activeIdx, total])

  // ── Timer / video restart ─────────────────────────────────────────────────
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const item = items[activeIdx]
    if (!item) return

    if (item.type === "video") {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      }
    } else {
      const dur = (item as { duration?: number }).duration ?? 5000
      timeoutRef.current = setTimeout(goNext, dur)
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [activeIdx, items, goNext])

  if (total === 0) return null

  // ── Derived: where was the active card 1 step ago? ───────────────────────
  const prevActiveIdx = ((activeIdx - direction) % total + total) % total

  // Card visual height: media(3:4) + frame body padding(20px) + bezel border(6px) + knobs(20px) = ~46px overhead
  const estimatedCardH = Math.floor(CARD_W * (4 / 3)) + 46
  const containerH     = estimatedCardH + 56  // 28px top + 28px bottom padding

  return (
    <section
      id="photobooth-results"
      className="relative py-10 overflow-hidden"
      aria-label="Photobooth Results Gallery"
    >
      <div className="absolute inset-0 z-[1]" style={{ background: "#f2efdb" }} />
      <CodeBg opacity={0.3} particleCount={30} className="z-[3]" />

      <div className="relative z-[6] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Carousel ── */}
        <div className="relative">

          {/* Clip window with measured container */}
          <div
            ref={containerRef}
            style={{
              position: "relative",
              overflow: "hidden",
              height: containerH,
            }}
          >
            {items.map((item, i) => {
              const d     = circDiff(i, activeIdx, total)
              const prevD = circDiff(i, prevActiveIdx, total)

              const isActive  = d === 0
              const isLeft    = d === -1
              const isRight   = d === 1
              const isVisible = Math.abs(d) <= 1

              // Animate `left` only for cards near the visible zone.
              // Cards that are invisible AND stay invisible TELEPORT silently.
              // This prevents invisible cards from animating across the screen.
              const usePositionTransition =
                !instant && (Math.abs(d) <= 1 || Math.abs(prevD) <= 1)

              // Physical X position in the container
              const leftPos = containerW > 0
                ? containerW / 2 + d * SLOT - CARD_W / 2
                : -9999  // hide before first measurement

              // ── GPU-accelerated positioning via translateX (no layout repaint) ──
              // leftPos is used as the baseline; we shift with transform instead.
              // Center of the container is containerW/2; card center should be at leftPos + CARD_W/2.
              // So translateX offset = leftPos - (containerW/2 - CARD_W/2) = d × SLOT
              const translateX = containerW > 0 ? d * SLOT : -9999
              const scaleVal   = isActive ? 1 : isVisible ? 0.56 : 0.4

              return (
                <div
                  key={i}   /* stable key = no remount, only CSS transitions */
                  role={isVisible && !isActive ? "button" : undefined}
                  tabIndex={isVisible && !isActive ? 0 : undefined}
                  aria-label={isLeft ? "Previous" : isRight ? "Next" : undefined}
                  onClick={isLeft ? goPrev : isRight ? goNext : undefined}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (isLeft ? goPrev : isRight ? goNext : null)?.()
                  }}
                  style={{
                    position: "absolute",
                    top: 28,
                    // Center all cards at container midpoint; translateX handles offsets.
                    // Using left=50% + marginLeft=-CARD_W/2 so transform-origin is card center.
                    left: "50%",
                    marginLeft: -CARD_W / 2,
                    width: CARD_W,
                    willChange: "transform, opacity",
                    // Transition strategy:
                    //  - usePositionTransition → animate BOTH position AND visuals via transform
                    //  - instant (dot jump)    → no transition at all
                    //  - otherwise             → only animate visuals (scale/opacity/filter)
                    transition: instant
                      ? "none"
                      : usePositionTransition
                        ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.48s ease, filter 0.48s ease`
                        : "transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease",
                    opacity:   isActive ? 1 : isVisible ? 0.28 : 0,
                    transform: `translateX(${translateX}px) scale(${scaleVal})`,
                    filter:    isActive ? "none" : isVisible ? "blur(2.5px)" : "blur(5px)",
                    zIndex:    isActive ? 20 : 10,
                    cursor:    isLeft || isRight ? "pointer" : "default",
                    pointerEvents: isVisible ? "auto" : "none",
                    userSelect: "none",
                  }}
                >
                  <PhotoboothCard
                    item={item}
                    isActive={isActive}
                    videoRef={isActive ? videoRef : undefined}
                    onEnded={isActive ? goNext : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Prev button */}
          <button
            id="photobooth-results-prev"
            aria-label="Previous"
            onClick={goPrev}
            className="absolute top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 transition-all duration-150 hover:scale-110 active:scale-95"
            style={{
              left: '-4px',
              background: "#f4e6af",
              border: "3px solid #1a0e00",
              boxShadow: "3px 3px 0px #1a0e00",
              borderRadius: "999px",
            }}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a0e00]" />
          </button>

          {/* Next button */}
          <button
            id="photobooth-results-next"
            aria-label="Next"
            onClick={goNext}
            className="absolute top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 transition-all duration-150 hover:scale-110 active:scale-95"
            style={{
              right: '-4px',
              background: "#f4e6af",
              border: "3px solid #1a0e00",
              boxShadow: "3px 3px 0px #1a0e00",
              borderRadius: "999px",
            }}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a0e00]" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              id={`photobooth-results-dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: i === activeIdx ? "28px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: i === activeIdx ? "#8a99b1" : "#7e7f7f",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  PhotoboothCard (pure presentation, width inherited from parent)
//  Wrapped in React.memo — re-renders only when its own props change.
// ─────────────────────────────────────────────────────────────────────────────
const PhotoboothCard = memo(function PhotoboothCard({
  item,
  isActive,
  videoRef,
  onEnded,
}: {
  item: PhotoboothResultItem
  isActive: boolean
  videoRef?: React.RefObject<HTMLVideoElement | null>
  onEnded?: () => void
}) {
  return (
    <div style={{ width: "100%" }}>
      {/* Frame body */}
      <div
        style={{
          background: `linear-gradient(145deg, ${FRAME_COLORS.frameBody} 0%, #c8c9c5 100%)`,
          border: `4px solid ${FRAME_COLORS.frameBorder}`,
          boxShadow: isActive
            ? `3px 3px 0px ${FRAME_COLORS.activeShadow}, 0 15px 40px rgba(0,0,0,0.5)`
            : "none",
          borderRadius: "10px",
          padding: "10px",
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Screen bezel */}
        <div
          style={{
            background: "#0d0d0d",
            border: `3px solid ${FRAME_COLORS.frameBorder}`,
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "inset 0 0 16px rgba(0,0,0,0.5)",
          }}
        >


          {/* Media area — 3:4 portrait */}
          <div style={{ position: "relative", aspectRatio: "3/4", background: "#111", overflow: "hidden" }}>


            {item.type === "video" && item.src ? (
              <video
                ref={videoRef}
                src={item.src}
                muted
                playsInline
                autoPlay={isActive}
                preload={isActive ? "metadata" : "none"}
                onEnded={onEnded}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : item.type === "image" && item.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.label ?? "photobooth result"}
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "10px",
                  background: "linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%)",
                }}
              >
                {item.type === "video" ? (
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "rgba(244,230,175,0.15)", border: "2px solid rgba(244,230,175,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid rgba(244,230,175,0.7)", marginLeft: 4 }} />
                  </div>
                ) : (
                  <ImageIcon style={{ width: 32, height: 32, color: "rgba(244,230,175,0.3)" }} />
                )}
                {item.label && (
                  <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(244,230,175,0.5)", textAlign: "center", padding: "0 8px" }}>
                    {item.label}
                  </span>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Base knobs */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", padding: "0 6px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#555856", opacity: 1 }} />
            ))}
          </div>
          <div style={{ width: 20, height: 8, borderRadius: "3px", background: "#555856", opacity: 1 }} />
        </div>
      </div>
    </div>
  )
})
