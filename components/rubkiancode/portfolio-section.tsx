"use client"

// PORTFOLIO SECTION — slideshow video สไตล์ 8-bit arcade
//
// ลูกเล่น:
//   • Auto-play เปลี่ยน slide ทุก 8 วินาที (pause เมื่อ hover)
//   • Prev/Next ด้วยปุ่มหรือลูกศรคีย์บอร์ด
//   • Pagination ดอกจัน + เลข counter "01/06" arcade
//   • Decorations: ★ ♥ ◆ ลอย/กระพริบรอบกรอบ
//   • Video เล่นวนต่อเนื่อง · muted · playsInline (เปิดบนมือถือได้)

import { useEffect, useRef, useState } from "react"
import { SectionHead } from "./key-services-section"

type Project = {
  id: string
  src: string
  tag: string
  title: string
  caption: string
  accent: string
}

const PROJECTS: Project[] = [
  {
    id: "luckydraw1",
    src: "/videos/project3/Luckydraw1.mp4",
    tag: "★ LUCKY DRAW",
    title: "ระบบสุ่มรางวัล Live Lucky Draw",
    caption: "Realtime · บนเวทีอีเวนต์",
    accent: "#F1C40F",
  },
  {
    id: "luckydrawpreview",
    src: "/videos/project3/luckydrawpreview.mp4",
    tag: "★ LUCKY DRAW",
    title: "Lucky Draw — Preview UI",
    caption: "พรีวิวการใช้งานระบบจับรางวัล",
    accent: "#E63946",
  },
  {
    id: "moshipayment",
    src: "/videos/project1/moshipayment.mp4",
    tag: "★ POS PAYMENT",
    title: "Moshi POS — ระบบชำระเงิน",
    caption: "Flow การจ่ายเงินครบวงจร",
    accent: "#3498DB",
  },
  {
    id: "moshi1",
    src: "/videos/project1/moshi1.mp4",
    tag: "★ POS PAYMENT",
    title: "Moshi — Demo การใช้งาน",
    caption: "ตัวอย่างหน้าจอระบบ POS",
    accent: "#2ECC71",
  },
  {
    id: "preview1",
    src: "/videos/project0/preview1.mp4",
    tag: "★ CUSTOM SYSTEM",
    title: "Custom Project — Live Preview",
    caption: "พรีวิวระบบที่พัฒนาตามโจทย์",
    accent: "#9B59B6",
  },
  {
    id: "liveview1",
    src: "/videos/project0/liveview1.mp4",
    tag: "★ LIVE VIEW",
    title: "Live View — Realtime Display",
    caption: "หน้าจอ realtime · live monitoring",
    accent: "#1ABC9C",
  },
  {
    id: "reelsign2",
    src: "/videos/project0/reelsign2.mp4",
    tag: "★ MOTION GRAPHIC",
    title: "Reels & Signature — Motion",
    caption: "งาน motion graphic / branding",
    accent: "#E67E22",
  },
]

const AUTOPLAY_MS = 8000

export function PortfolioSection() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const slide = PROJECTS[current]
  const total = PROJECTS.length

  // Auto-play
  useEffect(() => {
    if (!playing || total <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, total])

  // Keyboard navigation (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + total) % total)
      else if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % total)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [total])

  const next = () => setCurrent((c) => (c + 1) % total)
  const prev = () => setCurrent((c) => (c - 1 + total) % total)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#F4EDE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="PORTFOLIO · LV.UP"
          heading="ผลงานที่ส่งมอบจริง"
          description="ทุกชิ้นเป็นโปรเจกต์ที่พัฒนาส่งมอบลูกค้าจริง — Lucky Draw แบบ realtime, ระบบ POS Payment, Custom System ตามโจทย์เฉพาะ — เปิดให้ขอ reference ลูกค้าได้"
        />

        <Slideshow
          slide={slide}
          current={current}
          total={total}
          playing={playing}
          onPrev={prev}
          onNext={next}
          onTogglePlay={() => setPlaying((p) => !p)}
          onJump={setCurrent}
          onPause={() => setPlaying(false)}
          onResume={() => setPlaying(true)}
        />
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SLIDESHOW — frame + video + controls
   ════════════════════════════════════════════════════════════════════ */
