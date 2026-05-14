// ════════════════════════════════════════════════════════════════════════
// /renew — หน้าแจ้งเตือน application หมดอายุ
//
// CONCEPT: น่ารัก + อ่อนน้อม + ไม่กดดัน
// — ไม่ใช่ "PAY NOW OR LOSE EVERYTHING" แต่เป็น "เราจะรอ ทักเรามาได้เสมอ"
// — ข้อมูลปลอดภัย 30 วันก่อนลบ
// — มี 2 path: ต่ออายุ / ไม่ต่อ (ทั้งสองทางเรา welcome)
// ════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Navbar } from "@/components/rubkiancode/navbar"
import { ArrowIcon } from "@/components/rubkiancode/icons"

const Footer = dynamic(() =>
  import("@/components/rubkiancode/footer").then((m) => ({ default: m.Footer }))
)

export const metadata: Metadata = {
  title: "ต่ออายุบริการ — RubKianCode",
  description:
    "บริการของคุณหมดอายุแล้ว ติดต่อเราเพื่อต่ออายุ ข้อมูลจะถูกเก็บไว้ 30 วันก่อนลบถาวร — ไม่ต่อก็แจ้งเราได้",
  robots: { index: false, follow: false }, // private utility page
  alternates: { canonical: "/renew" },
}

// ════════════════════════════════════════════════════════════════════════
// CONTACTS — channels ที่ลูกค้าทักหาเราได้
// ════════════════════════════════════════════════════════════════════════
const CONTACTS = [
  {
    label: "โทรหาเรา",
    sub: "Phone Call",
    value: "+66 63 594 4429",
    href: "tel:+66635944429",
    accent: "#E63946",
    icon: <PhoneIcon />,
  },
  {
    label: "LINE Official",
    sub: "Chat us",
    value: "@rubkiancode",
    href: "https://lin.ee/ZDaqVzd",
    accent: "#2ECC71",
    icon: <LineIcon />,
  },
  {
    label: "ส่งอีเมล",
    sub: "Email Us",
    value: "rubkiancode@gmail.com",
    href: "mailto:rubkiancode@gmail.com",
    accent: "#3498DB",
    icon: <MailIcon />,
  },
] as const

// ════════════════════════════════════════════════════════════════════════
// FLOATING DECOR — pixel hearts ลอย-กระพริบ ทั่วหน้า
// ════════════════════════════════════════════════════════════════════════
const HEARTS = [
  { left: "8%",  top: "12%", size: "text-2xl", color: "#E63946", anim: "rk-float",   delay: "0s"   },
  { left: "92%", top: "8%",  size: "text-3xl", color: "#FF8FA3", anim: "rk-twinkle", delay: "0.5s" },
  { left: "5%",  top: "62%", size: "text-xl",  color: "#F1C40F", anim: "rk-twinkle", delay: "1.2s" },
  { left: "94%", top: "55%", size: "text-2xl", color: "#9B59B6", anim: "rk-float",   delay: "0.8s" },
  { left: "15%", top: "85%", size: "text-xl",  color: "#2ECC71", anim: "rk-twinkle", delay: "2.0s" },
  { left: "85%", top: "82%", size: "text-2xl", color: "#3498DB", anim: "rk-float",   delay: "1.5s" },
  { left: "50%", top: "5%",  size: "text-lg",  color: "#FFB7C5", anim: "rk-twinkle", delay: "2.5s" },
  { left: "30%", top: "92%", size: "text-xl",  color: "#FF8FA3", anim: "rk-float",   delay: "0.3s" },
] as const

