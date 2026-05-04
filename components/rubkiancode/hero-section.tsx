"use client"

import { useEffect, useMemo, useState } from "react"
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

// กลีบดอกร่วง — กระจายเต็มจอ ใช้ 3 animation patterns สลับกันให้ดูเป็นธรรมชาติ
const FALLING_PETALS = [
  { left: "8%",  delay: "0s",   dur: "6.5s", size: 10, color: "#FFB7C5", anim: "rk-petal-fall-a" },
  { left: "14%", delay: "2.4s", dur: "7.8s", size: 7,  color: "#FF8FA3", anim: "rk-petal-fall-b" },
  { left: "20%", delay: "0.9s", dur: "6.2s", size: 12, color: "#FFD6E0", anim: "rk-petal-fall-c" },
  { left: "26%", delay: "3.6s", dur: "7.0s", size: 8,  color: "#FFB7C5", anim: "rk-petal-fall-a" },
  { left: "32%", delay: "1.1s", dur: "6.8s", size: 10, color: "#FF8FA3", anim: "rk-petal-fall-b" },
  { left: "38%", delay: "4.2s", dur: "7.5s", size: 6,  color: "#FFD6E0", anim: "rk-petal-fall-c" },
  { left: "44%", delay: "0.3s", dur: "8.0s", size: 9,  color: "#FFB7C5", anim: "rk-petal-fall-a" },
  { left: "50%", delay: "2.7s", dur: "6.4s", size: 11, color: "#FF8FA3", anim: "rk-petal-fall-b" },
  { left: "56%", delay: "1.8s", dur: "7.2s", size: 7,  color: "#FFD6E0", anim: "rk-petal-fall-c" },
  { left: "62%", delay: "3.1s", dur: "6.6s", size: 10, color: "#FFB7C5", anim: "rk-petal-fall-a" },
  { left: "68%", delay: "0.6s", dur: "7.8s", size: 8,  color: "#FF8FA3", anim: "rk-petal-fall-b" },
  { left: "74%", delay: "4.5s", dur: "6.0s", size: 12, color: "#FFD6E0", anim: "rk-petal-fall-c" },
  { left: "80%", delay: "1.4s", dur: "7.4s", size: 6,  color: "#FFB7C5", anim: "rk-petal-fall-c" },
  { left: "86%", delay: "2.0s", dur: "6.8s", size: 8,  color: "#FF8FA3", anim: "rk-petal-fall-a" },
  { left: "92%", delay: "5.8s", dur: "8.2s", size: 9,  color: "#FFD6E0", anim: "rk-petal-fall-b" },
  { left: "35%", delay: "5.2s", dur: "7.0s", size: 11, color: "#FFB7C5", anim: "rk-petal-fall-c" },
  { left: "65%", delay: "4.9s", dur: "6.4s", size: 7,  color: "#FF8FA3", anim: "rk-petal-fall-a" },
  { left: "11%", delay: "6.3s", dur: "7.6s", size: 9,  color: "#FFD6E0", anim: "rk-petal-fall-b" },
] as const

// Code snippets ร่วงพร้อมกลีบดอก — สั้น ๆ จาก 3 ภาษา (C# / JS / Python)
const CSHARP   = "#9B59B6"  // ม่วง
const JSCRIPT  = "#E67E22"  // ส้ม
const PYTHON   = "#3498DB"  // ฟ้า

