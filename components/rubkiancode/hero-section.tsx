"use client"

import { ArrowIcon } from "./icons"

const STATS = [
  { value: "120", suffix: "+", label: "PROJECTS" },
  { value: "8",   suffix: "YR", label: "EXP" },
  { value: "99",  suffix: "%",  label: "UPTIME" },
  { value: "24/7",suffix: "",   label: "SUPPORT" },
] as const

const PILLS = [
  { label: "Marketing System", color: "#E63946" },
  { label: "Office ERP",       color: "#3498DB" },
  { label: "Lucky Draw",       color: "#F1C40F" },
] as const

// Fixed positions — matches Image 1 layout (no Math.random → no SSR mismatch)
const BLOBS = [
  { left: "-5%",  top: "-4%",  size: 160, delay: "0s",    anim: "rk-float"   }, // top-left large
  { left: "7%",   top: "14%",  size:  58, delay: "0.6s",  anim: "rk-twinkle" }, // inner-left small
  { left: "-2%",  top: "43%",  size: 102, delay: "1s",    anim: "rk-float"   }, // left mid
  { left: "-1%",  top: "70%",  size:  80, delay: "0.4s",  anim: "rk-float"   }, // left bottom
  { left: "87%",  top: "-2%",  size: 108, delay: "1.5s",  anim: "rk-float"   }, // top-right
  { left: "92%",  top: "18%",  size:  66, delay: "0.9s",  anim: "rk-twinkle" }, // right upper-small
  { left: "86%",  top: "50%",  size: 148, delay: "2s",    anim: "rk-float"   }, // right large
  { left: "75%",  top: "76%",  size:  54, delay: "1.3s",  anim: "rk-twinkle" }, // right bottom-small
] as const

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#F4EDE0] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Sakura blob background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BLOBS.map((b, i) => (
          <div key={i} className="absolute" style={{ left: b.left, top: b.top }}>
            <div className={b.anim} style={{ animationDelay: b.delay }}>
              <SakuraBlob size={b.size} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content — single centered column ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* TEXT block — centered */}
        <div className="flex flex-col items-center text-center">
          <span
            className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
            style={{ boxShadow: "4px 4px 0 #E63946" }}
          >
            ★ SOFTWARE HOUSE · LV.99
          </span>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] text-[#0A2540] sm:text-5xl lg:text-6xl">
            เขียนโปรแกรมทุกระบบ
            <br />
            เพื่อ<em className="not-italic text-[#E63946]">ผู้ประกอบการ</em>ไทย
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">
            RubKianCode คือพาร์ทเนอร์ด้านซอฟต์แวร์ที่พึ่งพาได้ — รับผลิต จำหน่าย
            และให้คำปรึกษา เน้นระบบการตลาดที่วัดผลได้ ระบบภายในออฟฟิศที่ใช้งานจริง
            และระบบ Lucky Draw สำหรับงานอีเวนต์ ส่งมอบเสร็จ ใช้งานได้ทันที
            <span className="rk-caret" />
          </p>

          {/* Service pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {PILLS.map((p) => (
              <span
                key={p.label}
                className="font-pixel px-3 py-2 text-[10px] uppercase tracking-wider text-white"
                style={{
                  background: p.color,
                  border: "2px solid #0A2540",
                  boxShadow: "3px 3px 0 #0A2540",
                }}
              >
                {p.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              เริ่มโปรเจกต์
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              ดูผลงาน
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white p-3 text-center"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
              >
                <div className="font-pixel text-lg text-[#E63946] sm:text-xl">
                  {s.value}
                  {s.suffix && <small className="text-sm">{s.suffix}</small>}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#0A2540]/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PC block — centered below text */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <div
              className="bg-[#F4EDE0] p-5"
              style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #E63946" }}
            >
              <ComputerScene />
            </div>

            <span
              className="font-pixel absolute -left-3 -top-3 bg-[#F1C40F] px-3 py-2 text-[10px] uppercase text-[#0A2540]"
              style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
            >
              ★ 8-BIT STUDIO
            </span>
            <span
              className="font-pixel absolute -bottom-3 -right-3 bg-[#2ECC71] px-3 py-2 text-[10px] uppercase text-white"
              style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
            >
              ⚡ ON-TIME 100%
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   SAKURA BLOB — pixel-art circle in hot pink
   Matches the round "sakura" placeholders in Image 1
   ══════════════════════════════════════════════════════ */
function SakuraBlob({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="pixel-svg"
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pixel-art circle rows */}
      <rect x="11" y="0"  width="10" height="2"  fill="#FF2D78" />
      <rect x="7"  y="2"  width="18" height="2"  fill="#FF2D78" />
      <rect x="5"  y="4"  width="22" height="2"  fill="#FF4B8C" />
      <rect x="3"  y="6"  width="26" height="2"  fill="#FF2D78" />
      <rect x="1"  y="8"  width="30" height="16" fill="#FF2D78" />
      <rect x="3"  y="24" width="26" height="2"  fill="#FF4B8C" />
      <rect x="5"  y="26" width="22" height="2"  fill="#FF2D78" />
      <rect x="7"  y="28" width="18" height="2"  fill="#FF2D78" />
      <rect x="11" y="30" width="10" height="2"  fill="#FF2D78" />
      {/* Highlight — top-left glare gives 8-bit depth */}
      <rect x="7"  y="4"  width="8"  height="6"  fill="#FF80AB" opacity="0.45" />
      <rect x="5"  y="8"  width="4"  height="4"  fill="#FF80AB" opacity="0.3"  />
      {/* Petal cross hint at center */}
      <rect x="14" y="8"  width="4"  height="16" fill="#E6005C" opacity="0.15" />
      <rect x="8"  y="14" width="16" height="4"  fill="#E6005C" opacity="0.15" />
      {/* Center dot (stamen) */}
      <rect x="14" y="14" width="4"  height="4"  fill="#FFD6E0" opacity="0.6"  />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════
   COMPUTER SCENE — CRT monitor + keyboard + mouse
   ══════════════════════════════════════════════════════ */
function ComputerScene() {
  return (
    <div className="flex flex-col items-center gap-0">

      {/* CRT Monitor */}
      <div className="w-full">
        {/* Outer case */}
        <div
          className="relative bg-[#C8BFB0] px-4 pt-3 pb-5"
          style={{
            border: "3px solid #0A2540",
            boxShadow: "inset -3px -3px 0 #9E9080, inset 3px 3px 0 #E8DFD0",
          }}
        >
          {/* Screen bezel */}
          <div className="bg-[#1A252F] p-1.5" style={{ border: "2px solid #0A2540" }}>
            {/* Title bar */}
            <div className="mb-1 flex items-center justify-between bg-[#0A2540] px-2 py-1">
              <span className="flex gap-1">
                <span className="block h-2 w-2 bg-[#E63946]" style={{ border: "1px solid #000" }} />
                <span className="block h-2 w-2 bg-[#F1C40F]" style={{ border: "1px solid #000" }} />
                <span className="block h-2 w-2 bg-[#2ECC71]" style={{ border: "1px solid #000" }} />
              </span>
              <span className="font-pixel text-[7px] uppercase text-[#F4EDE0]/70">
                RUBKIAN_CODE.EXE
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
              </span>
            </div>

            {/* Screen */}
            <div className="relative overflow-hidden bg-[#F0F0E6]" style={{ minHeight: "148px" }}>
              {/* CRT scanlines */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)",
                }}
              />
              {/* Glare */}
              <div className="absolute left-2 top-2 h-10 w-14 bg-white/30" />
              <div className="absolute left-2 top-2 h-20 w-2  bg-white/20" />

              {/* Terminal content */}
              <div className="relative z-0 p-3 font-mono text-[10px] leading-snug text-[#0A2540]">
                <div className="flex gap-1">
                  <span className="text-[#E63946]">$</span>
                  <span>npm run build</span>
                </div>
                <CodeBar width="72%" color="#3498DB" icon="✓" />
                <CodeBar width="58%" color="#E63946" icon="✓" />
                <CodeBar width="84%" color="#2ECC71" icon="✓" />
                <CodeBar width="50%" color="#F1C40F" icon="→" />
                <CodeBar width="76%" color="#3498DB" icon="✓" />
                <CodeBar width="62%" color="#E63946" icon="✓" />
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-[#2ECC71]">★</span>
                  <span className="text-[9px]">Ready on :3000</span>
                  <span className="rk-caret ml-0.5" style={{ background: "#0A2540" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Front bezel controls */}
          <div className="mt-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" style={{ border: "1px solid #0A2540" }} />
              </span>
              <div className="h-1.5 w-10 bg-[#0A2540]" style={{ border: "1px solid #6B5E4E" }} />
            </div>
            <span className="font-pixel text-[7px] uppercase text-[#6B5E4E]">RUBKIAN·CRT</span>
            <div className="flex gap-1">
              {(["#3498DB", "#F1C40F", "#E63946"] as const).map((c) => (
                <div key={c} className="h-3 w-1.5 bg-[#0A2540]" style={{ border: `1px solid ${c}` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Neck */}
        <div
          className="mx-auto h-5 w-12 bg-[#B0A898]"
          style={{ border: "2px solid #0A2540", borderTop: "none" }}
        />
        {/* Base */}
        <div
          className="mx-auto h-3 w-40 bg-[#C8BFB0]"
          style={{ border: "2px solid #0A2540", borderTop: "none" }}
        />
        <div
          className="mx-auto h-2 w-48 bg-[#9E9080]"
          style={{ border: "2px solid #0A2540", borderTop: "none" }}
        />
      </div>

      {/* Keyboard + Mouse row */}
      <div className="mt-4 flex w-full items-end gap-3">
        <div className="flex-1">
          <PixelKeyboard />
        </div>
        <PixelMouse />
      </div>
    </div>
  )
}

function CodeBar({ width, color, icon }: { width: string; color: string; icon: string }) {
  return (
    <div className="mt-1 flex items-center gap-1.5">
      <span style={{ color }}>{icon}</span>
      <div className="h-2 rounded-sm" style={{ width, background: color, opacity: 0.65 }} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   GAMING KEYBOARD
   ══════════════════════════════════════════════════════ */
const ROW1 = ["#E63946","#F1C40F","#2ECC71","#3498DB","#9B59B6","#E67E22","#E63946","#F1C40F","#2ECC71","#3498DB","#9B59B6","#E67E22"] as const
const ROW2 = ["#9B59B6","#E63946","#F1C40F","#2ECC71","#3498DB","#9B59B6","#E67E22","#E63946","#F1C40F","#2ECC71","#3498DB"] as const
const ROW3 = ["#3498DB","#9B59B6","#E63946","#F1C40F","#2ECC71","#3498DB","#9B59B6","#E67E22","#E63946","#F1C40F"] as const
const ROW4 = ["#F1C40F","#3498DB","#E63946","#9B59B6","#2ECC71","#E67E22","#F1C40F","#3498DB","#E63946"] as const

function KeyRow({ colors, ml = 0 }: { colors: readonly string[]; ml?: number }) {
  return (
    <div className="mb-0.5 flex gap-0.5" style={{ marginLeft: ml }}>
      {colors.map((c, i) => (
        <div
          key={i}
          className="h-3 flex-1"
          style={{ background: c, border: "1px solid rgba(0,0,0,0.5)", boxShadow: `0 2px 0 ${c}88` }}
        />
      ))}
    </div>
  )
}

function PixelKeyboard() {
  return (
    <div
      className="w-full bg-[#0F0F1A] px-2 pt-2 pb-1.5"
      style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
    >
      <div
        className="mb-1.5 h-1 w-full"
        style={{ background: "linear-gradient(to right,#E63946,#F1C40F,#2ECC71,#3498DB,#9B59B6)" }}
      />
      <KeyRow colors={ROW1} />
      <KeyRow colors={ROW2} ml={4} />
      <KeyRow colors={ROW3} ml={8} />
      <KeyRow colors={ROW4} ml={12} />
      <div className="mt-0.5 flex gap-0.5">
        <div className="h-3 w-3" style={{ background: "#E63946", border: "1px solid rgba(0,0,0,0.5)" }} />
        <div className="h-3 flex-1" style={{ background: "#3498DB", border: "1px solid rgba(0,0,0,0.5)", boxShadow: "0 2px 0 #3498DB88" }} />
        <div className="h-3 w-3" style={{ background: "#2ECC71", border: "1px solid rgba(0,0,0,0.5)" }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   GAMING MOUSE
   ══════════════════════════════════════════════════════ */
function PixelMouse() {
  return (
    <div className="relative shrink-0">
      {/* Cable */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2"
        style={{ width: 3, height: 26, background: "#3498DB", border: "1px solid #0A2540", borderRadius: "2px 2px 0 0" }}
      />
      {/* Body */}
      <div
        className="relative bg-[#0F0F1A]"
        style={{ width: 48, height: 70, border: "2px solid #0A2540", borderRadius: "4px 4px 10px 10px", boxShadow: "3px 3px 0 #0A2540" }}
      >
        <div className="absolute left-0 top-0" style={{ width: "46%", height: 28, background: "#1A1A2E", border: "1px solid #0A2540", borderRadius: "3px 0 0 0" }} />
        <div className="absolute right-0 top-0" style={{ width: "46%", height: 28, background: "#222244", border: "1px solid #0A2540", borderRadius: "0 3px 0 0" }} />
        <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: 2, height: 28, background: "#0A2540" }} />
        <div className="absolute left-1/2 top-2 -translate-x-1/2" style={{ width: 10, height: 16, background: "#F1C40F", border: "1px solid #0A2540", borderRadius: 2 }} />
        <div className="absolute left-1/2 top-7.5 -translate-x-1/2" style={{ width: 8, height: 5, background: "#E63946", border: "1px solid #0A2540", borderRadius: 1 }} />
        <div className="absolute bottom-4 left-0"   style={{ width: 3, height: 22, background: "#E63946" }} />
        <div className="absolute bottom-4 right-0"  style={{ width: 3, height: 22, background: "#3498DB" }} />
        <div className="absolute bottom-2 left-1 right-1" style={{ height: 3, background: "#2ECC71", borderRadius: 1 }} />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ width: 6, height: 6, background: "#F1C40F", border: "1px solid #0A2540" }} />
      </div>
    </div>
  )
}