export default function RenewPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0A2540]">
      <Navbar />

      {/* ════════════════════════════════════════════════════
          HERO — sleepy mascot + soft heading
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        {/* Floating hearts decoration */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {HEARTS.map((h, i) => (
            <div
              key={i}
              className={`absolute ${h.anim}`}
              style={{
                left: h.left,
                top: h.top,
                animationDelay: h.delay,
                color: h.color,
              }}
            >
              <span className={`font-pixel ${h.size}`}>♥</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Status badge */}
          <span
            className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
            style={{ boxShadow: "4px 4px 0 #f7a700" }}
          >
            ★ STATUS · ZZZ
          </span>

          {/* Sleepy mascot */}
          <div className="mt-8 flex justify-center">
            <SleepyComputer />
          </div>

          {/* H1 */}
          <h1 className="mt-8 text-3xl font-black uppercase leading-[1.15] text-[#0A2540] sm:text-4xl lg:text-5xl">
            แอปของคุณ
            <br />
            <span className="text-[#E63946]">กำลังพักหลับอยู่ครับ</span>
            <span className="ml-2 inline-block">💤</span>
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#0A2540]/85 sm:text-lg">
            ไม่ต้องกังวลนะครับ — ข้อมูลทั้งหมดของคุณ
            <b className="text-[#0A2540]"> ยังปลอดภัย</b>อยู่ในระบบของเรา
            <br />
            อีก{" "}
            <span className="font-pixelify text-2xl font-bold text-[#E63946]">
              30 วัน
            </span>{" "}
            ก่อนที่จะถูกลบถาวร
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#0A2540]/60 sm:text-base">
            ทักหาเราได้ทุกเวลาครับ ทีมงานยินดีต้อนรับเสมอ{" "}
            <span className="text-[#E63946]">♥</span>
          </p>

          {/* Countdown card */}
          <div className="mt-10 flex justify-center">
            <CountdownCard />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TWO PATHS — Renew or Cancel (both welcomed)
          ════════════════════════════════════════════════════ */}
      <section className="border-y-[3px] border-[#0A2540] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 #E63946" }}
            >
              ★ CHOOSE · YOUR PATH
            </span>
            <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl">
              ต่อหรือไม่ต่อ
              <br className="sm:hidden" />
              <span className="text-[#E63946]"> ก็บอกเราได้ครับ</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#0A2540]/70">
              เราเข้าใจว่าทุกธุรกิจมีจังหวะของตัวเอง — ไม่ว่าจะเลือกทางไหน
              เราพร้อมช่วยคุณเสมอ
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ActionCard
              num="A"
              tag="RENEW · CONTINUE"
              title="ต่ออายุบริการ"
              subtitle="ทำต่อด้วยกันครับ"
              description="ทักเราเพื่อจัดการต่ออายุ — ระบบของคุณจะกลับมาทำงานทันทีหลังชำระเงิน ข้อมูลครบเหมือนเดิม ไม่หายแม้แต่ rec เดียว"
              points={[
                "ระบบกลับมาทำงานทันทีหลังชำระเงิน",
                "ข้อมูลและ config ทุกอย่างคงเดิม",
                "Hypercare ฟรี 30 วันแรก เหมือนตอนเริ่ม",
                "ออกใบกำกับภาษี / ใบเสร็จได้",
              ]}
              ctaLabel="ติดต่อเพื่อต่ออายุ"
              accent="#2ECC71"
              icon="♥"
            />

            <ActionCard
              num="B"
              tag="CANCEL · WITH GRACE"
              title="ไม่ต่อก็บอกเราหน่อย"
              subtitle="ขอบคุณที่ร่วมเดินทาง"
              description="ไม่เป็นไรเลยครับ ทักมาบอกได้เลย ก่อนข้อมูลถูกลบ — เราจะ export ข้อมูลทั้งหมดให้คุณฟรี เผื่อต้องเก็บไว้ใช้ในอนาคต"
              points={[
                "Export ข้อมูลให้ฟรี · ไม่คิดค่าใช้จ่าย",
                "ไม่มีค่าธรรมเนียมการยกเลิก",
                "ขอ feedback สั้น ๆ เพื่อปรับปรุง (optional)",
                "ยินดีต้อนรับกลับมาเสมอ ถ้าอนาคตต้องการอีก",
              ]}
              ctaLabel="แจ้งทีมงาน"
              accent="#9B59B6"
              icon="✿"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CONTACT — 3 channels
          ════════════════════════════════════════════════════ */}
      <section id="contact" className="scroll-mt-24 bg-[#FFF8F0] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 #3498DB" }}
            >
              ★ CONTACT · US
            </span>
            <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl">
              ทักเราได้ทุกช่องทาง
              <br className="sm:hidden" />
              <span className="text-[#3498DB]"> เลือกที่สะดวกครับ</span>
            </h2>
            <p className="mt-4 text-base text-[#0A2540]/70">
              ทีมงานพร้อมตอบกลับภายใน{" "}
              <b className="text-[#0A2540]">1 วันทำการ</b> ★
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center bg-white p-6 text-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{
                  border: "3px solid #0A2540",
                  boxShadow: `5px 5px 0 ${c.accent}`,
                }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center"
                  style={{
                    background: c.accent,
                    border: "2px solid #0A2540",
                    boxShadow: "3px 3px 0 #0A2540",
                  }}
                >
                  {c.icon}
                </span>
                <span className="font-pixel mt-4 text-[10px] uppercase tracking-widest text-[#0A2540]/60">
                  {c.sub}
                </span>
                <span className="mt-1 text-base font-black uppercase text-[#0A2540]">
                  {c.label}
                </span>
                <span className="mt-3 break-all text-sm font-bold text-[#0A2540]/85">
                  {c.value}
                </span>
              </a>
            ))}
          </div>

          {/* Office hours */}
          <div
            className="mx-auto mt-10 max-w-2xl bg-white p-5 text-center"
            style={{ border: "2px solid #0A2540", boxShadow: "4px 4px 0 #f7a700" }}
          >
            <span className="font-pixel text-[10px] uppercase tracking-widest text-[#0A2540]/60">
              ★ OFFICE HOURS
            </span>
            <p className="mt-2 text-sm text-[#0A2540] sm:text-base">
              จันทร์–เสาร์ · 09:00–18:00 น.
              <span className="hidden text-[#0A2540]/40 sm:inline"> · </span>
              <br className="sm:hidden" />
              <span className="text-[#0A2540]/70">
                นอกเวลา ทักเข้ามาได้ ทีมงานจะตอบกลับวันถัดไป
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CLOSING — gentle thank you
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A2540] py-16 text-center sm:py-20">
        {/* Pixel hearts decoration */}
        <span
          aria-hidden
          className="font-pixel rk-twinkle absolute left-[15%] top-8 text-2xl text-[#E63946]"
          style={{ animationDelay: "0s" }}
        >
          ♥
        </span>
        <span
          aria-hidden
          className="font-pixel rk-float absolute right-[18%] top-12 text-2xl text-[#F1C40F]"
          style={{ animationDelay: "0.5s" }}
        >
          ★
        </span>
        <span
          aria-hidden
          className="font-pixel rk-twinkle absolute bottom-8 left-[10%] text-xl text-[#FF8FA3]"
          style={{ animationDelay: "1.2s" }}
        >
          ♥
        </span>
        <span
          aria-hidden
          className="font-pixel rk-float absolute bottom-10 right-[12%] text-xl text-[#2ECC71]"
          style={{ animationDelay: "0.8s" }}
        >
          ★
        </span>

        <div className="relative z-10 mx-auto max-w-2xl px-4">
          <span
            className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
            style={{ boxShadow: "4px 4px 0 #E63946" }}
          >
            ★ THANK · YOU ★
          </span>
          <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
            เราจะรอข่าวจากคุณครับ
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#F4EDE0]/80 sm:text-base">
            ไม่ว่าจะเป็นการต่ออายุ หรือ บอกลา —
            <br />
            เรายินดีรับฟังเสมอ <span className="text-[#E63946]">♥</span>
            <br />
            <span className="text-[#F4EDE0]/60">
              ขอบคุณที่เคยร่วมเดินทางกับ RubKianCode
            </span>
          </p>

          <Link
            href="/"
            className="font-pixel mt-8 inline-flex items-center gap-2 bg-[#F1C40F] px-5 py-3 text-xs uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ border: "2px solid #F1C40F", boxShadow: "4px 4px 0 #E63946" }}
          >
            กลับหน้าหลัก
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ════════════════════════════════════════════════════════════════════
   COUNTDOWN CARD — แสดง 30-day data retention
   ════════════════════════════════════════════════════════════════════ */