const FALLING_CODE = [
  // ── LEFT edge (0–15%) — หลบ content ตรงกลาง ──
  { left: "2%",  delay: "1.2s", dur: "9.0s", text: "const fn = ()", color: JSCRIPT, anim: "rk-petal-fall-a" },
  { left: "5%",  delay: "5.4s", dur: "9.2s", text: "def main():",   color: PYTHON,  anim: "rk-petal-fall-c" },
  { left: "8%",  delay: "3.5s", dur: "8.8s", text: "var x = 0;",    color: CSHARP,  anim: "rk-petal-fall-b" },
  { left: "11%", delay: "4.8s", dur: "8.4s", text: "() => {}",      color: JSCRIPT, anim: "rk-petal-fall-b" },
  { left: "14%", delay: "2.3s", dur: "8.6s", text: "print('hi')",   color: PYTHON,  anim: "rk-petal-fall-a" },

  // ── RIGHT edge (78–95%) ──
  { left: "78%", delay: "0.5s", dur: "9.5s", text: "await api()",   color: JSCRIPT, anim: "rk-petal-fall-c" },
  { left: "82%", delay: "1.7s", dur: "9.6s", text: "Task.Run()",    color: CSHARP,  anim: "rk-petal-fall-c" },
  { left: "86%", delay: "7.0s", dur: "9.4s", text: "for i in n:",   color: PYTHON,  anim: "rk-petal-fall-a" },
  { left: "90%", delay: "4.2s", dur: "8.5s", text: "async () =>",   color: CSHARP,  anim: "rk-petal-fall-a" },
  { left: "93%", delay: "6.1s", dur: "8.8s", text: "useState(0)",   color: JSCRIPT, anim: "rk-petal-fall-b" },
] as const

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#FFF8F0] py-16 sm:py-20 lg:py-24"
    >
      {/* ── Server Racks 6 ตู้ — cluster ติดกัน 2 ข้าง ── */}
      <div aria-hidden className="pointer-events-none">
        {/* Left cluster — pro (ขอบ) → classic → mini (ใน) */}
        <div className="absolute bottom-0 left-0 z-0 flex items-end gap-0.5">
          <ServerRack
            variant="pro"
            className="w-20 shrink-0 sm:w-28 lg:w-36"
          />
          <ServerRack
            variant="classic"
            className="hidden w-16 shrink-0 opacity-75 sm:block sm:w-20 lg:w-28"
          />
          <ServerRack
            variant="mini"
            className="hidden w-12 shrink-0 opacity-55 sm:block sm:w-14 lg:w-20"
          />
        </div>

        {/* Right cluster — mini (ใน) → pro → classic (ขอบ) */}
        <div className="absolute bottom-0 right-0 z-0 flex items-end gap-0.5">
          <ServerRack
            variant="mini"
            className="hidden w-12 shrink-0 opacity-55 sm:block sm:w-14 lg:w-20"
          />
          <ServerRack
            variant="pro"
            className="hidden w-16 shrink-0 opacity-75 sm:block sm:w-20 lg:w-28"
          />
          <ServerRack
            variant="classic"
            className="w-20 shrink-0 sm:w-28 lg:w-36"
          />
        </div>
      </div>

      {/* ── กลีบดอก + code snippets ร่วงพร้อมกัน ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
        {FALLING_PETALS.map((p, i) => (
          <div
            key={`p-${i}`}
            className={`absolute ${p.anim}`}
            style={{ left: p.left, top: "-16px", animationDelay: p.delay, animationDuration: p.dur }}
          >
            <PixelPetal size={p.size} color={p.color} />
          </div>
        ))}
        {FALLING_CODE.map((c, i) => (
          <span
            key={`c-${i}`}
            className={`font-pixelify absolute whitespace-nowrap text-sm tracking-tight ${c.anim}`}
            style={{
              left: c.left,
              top: "-20px",
              animationDelay: c.delay,
              animationDuration: c.dur,
              color: c.color,
              opacity: 0.3,
              textShadow: "1px 1px 0 rgba(255,248,240,0.8)",
            }}
          >
            {c.text}
          </span>
        ))}
      </div>

      {/* ── เนื้อหาหลัก — single centered column ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* TEXT block */}
        <div className="flex flex-col items-center text-center">
          <span
            className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
            style={{ boxShadow: "4px 4px 0 #E63946" }}
          >
            ★ SOFTWARE HOUSE · LV.99
          </span>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[1.08] tracking-tight text-[#0A2540] sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            รับทำซอฟต์แวร์ทุกระบบ
            <br />
            เพื่อ
            <span className="relative inline-block whitespace-nowrap text-[#E63946]">
              ธุรกิจ SME ไทย
              {/* underline accent — pixel-art yellow + navy shadow */}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F1C40F]"
                style={{ boxShadow: "0 2px 0 #0A2540" }}
              />
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg font-medium leading-snug text-[#0A2540]/85 sm:text-xl lg:text-2xl">
            <TypewriterText text="อัปเลเวลธุรกิจคุณ ด้วยซอฟต์แวร์ครบมือ 🎯" />
          </p>

          {/* Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {PILLS.map((p) => (
              <span
                key={p.label}
                className="font-pixel px-3 py-2 text-[10px] uppercase tracking-wider text-white"
                style={{ background: p.color, border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
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
                className="bg-white/80 p-3 text-center backdrop-blur-sm"
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

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   TYPEWRITER TEXT — พิมพ์ทีละตัวอักษร + fancy cursor
   handle Unicode (emoji surrogate pair) ด้วย Array.from
   ══════════════════════════════════════════════════════ */
function TypewriterText({
  text,
  speed = 55,
  startDelay = 400,
}: {
  text: string
  speed?: number
  startDelay?: number
}) {
  const chars = useMemo(() => Array.from(text), [text])
  const [count, setCount] = useState(0)

  useEffect(() => {
    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const tick = () => {
      if (cancelled) return
      if (i < chars.length) {
        i++
        setCount(i)
        // jitter เล็กน้อยให้รู้สึกเหมือนคนพิมพ์
        timer = setTimeout(tick, speed + Math.random() * 45)
      }
    }

    timer = setTimeout(tick, startDelay)

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [chars, speed, startDelay])

  return (
    <>
      {chars.slice(0, count).join("")}
      <span className="rk-caret-fancy" aria-hidden />
    </>
  )
}

/* ══════════════════════════════════════════════════════
   PIXEL PETAL — กลีบซากุระร่วง 4-petal ขนาดเล็ก
   ══════════════════════════════════════════════════════ */
function PixelPetal({ size = 8, color = "#FFB7C5" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 10 10" className="pixel-svg" style={{ width: size, height: size }}>
      <rect x="3" y="0" width="4" height="4" fill={color} />
      <rect x="3" y="6" width="4" height="4" fill={color} />
      <rect x="0" y="3" width="4" height="4" fill={color} />
      <rect x="6" y="3" width="4" height="4" fill={color} />
      <rect x="3" y="3" width="4" height="4" fill={color} />
      <rect x="4" y="4" width="2" height="2" fill="#F1C40F" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════
   SERVER RACK — ตู้เซิร์ฟเวอร์ pixel-art (2 variants)
   viewBox 80×280 · classic = 8 units / pro = LCD + 6 units
   ══════════════════════════════════════════════════════ */
type RackProps = {
  className?: string
  style?: React.CSSProperties
  variant?: "classic" | "pro" | "mini"
}

function ServerRack({ className, style, variant = "classic" }: RackProps) {
  if (variant === "pro")  return <ServerRackPro  className={className} style={style} />
  if (variant === "mini") return <ServerRackMini className={className} style={style} />
  return <ServerRackClassic className={className} style={style} />
}

/* ── Variant: classic — 8 units, navy + multi-color LED ── */
function ServerRackClassic({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const LEDS: Array<[string, string, string]> = [
    ["#2ECC71", "#E63946", "#2ECC71"],
    ["#2ECC71", "#F1C40F", "#3498DB"],
    ["#F1C40F", "#2ECC71", "#E63946"],
    ["#2ECC71", "#2ECC71", "#3498DB"],
    ["#E63946", "#F1C40F", "#2ECC71"],
    ["#2ECC71", "#3498DB", "#2ECC71"],
    ["#F1C40F", "#2ECC71", "#E63946"],
    ["#3498DB", "#2ECC71", "#F1C40F"],
  ]
  return (
    <svg
      viewBox="0 0 80 280"
      className={`pixel-svg ${className ?? ""}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cabinet */}
      <rect x="0" y="0" width="80" height="280" fill="#0A0A14" />
      <rect x="3" y="3" width="74" height="274" fill="#2C3E50" />
      <rect x="6" y="6" width="68" height="268" fill="#0F1419" />

      {/* Top brand strip */}
      <rect x="10" y="8"  width="60" height="6" fill="#0A2540" />
      <rect x="14" y="10" width="2"  height="2" fill="#3498DB" />
      <rect x="20" y="10" width="2"  height="2" fill="#3498DB" />
      <rect x="60" y="10" width="6"  height="2" fill="#34495E" />

      {/* 8 server units */}
      {LEDS.map((leds, i) => {
        const y = 18 + i * 30
        return (
          <g key={i}>
            <rect x="8"  y={y}     width="64" height="26" fill="#34495E" />
            <rect x="8"  y={y}     width="64" height="2"  fill="#5D6D7E" />
            <rect x="10" y={y + 4} width="60" height="20" fill="#2C3E50" />
            {/* LED 1 — solid (status) */}
            <rect x="13" y={y + 9} width="3"  height="3"  fill={leds[0]} />
            {/* LED 2 — flicker (activity log) */}
            <rect
              x="19" y={y + 9} width="3" height="3" fill={leds[1]}
              className="rk-led-flicker"
              style={{ animationDelay: `${(i * 0.27) % 2.6}s` }}
            />
            {/* LED 3 — blink (heartbeat) */}
            <rect
              x="25" y={y + 9} width="3" height="3" fill={leds[2]}
              className="rk-led-blink"
              style={{ animationDelay: `${(i * 0.18) % 1.4}s` }}
            />
            <rect x="34" y={y + 7}  width="32" height="2" fill="#0A2540" />
            <rect x="34" y={y + 12} width="32" height="2" fill="#0A2540" />
            <rect x="34" y={y + 17} width="32" height="2" fill="#0A2540" />
            <rect x="8"  y={y + 24} width="64" height="2" fill="#0A0A14" />
          </g>
        )
      })}

      {/* Base + feet */}
      <rect x="6"  y="262" width="68" height="12" fill="#1A1A2E" />
      <rect x="14" y="274" width="6"  height="6"  fill="#0A0A14" />
      <rect x="60" y="274" width="6"  height="6"  fill="#0A0A14" />
    </svg>
  )
}

/* ── Variant: pro — LCD status panel + 6 thicker units, cyan accent ── */
function ServerRackPro({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  // 6 unit LED pattern (cyan/green dominant)
  const LEDS: Array<[string, string]> = [
    ["#00E5FF", "#2ECC71"],
    ["#2ECC71", "#00E5FF"],
    ["#00E5FF", "#2ECC71"],
    ["#F1C40F", "#00E5FF"],
    ["#2ECC71", "#00E5FF"],
    ["#00E5FF", "#F1C40F"],
  ]
  // Histogram bars (heights mountain-shaped) on top LCD
  const HIST = [
    { x: 14, h: 6,  c: "#00E5FF" },
    { x: 19, h: 10, c: "#00E5FF" },
    { x: 24, h: 16, c: "#2ECC71" },
    { x: 29, h: 22, c: "#2ECC71" },
    { x: 34, h: 28, c: "#F1C40F" },
    { x: 39, h: 30, c: "#F1C40F" },
    { x: 44, h: 24, c: "#E67E22" },
    { x: 49, h: 18, c: "#E67E22" },
    { x: 54, h: 12, c: "#E63946" },
    { x: 59, h: 8,  c: "#E63946" },
  ]
  return (
    <svg
      viewBox="0 0 80 280"
      className={`pixel-svg ${className ?? ""}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cabinet */}
      <rect x="0" y="0" width="80" height="280" fill="#0A0A14" />
      <rect x="3" y="3" width="74" height="274" fill="#1F3552" />
      <rect x="6" y="6" width="68" height="268" fill="#0B1622" />

      {/* === Top LCD status display === */}
      {/* Outer dark frame */}
      <rect x="8" y="8" width="64" height="46" fill="#000A14" />
      {/* Inner dark blue */}
      <rect x="10" y="10" width="60" height="42" fill="#001A2B" />
      {/* Top glow line */}
      <rect x="10" y="10" width="60" height="2" fill="#00E5FF" />
      {/* Bottom subtle glow */}
      <rect x="10" y="50" width="60" height="2" fill="#00E5FF" opacity="0.4" />
      {/* Header indicator dots (cyan, blink staggered) */}
      <rect x="14" y="14" width="2" height="2" fill="#00E5FF"
        className="rk-led-blink" style={{ animationDelay: "0s" }} />
      <rect x="18" y="14" width="2" height="2" fill="#00E5FF"
        className="rk-led-blink" style={{ animationDelay: "0.4s" }} />
      <rect x="22" y="14" width="2" height="2" fill="#00E5FF"
        className="rk-led-blink" style={{ animationDelay: "0.8s" }} />
      {/* Online status pill — pulse ช้าๆ เหมือน heartbeat */}
      <rect x="56" y="14" width="10" height="3" fill="#2ECC71"
        className="rk-led-pulse" />
      <rect x="56" y="14" width="2"  height="3" fill="#1A8E4A" />

      {/* Histogram bars */}
      {HIST.map((b, i) => (
        <rect key={i} x={b.x} y={50 - b.h} width="3" height={b.h} fill={b.c} />
      ))}
      {/* Baseline */}
      <rect x="10" y="49" width="60" height="1" fill="#00E5FF" opacity="0.35" />

      {/* === 6 Server Units === */}
      {LEDS.map((leds, i) => {
        const y = 60 + i * 30
        return (
          <g key={i}>
            {/* Body */}
            <rect x="8"  y={y}      width="64" height="28" fill="#34495E" />
            <rect x="8"  y={y}      width="64" height="2"  fill="#5D6D7E" />
            {/* Front face — slightly bluer than classic */}
            <rect x="10" y={y + 4}  width="60" height="22" fill="#1F3552" />
            {/* Cyan LEDs (2 dots — blink + flicker) */}
            <rect
              x="13" y={y + 10} width="3" height="3" fill={leds[0]}
              className="rk-led-blink"
              style={{ animationDelay: `${(i * 0.23) % 1.4}s` }}
            />
            <rect
              x="19" y={y + 10} width="3" height="3" fill={leds[1]}
              className="rk-led-flicker"
              style={{ animationDelay: `${(i * 0.41) % 2.6}s` }}
            />
            {/* Drive bay (4 horizontal slots) */}
            <rect x="28" y={y + 7}  width="40" height="2" fill="#000A14" />
            <rect x="28" y={y + 11} width="40" height="2" fill="#000A14" />
            <rect x="28" y={y + 15} width="40" height="2" fill="#000A14" />
            <rect x="28" y={y + 19} width="40" height="2" fill="#000A14" />
            {/* Cyan accent line */}
            <rect x="13" y={y + 22} width="55" height="1" fill="#00E5FF" opacity="0.45" />
            {/* Bottom shadow */}
            <rect x="8"  y={y + 26} width="64" height="2" fill="#0A0A14" />
          </g>
        )
      })}

      {/* Base + cyan stripe + feet */}
      <rect x="6"  y="240" width="68" height="2"  fill="#00E5FF" opacity="0.45" />
      <rect x="6"  y="242" width="68" height="20" fill="#1A1A2E" />
      <rect x="6"  y="262" width="68" height="12" fill="#1F3552" />
      <rect x="14" y="274" width="6"  height="6"  fill="#0A0A14" />
      <rect x="60" y="274" width="6"  height="6"  fill="#0A0A14" />
    </svg>
  )
}

/* ── Variant: mini — 4 units กะทัดรัด, viewBox 60×180 ── */
function ServerRackMini({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const LEDS: Array<[string, string]> = [
    ["#2ECC71", "#3498DB"],
    ["#F1C40F", "#2ECC71"],
    ["#2ECC71", "#E63946"],
    ["#3498DB", "#2ECC71"],
  ]
  return (
    <svg
      viewBox="0 0 60 180"
      className={`pixel-svg ${className ?? ""}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cabinet */}
      <rect x="0" y="0" width="60" height="180" fill="#0A0A14" />
      <rect x="2" y="2" width="56" height="176" fill="#2C3E50" />
      <rect x="4" y="4" width="52" height="172" fill="#0F1419" />

      {/* Top brand strip */}
      <rect x="8"  y="6" width="44" height="4" fill="#0A2540" />
      <rect x="10" y="7" width="2"  height="2" fill="#3498DB" />
      <rect x="40" y="7" width="8"  height="2" fill="#34495E" />

      {/* 4 server units */}
      {LEDS.map((leds, i) => {
        const y = 14 + i * 30
        return (
          <g key={i}>
            <rect x="6" y={y}      width="48" height="26" fill="#34495E" />
            <rect x="6" y={y}      width="48" height="2"  fill="#5D6D7E" />
            <rect x="8" y={y + 4}  width="44" height="20" fill="#2C3E50" />
            <rect
              x="11" y={y + 9} width="3" height="3" fill={leds[0]}
              className="rk-led-blink"
              style={{ animationDelay: `${(i * 0.21) % 1.4}s` }}
            />
            <rect
              x="16" y={y + 9} width="3" height="3" fill={leds[1]}
              className="rk-led-flicker"
              style={{ animationDelay: `${(i * 0.34) % 2.6}s` }}
            />
            {/* Drive grille (2 slots — กะทัดรัด) */}
            <rect x="24" y={y + 8}  width="24" height="2" fill="#0A2540" />
            <rect x="24" y={y + 13} width="24" height="2" fill="#0A2540" />
            {/* Bottom shadow */}
            <rect x="6" y={y + 24} width="48" height="2" fill="#0A0A14" />
          </g>
        )
      })}

      {/* Base + feet */}
      <rect x="4"  y="138" width="52" height="20" fill="#1A1A2E" />
      <rect x="4"  y="158" width="52" height="14" fill="#0F1419" />
      <rect x="10" y="172" width="6"  height="8"  fill="#0A0A14" />
      <rect x="44" y="172" width="6"  height="8"  fill="#0A0A14" />
    </svg>
  )
}
