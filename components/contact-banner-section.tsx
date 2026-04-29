"use client"

import { useEffect, useRef } from "react"
import { Phone, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useLangTypography } from "@/lib/language-context"
import { CONTACT_BANNER } from "@/data/contact-banner"
import { useExitTransition } from "@/providers/exit-transition-provider"

// ─── SVG ดาว 4 แฉก ───────────────────────────────────────────────────
function Star4({ size, color, strokeColor, style }: { size: number; color: string; strokeColor: string; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeLinejoin="round"
      style={{
        ...style,
        filter: `drop-shadow(0px 2px 2px rgba(0,0,0,0.15))`
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  )
}

// ─── Component ดาวระยิบระยับ ──────────────────────────────────────────
function SparkleField({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const c = CONTACT_BANNER.sparkles

  // สุ่ม sparkle ข้อมูลทุกครั้ง mount (stable ใน SSR ด้วย useMemo seed)
  const sparkles = Array.from({ length: c.count }, (_, i) => ({
    id: i,
    x: `${((i * 73 + 11) % 100)}%`,
    y: `${((i * 47 + 23) % 100)}%`,
    size: c.minSize + ((i * 31) % (c.maxSize - c.minSize + 1)),
    color: c.colors[i % c.colors.length],
    delay: `${((i * 0.37) % 2).toFixed(2)}s`,
    duration: `${(c.minDuration + (i * 0.19) % (c.maxDuration - c.minDuration)).toFixed(2)}s`,
    rotate: `${(i * 83) % 360}deg`,
  }))

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center justify-center"
      style={{ padding: '0.4em 0.6em' }}
    >
      {/* ดาวระยิบระยับ */}
      {sparkles.map(s => (
        <span
          key={s.id}
          aria-hidden="true"
          className="sparkle-star"
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            transform: `translate(-50%, -50%) rotate(${s.rotate})`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          <Star4 size={s.size} color={s.color} strokeColor={c.starStroke} />
        </span>
      ))}

      {/* ข้อความเบอร์โทร */}
      <span className="relative z-10">{children}</span>
    </div>
  )
}

export function ContactBannerSection() {
  const t = useTranslations("contact_banner")
  const typo = useLangTypography()
  const c = CONTACT_BANNER.colors
  const { triggerTransition } = useExitTransition()

  return (
    <section
      id="contact-banner"
      className="relative overflow-hidden"
      style={{ background: c.bg }}
    >

      {/* ─── เส้นขอบ top / bottom ─────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: c.borderLine }} />
      <div className="absolute bottom-0 left-0 right-0 h-1 z-10" style={{ background: c.borderLine }} />

      {/* ─── Content wrapper ─────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center text-center"
        style={{
          maxWidth: '100%',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5"
          style={{
            background: c.badge,
            border: `2px solid ${c.btnBorder}`,
            boxShadow: `3px 3px 0 ${c.btnShadow}`,
            borderRadius: '999px',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: c.badgePing }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: c.badgePing }} />
          </span>
          <Phone className="w-3.5 h-3.5" style={{ color: c.badgeText }} />
          <span
            className="font-black uppercase text-xs"
            style={{ color: c.badgeText, letterSpacing: typo.trackingLabel }}
          >
            {t("badge")}
          </span>
        </div>

        {/* Label บนเบอร์ */}
        <div
          className="font-bold uppercase mb-1 tracking-widest text-xs"
          style={{ color: c.label, letterSpacing: '0.2em' }}
        >
          {t("label")}
        </div>

        {/* ─── เบอร์โทรตัวใหญ่ + ดาวระยิบระยับ ──────────────────── */}
        <SparkleField>
          <a
            href={CONTACT_BANNER.phone_href}
            className="block font-black leading-none transition-transform duration-150 hover:scale-105 active:scale-95"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              color: c.text,
              letterSpacing: '0.06em',
              fontFamily: typo.fontFamily,
              whiteSpace: 'nowrap',
              textShadow: 'none',
            }}
          >
            {CONTACT_BANNER.phone_display}
          </a>
        </SparkleField>

        {/* Sub label ใต้เบอร์ */}
        <div
          className="mt-1 mb-5 font-medium text-sm"
          style={{ color: c.label, letterSpacing: typo.trackingBody }}
        >
          {t("sub")}
        </div>

        {/* ─── ปุ่ม LINE ────────────────────────────────────────────── */}
        <button
          className="btn-shimmer flex items-center gap-2.5 font-black uppercase transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px]"
          style={{
            padding: '14px 36px',
            background: c.btnBg,
            color: c.btnText,
            border: `3px solid ${c.btnBorder}`,
            boxShadow: `5px 5px 0 ${c.btnShadow}`,
            borderRadius: '999px',
            fontSize: typo.sectionBadge,
            letterSpacing: typo.trackingButton,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `7px 7px 0 ${c.btnShadow}` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${c.btnShadow}` }}
          onClick={() => triggerTransition(CONTACT_BANNER.line_href, 'line')}
        >
          <span className="shimmer-light" />
          <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: c.btnText }} />
          {t("cta_line")}
        </button>
      </div>
    </section>
  )
}