function CountdownCard() {
  return (
    <div
      className="w-full max-w-md bg-white p-5"
      style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #f7a700" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#0A2540]/60">
          DATA · SAFE FOR
        </span>
        <span
          className="font-pixel inline-flex items-center gap-1 bg-[#2ECC71] px-2 py-1 text-[9px] uppercase text-white"
          style={{ border: "1px solid #0A2540" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          ACTIVE
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="font-pixelify text-6xl font-black text-[#E63946] sm:text-7xl">
          30
        </span>
        <span className="text-xl font-bold text-[#0A2540]">วัน</span>
      </div>
      {/* Progress bar — visual representation */}
      <div
        className="mt-4 h-3 w-full overflow-hidden bg-[#F4EDE0]"
        style={{ border: "2px solid #0A2540" }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#2ECC71] via-[#F1C40F] to-[#E63946]"
          style={{ width: "100%" }}
        />
      </div>
      <p className="mt-3 text-center text-xs text-[#0A2540]/65">
        อีก 30 วัน นับจากวันที่หมดอายุของ Application ของคุณ
      </p>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   ACTION CARD — Renew / Cancel path
   ════════════════════════════════════════════════════════════════════ */
function ActionCard({
  num,
  tag,
  title,
  subtitle,
  description,
  points,
  ctaLabel,
  accent,
  icon,
}: {
  num: string
  tag: string
  title: string
  subtitle: string
  description: string
  points: string[]
  ctaLabel: string
  accent: string
  icon: string
}) {
  return (
    <div
      className="flex flex-col bg-[#FFF8F0] p-6 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:p-8"
      style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 " + accent }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-pixel bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
          style={{ boxShadow: "3px 3px 0 " + accent }}
        >
          {num} · {tag}
        </span>
        <span
          className="font-pixel flex h-12 w-12 items-center justify-center text-2xl"
          style={{
            background: accent,
            color: "white",
            border: "2px solid #0A2540",
            boxShadow: "3px 3px 0 #0A2540",
          }}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-3xl">
        {title}
      </h3>
      <p className="font-pixel mt-2 text-[10px] uppercase tracking-widest text-[#0A2540]/55">
        {subtitle}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-[#0A2540]/80 sm:text-base">
        {description}
      </p>

      {/* Bullet points */}
      <ul className="mt-6 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-[#0A2540]">
            <span
              className="font-pixel mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-[10px]"
              style={{ background: accent, color: "white" }}
            >
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {/* CTA — anchor ไป contact section ด้านล่าง */}
      <a
        href="#contact"
        className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        style={{
          background: accent,
          border: "3px solid #0A2540",
          boxShadow: "5px 5px 0 #0A2540",
        }}
      >
        {ctaLabel}
        <ArrowIcon className="h-4 w-4" />
      </a>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   SLEEPY COMPUTER — pixel-art mascot ที่หลับ + Z Z Z
   ════════════════════════════════════════════════════════════════════ */
function SleepyComputer() {
  return (
    <div className="relative">
      {/* Z Z Z floating above */}
      <span
        aria-hidden
        className="font-pixel rk-float absolute -top-2 right-0 text-2xl text-[#9B59B6] sm:-right-2 sm:text-3xl"
        style={{ animationDelay: "0s" }}
      >
        Z
      </span>
      <span
        aria-hidden
        className="font-pixel rk-float absolute -top-6 right-6 text-xl text-[#9B59B6]/80 sm:right-8 sm:text-2xl"
        style={{ animationDelay: "0.4s" }}
      >
        Z
      </span>
      <span
        aria-hidden
        className="font-pixel rk-float absolute -top-10 right-12 text-base text-[#9B59B6]/60 sm:right-16 sm:text-xl"
        style={{ animationDelay: "0.8s" }}
      >
        Z
      </span>

      {/* Computer body */}
      <svg
        viewBox="0 0 120 100"
        className="pixel-svg h-32 w-auto sm:h-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer cabinet */}
        <rect x="6" y="6" width="108" height="74" fill="#C8BFB0" />
        <rect x="6" y="6" width="108" height="74" fill="none" stroke="#0A2540" strokeWidth="3" />
        {/* Highlight (inset) */}
        <rect x="9" y="9" width="102" height="2" fill="#E8DFD0" />
        <rect x="9" y="76" width="102" height="2" fill="#9E9080" />

        {/* Screen bezel */}
        <rect x="14" y="14" width="92" height="58" fill="#1A252F" />
        <rect x="14" y="14" width="92" height="58" fill="none" stroke="#0A2540" strokeWidth="2" />

        {/* Screen */}
        <rect x="18" y="18" width="84" height="50" fill="#F0F0E6" />

        {/* Sleeping eyes — closed dashes */}
        <g fill="#0A2540">
          {/* Left eye */}
          <rect x="36" y="36" width="12" height="3" />
          <rect x="34" y="34" width="2" height="2" />
          <rect x="48" y="34" width="2" height="2" />
          {/* Right eye */}
          <rect x="72" y="36" width="12" height="3" />
          <rect x="70" y="34" width="2" height="2" />
          <rect x="84" y="34" width="2" height="2" />
        </g>

        {/* Smile (gentle u shape) */}
        <g fill="#E63946">
          <rect x="54" y="50" width="12" height="2" />
          <rect x="52" y="48" width="2" height="2" />
          <rect x="66" y="48" width="2" height="2" />
        </g>

        {/* Cheek blush */}
        <g fill="#FFB7C5">
          <rect x="28" y="46" width="6" height="3" />
          <rect x="86" y="46" width="6" height="3" />
        </g>

        {/* Bottom controls */}
        <rect x="20" y="74" width="6" height="3" fill="#E63946" />
        <rect x="30" y="74" width="20" height="3" fill="#0A2540" />

        {/* Stand */}
        <rect x="50" y="80" width="20" height="6" fill="#B0A898" stroke="#0A2540" strokeWidth="2" />
        <rect x="36" y="86" width="48" height="6" fill="#C8BFB0" stroke="#0A2540" strokeWidth="2" />
        <rect x="32" y="92" width="56" height="4" fill="#9E9080" stroke="#0A2540" strokeWidth="2" />
      </svg>

      {/* Floating heart on bottom-left */}
      <span
        aria-hidden
        className="font-pixel rk-twinkle absolute -left-3 bottom-8 text-2xl text-[#E63946] sm:-left-6"
        style={{ animationDelay: "0.6s" }}
      >
        ♥
      </span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   CONTACT ICONS — pixel-art
   ════════════════════════════════════════════════════════════════════ */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" className="pixel-svg h-7 w-7" fill="white">
      <rect x="3" y="3" width="6" height="2" />
      <rect x="3" y="3" width="2" height="6" />
      <rect x="11" y="11" width="2" height="2" />
      <rect x="9" y="9" width="2" height="4" />
      <rect x="11" y="5" width="2" height="2" />
      <rect x="13" y="7" width="2" height="2" />
      <rect x="13" y="9" width="2" height="2" />
    </svg>
  )
}
function LineIcon() {
  return (
    <svg viewBox="0 0 16 16" className="pixel-svg h-7 w-7" fill="white">
      <rect x="2" y="3" width="12" height="8" />
      <rect x="4" y="11" width="8" height="2" />
      <rect x="6" y="13" width="2" height="2" />
      <g fill="#2ECC71">
        <rect x="4" y="5" width="2" height="4" />
        <rect x="7" y="5" width="2" height="4" />
        <rect x="10" y="5" width="2" height="4" />
      </g>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" className="pixel-svg h-7 w-7" fill="white">
      <rect x="2" y="4" width="12" height="8" />
      <g fill="#3498DB">
        <rect x="3" y="5" width="2" height="2" />
        <rect x="5" y="6" width="2" height="2" />
        <rect x="7" y="7" width="2" height="2" />
        <rect x="9" y="6" width="2" height="2" />
        <rect x="11" y="5" width="2" height="2" />
      </g>
    </svg>
  )
}
