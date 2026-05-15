"use client"

// ════════════════════════════════════════════════════════════════════════
// CONTACT POPUP — modal กลางจอ มี backdrop, ESC-to-close, body-scroll lock
// ════════════════════════════════════════════════════════════════════════
// ใช้แบบ controlled: parent ถือ state แล้วส่ง open/onClose เข้ามา
//
// ใช้ตัวอย่าง:
//   const [open, setOpen] = useState(false)
//   <button onClick={() => setOpen(true)}>ติดต่อ</button>
//   <ContactPopup
//     open={open}
//     onClose={() => setOpen(false)}
//     accent="#2ECC71"
//     badge="★ PARTNER MANUFACTURING"
//     title="ติดต่อ Partner"
//     highlightedTitle="เพื่อผลิตตู้"
//     description="โปรดติดต่อผ่านช่องทางด้านล่าง..."
//   />
// ════════════════════════════════════════════════════════════════════════

import { useEffect } from "react"
import {
  trackContactClick,
  trackContactPopupOpen,
  type ContactChannel as GAChannel,
} from "@/lib/analytics"

export type ContactChannel = {
  label: string                 // ข้อความบนปุ่ม
  href: string                  // ลิงก์ปลายทาง (https / mailto / tel)
  bg: string                    // สี brand ของช่องทาง
  external?: boolean            // true = เปิด tab ใหม่
  gaChannel?: GAChannel         // identifier สำหรับ GA event
}

// ช่องทาง default ของ RubKianCode — override ได้ผ่าน prop `channels`
export const DEFAULT_CONTACT_CHANNELS: ContactChannel[] = [
  { label: "LINE @rubkiancode",          href: "https://lin.ee/ZDaqVzd",       bg: "#06C755", external: true, gaChannel: "line" },
  { label: "โทร 063-594-4429",           href: "tel:0635944429",                            bg: "#F39C12", gaChannel: "phone" },
  { label: "Facebook rubkiancode",  href: "https://www.facebook.com/rubkiancode/", bg: "#1877F2", external: true, gaChannel: "facebook" },
  { label: "rubkiancode@gmail.com",      href: "mailto:rubkiancode@gmail.com",              bg: "#0A2540", gaChannel: "email" },
]

type Props = {
  open: boolean
  onClose: () => void
  accent?: string               // hex สี theme — border shadow + highlighted title (default navy)
  badge?: string                // eyebrow pixel tag (optional)
  title: string                 // บรรทัดแรกของ heading
  highlightedTitle?: string     // บรรทัดที่ 2 (สี accent, optional)
  description?: string          // body text (optional)
  channels?: ContactChannel[]   // override ช่องทางติดต่อ — default = DEFAULT_CONTACT_CHANNELS
  source?: string               // ที่มาของการเปิด popup สำหรับ GA event (default "popup")
}

export function ContactPopup({
  open,
  onClose,
  accent = "#0A2540",
  badge,
  title,
  highlightedTitle,
  description,
  channels = DEFAULT_CONTACT_CHANNELS,
  source = "popup",
}: Props) {
  // ESC ปิด modal + lock scroll body ตอนเปิด + ส่ง GA event ตอนเปิด
  useEffect(() => {
    if (!open) return
    trackContactPopupOpen(source)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, source])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A2540]/85 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#F4EDE0] p-6 sm:p-8"
        style={{ border: "3px solid #0A2540", boxShadow: `10px 10px 0 ${accent}` }}
      >
        {/* Pixel corner accents */}
        <span aria-hidden className="absolute left-0 top-0 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute right-0 top-0 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 bg-[#F1C40F]" />
        <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 bg-[#F1C40F]" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="font-pixel absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#0A2540] text-base text-[#F1C40F] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          style={{ boxShadow: `2px 2px 0 ${accent}` }}
        >
          ×
        </button>

        {badge && (
          <span
            className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
            style={{ boxShadow: `4px 4px 0 ${accent}` }}
          >
            {badge}
          </span>
        )}

        <h3
          id="contact-popup-title"
          className={`text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-3xl ${badge ? "mt-5" : ""}`}
        >
          {title}
          {highlightedTitle && (
            <>
              <br />
              <span style={{ color: accent }}>{highlightedTitle}</span>
            </>
          )}
        </h3>

        {description && (
          <p className="mt-4 text-sm leading-relaxed text-[#0A2540]/80 sm:text-base">
            {description}
          </p>
        )}

        <div className="mt-6 grid gap-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                if (c.gaChannel) trackContactClick(c.gaChannel, "contact_popup")
              }}
              className="font-pixel flex items-center justify-between gap-3 px-4 py-3 text-xs uppercase tracking-widest text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{
                background: c.bg,
                border: "2px solid #0A2540",
                boxShadow: "3px 3px 0 #0A2540",
              }}
            >
              <span>{c.label}</span>
              <span aria-hidden>▶</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