function Slideshow({
  slide,
  current,
  total,
  playing,
  onPrev,
  onNext,
  onTogglePlay,
  onJump,
  onPause,
  onResume,
}: {
  slide: Project
  current: number
  total: number
  playing: boolean
  onPrev: () => void
  onNext: () => void
  onTogglePlay: () => void
  onJump: (i: number) => void
  onPause: () => void
  onResume: () => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Reset video to start on slide change
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {
      // autoplay blocked — ignore (user gesture จะ trigger ภายหลัง)
    })
  }, [slide.id])

  return (
    <div
      className="relative mx-auto mt-12 max-w-4xl"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      {/* ░░░ Floating decorations ░░░ */}
      <span
        aria-hidden="true"
        className="font-pixel rk-twinkle absolute -left-3 -top-6 text-2xl text-[#F1C40F] sm:-left-8"
        style={{ animationDelay: "0s" }}
      >
        ★
      </span>
      <span
        aria-hidden="true"
        className="font-pixel rk-float absolute -right-2 -top-8 text-2xl text-[#E63946] sm:-right-6"
        style={{ animationDelay: "0.3s" }}
      >
        ♥
      </span>
      <span
        aria-hidden="true"
        className="font-pixel rk-twinkle absolute -bottom-2 right-1/4 text-xl text-[#3498DB]"
        style={{ animationDelay: "0.6s" }}
      >
        ◆
      </span>
      <span
        aria-hidden="true"
        className="font-pixel rk-float absolute -bottom-4 left-1/4 text-xl text-[#2ECC71]"
        style={{ animationDelay: "0.9s" }}
      >
        ★
      </span>

      {/* Title bar — arcade screen style */}
      <div
        className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2 sm:px-4"
        style={{ border: "3px solid #0A2540" }}
      >
        <span className="flex gap-1.5">
          <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
          <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
          <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
        </span>
        <span className="font-pixel hidden text-[10px] uppercase text-[#F1C40F] sm:inline">
          NOW SHOWING · PORTFOLIO.MP4
        </span>
        <span className="font-pixel text-[10px] uppercase text-[#F1C40F] sm:hidden">
          SHOWING
        </span>
        <span className="font-pixel text-[10px] uppercase text-[#F1C40F]">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Slide frame — video container */}
      <div
        className="relative aspect-video overflow-hidden border-x-[3px] border-[#0A2540] bg-[#0A2540]"
        style={{ boxShadow: "inset 0 0 0 6px rgba(255,255,255,0.04)" }}
      >
        {/* corner pixels */}
        <CornerPixels />

        {/* Scanline overlay — เพิ่ม CRT feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.4) 3px,rgba(0,0,0,0.4) 4px)",
          }}
        />

        {/* Video — preload metadata only, ลด initial bytes */}
        <video
          key={slide.id}
          ref={videoRef}
          src={slide.src}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-label={slide.title}
          className="rk-slide-in absolute inset-0 block h-full w-full object-contain"
        />

        {/* LIVE indicator */}
        <span
          className="font-pixel absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 bg-[#0A2540]/85 px-2 py-1 text-[9px] uppercase text-white backdrop-blur-sm"
          style={{ border: "1px solid #E63946" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E63946] opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E63946]" />
          </span>
          REC
        </span>

        {/* Tag chip — มุมซ้ายบน */}
        <span
          className="font-pixel absolute left-4 top-4 z-20 bg-[#0A2540] px-2 py-1.5 text-[10px] uppercase text-[#F1C40F]"
          style={{ boxShadow: "3px 3px 0 " + slide.accent }}
        >
          {slide.tag}
        </span>

        {/* Side nav arrows */}
        <NavButton direction="prev" onClick={onPrev} />
        <NavButton direction="next" onClick={onNext} />
      </div>

      {/* Caption bar */}
      <div
        className="flex flex-col gap-1 border-x-[3px] border-b-[3px] border-[#0A2540] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
        style={{ boxShadow: "8px 8px 0 " + slide.accent }}
      >
        <h3 className="text-base font-black text-[#0A2540] sm:text-lg">{slide.title}</h3>
        <span className="font-pixel text-[10px] uppercase tracking-wider text-[#0A2540]/60 sm:text-xs">
          {slide.caption}
        </span>
      </div>

      {/* Bottom controls */}
      <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        {/* Pagination */}
        <div className="flex items-center gap-2" role="tablist" aria-label="เลือกผลงาน">
          {Array.from({ length: total }).map((_, i) => {
            const isActive = i === current
            return (
              <button
                key={i}
                type="button"
                onClick={() => onJump(i)}
                aria-label={`ไปยังผลงาน ${i + 1}`}
                aria-selected={isActive}
                role="tab"
                className={`font-pixel inline-flex h-7 w-7 items-center justify-center text-base transition-transform hover:-translate-y-0.5 ${
                  isActive ? "rk-bounce text-[#F1C40F]" : "text-[#0A2540]/40 hover:text-[#0A2540]"
                }`}
                style={{
                  background: isActive ? "#0A2540" : "white",
                  border: "2px solid #0A2540",
                  boxShadow: isActive ? "3px 3px 0 #E63946" : "2px 2px 0 #0A2540",
                }}
              >
                {isActive ? "★" : "·"}
              </button>
            )
          })}
        </div>

        {/* Play/Pause */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "หยุดเลื่อนอัตโนมัติ" : "เริ่มเลื่อนอัตโนมัติ"}
          className="font-pixel inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5"
          style={{
            background: playing ? "#2ECC71" : "#F1C40F",
            color: "#0A2540",
            border: "2px solid #0A2540",
            boxShadow: "3px 3px 0 #0A2540",
          }}
        >
          {playing ? "⏸ PAUSE" : "▶ PLAY"}
        </button>
      </div>

      {/* Hint คีย์บอร์ด */}
      <p className="mt-4 hidden text-center text-xs text-[#0A2540]/50 lg:block">
        <span className="font-pixel">TIP</span> · ใช้คีย์บอร์ด ← → เพื่อเปลี่ยน slide
      </p>
    </div>
  )
}

/* Pixel corner ตกแต่ง 4 มุมของ slide frame */
function CornerPixels() {
  const cls = "absolute z-20 h-3 w-3 bg-[#F1C40F]"
  return (
    <>
      <span className={`${cls} left-0 top-0`} aria-hidden="true" />
      <span className={`${cls} right-0 top-0`} aria-hidden="true" />
      <span className={`${cls} bottom-0 left-0`} aria-hidden="true" />
      <span className={`${cls} bottom-0 right-0`} aria-hidden="true" />
    </>
  )
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: () => void
}) {
  const isPrev = direction === "prev"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "ผลงานก่อนหน้า" : "ผลงานถัดไป"}
      className={`font-pixel absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white text-lg text-[#0A2540] transition-all hover:scale-110 hover:bg-[#F1C40F] ${
        isPrev ? "left-3" : "right-3"
      }`}
      style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
    >
      {isPrev ? "◀" : "▶"}
    </button>
  )
}
