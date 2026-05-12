"use client"

// ════════════════════════════════════════════════════════════════════════
// IMAGE SLIDESHOW — auto-rotate slideshow สำหรับ section deep-dive
//
// ลูกเล่น:
//   • Auto-play เปลี่ยนรูปทุก 5.5 วินาที · pause เมื่อ hover
//   • Crossfade transition (opacity) ระหว่างรูป — ไม่กระตุก
//   • Pagination dots ★/· คลิกข้ามได้
//   • Arrow nav (◀ ▶) ปรากฏบน desktop
//   • Window chrome arcade style — traffic lights + LIVE ping + filename
//   • Caption bar เปลี่ยนตาม current slide
//
// ใช้กับ:
//   - ภาพ deep-dive ของ service ที่อยากโชว์หลายรูปใน 1 frame
//   - ไม่ใช้ grid (ภาพล้นหน้า) แต่ใช้ slideshow บีบเหลือ 1 frame
// ════════════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Screenshot } from "@/app/services/_data/services"

const AUTOPLAY_MS = 5500
const ZOOM_SCALE = 2.2  // ระดับ zoom เมื่อ hover (2.2x — มากพอให้อ่าน text label ได้)

type Props = {
  screenshots: Screenshot[]
  accent: string            // hex — สี theme ของ service สำหรับ border + shadow
  subtitle: string          // โชว์ใน window chrome filename
}

export function ImageSlideshow({ screenshots, accent, subtitle }: Props) {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [zoomed, setZoomed] = useState(false)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const total = screenshots.length

  // Auto-play loop
  useEffect(() => {
    if (!playing || total <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, total])

  if (total === 0) return null

  const slide = screenshots[current]
  const goNext = () => setCurrent((c) => (c + 1) % total)
  const goPrev = () => setCurrent((c) => (c - 1 + total) % total)

  // ── Zoom-on-hover handlers ──
  // hover: hover media query → ปิด zoom บน touch device
  const handleMouseEnter = () => {
    setPlaying(false)
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setZoomed(true)
    }
  }
  const handleMouseLeave = () => {
    setPlaying(true)
    setZoomed(false)
  }
  // Track mouse % position → set CSS vars บน frame · transform-origin อ่านจาก var
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    frameRef.current.style.setProperty("--zoom-x", `${x}%`)
    frameRef.current.style.setProperty("--zoom-y", `${y}%`)
  }

  return (
    <div className="relative w-full">
      {/* ── Window chrome — arcade title bar ── */}
      <div
        className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2 sm:px-4"
        style={{ border: "3px solid #0A2540" }}
      >
        <span className="flex gap-1.5">
          <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
          <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
          <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
        </span>
        <span className="font-pixel hidden truncate text-[9px] uppercase text-[#F1C40F] sm:inline">
          SLIDE · {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {subtitle.toUpperCase()}
        </span>
        <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
          </span>
          LIVE
        </span>
      </div>

      {/* ── Slide frame — รับ zoom hover events ── */}
      <div
        ref={frameRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`relative aspect-4/3 overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] bg-[#0F1419] ${
          zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        style={
          {
            boxShadow: "8px 8px 0 " + accent,
            "--zoom-x": "50%",
            "--zoom-y": "50%",
          } as React.CSSProperties
        }
        role="region"
        aria-roledescription="Image slideshow"
        aria-label={`สไลด์ ${current + 1} จาก ${total}: ${slide.caption}`}
      >
        {/* Stack ทุกรูปไว้ — fade ด้วย opacity + zoom transform-origin = mouse position */}
        {screenshots.map((shot, i) => {
          const isActive = i === current
          return (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 700px"
              quality={92}
              className={`object-contain transition-[opacity,transform] duration-700 ease-out will-change-transform ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transformOrigin: "var(--zoom-x) var(--zoom-y)",
                transform: zoomed && isActive ? `scale(${ZOOM_SCALE})` : "scale(1)",
              }}
              priority={i === 0}
            />
          )
        })}

        {/* Pixel corner accents */}
        <span aria-hidden className="absolute left-0 top-0 z-20 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute right-0 top-0 z-20 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute bottom-0 left-0 z-20 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute bottom-0 right-0 z-20 h-3 w-3 bg-[#F1C40F]" />

        {/* Zoom badge — แสดงเฉพาะตอน zoomed (ให้รู้ว่ากำลัง zoom อยู่) */}
        {zoomed && (
          <span
            aria-hidden
            className="font-pixel pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2 bg-[#0A2540]/90 px-2 py-1 text-[9px] uppercase text-[#F1C40F] backdrop-blur-sm"
            style={{ border: "1px solid #F1C40F" }}
          >
            ★ ZOOMED · {ZOOM_SCALE}×
          </span>
        )}

        {/* Side nav arrows — visible เฉพาะ desktop เพื่อไม่บัง content บนมือถือ */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="สไลด์ก่อนหน้า"
              className="font-pixel absolute left-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center bg-white text-base text-[#0A2540] transition-transform hover:scale-110 hover:bg-[#F1C40F] sm:inline-flex"
              style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
            >
              ◀
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="สไลด์ถัดไป"
              className="font-pixel absolute right-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center bg-white text-base text-[#0A2540] transition-transform hover:scale-110 hover:bg-[#F1C40F] sm:inline-flex"
              style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* ── Caption bar — content ตาม current slide ── */}
      <div
        className="mt-0 flex items-center justify-between gap-3 border-x-[3px] border-b-[3px] border-[#0A2540] bg-white p-4 sm:p-5"
        style={{ boxShadow: "8px 8px 0 " + accent }}
      >
        <span
          className="font-pixel bg-[#0A2540] px-2 py-1.5 text-[10px] uppercase text-[#F1C40F]"
          style={{ boxShadow: "2px 2px 0 " + accent }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-bold text-[#0A2540] sm:text-base">
          {slide.caption}
        </span>
      </div>

      {/* ── Pagination dots ── */}
      {total > 1 && (
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="เลือกสไลด์"
        >
          {screenshots.map((shot, i) => {
            const isActive = i === current
            return (
              <button
                key={shot.src}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`ไปยังสไลด์ ${i + 1}: ${shot.caption}`}
                aria-selected={isActive}
                role="tab"
                className={`font-pixel inline-flex h-7 w-7 items-center justify-center text-base transition-transform hover:-translate-y-0.5 ${
                  isActive ? "text-[#F1C40F]" : "text-[#0A2540]/40 hover:text-[#0A2540]"
                }`}
                style={{
                  background: isActive ? "#0A2540" : "white",
                  border: "2px solid #0A2540",
                  boxShadow: isActive ? "3px 3px 0 " + accent : "2px 2px 0 #0A2540",
                }}
              >
                {isActive ? "★" : "·"}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
