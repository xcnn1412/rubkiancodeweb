"use client"

// ════════════════════════════════════════════════════════════════════════
// FLOATING CONTACT — popup ลอยอยู่ขวาจอ มีทุกหน้า
// ════════════════════════════════════════════════════════════════════════
// ปุ่มลัดติดต่อ 4 ช่องทาง: LINE · Tel · Facebook · Email
// ─ desktop: pill ยาวพร้อม label ที่ hover เห็นชื่อ
// ─ mobile : แค่ icon ปุ่มกลม ลดขนาดไม่ให้บัง content
// ─ z-50 ทับเหนือ navbar/section ทั้งหมด
// ════════════════════════════════════════════════════════════════════════

import { trackContactClick, type ContactChannel } from "@/lib/analytics"

type Channel = {
  name: string                  // label hover
  href: string                  // link target
  bg: string                    // ปุ่มสี brand
  ring: string                  // pixel shadow accent
  external?: boolean            // เปิด tab ใหม่ไหม
  channel: ContactChannel       // GA event identifier
  icon: React.ReactNode
}

const CHANNELS: Channel[] = [
  {
    name: "LINE @rubkiancode",
    href: "https://lin.ee/ZDaqVzd",
    bg: "#06C755",              // LINE official green
    ring: "#0A2540",
    external: true,
    channel: "line",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.365 9.863c.349 0 .63.285.631.633 0 .349-.282.63-.631.63H17.61v1.125h1.755c.349 0 .63.282.63.631 0 .348-.281.63-.63.631H16.98c-.347 0-.628-.282-.629-.629V8.108c0-.345.282-.63.63-.63h2.384c.349 0 .63.285.63.63 0 .348-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.282.629.63 0 .345-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    ),
  },
  {
    name: "Tel 063-594-4429",
    href: "tel:0635944429",
    bg: "#F39C12",              // orange palette ของไซต์
    ring: "#0A2540",
    channel: "phone",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
      </svg>
    ),
  },
  {
    name: "Facebook rubkiancode",
    href: "https://www.facebook.com/rubkiancode/",
    bg: "#1877F2",              // Facebook official blue
    ring: "#0A2540",
    external: true,
    channel: "facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/>
      </svg>
    ),
  },
  {
    name: "Email rubkiancode@gmail.com",
    href: "mailto:rubkiancode@gmail.com",
    bg: "#0A2540",              // navy ของแบรนด์
    ring: "#F1C40F",
    channel: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
]

export function FloatingContact() {
  return (
    <aside
      aria-label="ช่องทางติดต่อ"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2 sm:right-4"
    >
      <ul className="flex flex-col gap-3">
        {CHANNELS.map((c) => (
          <li key={c.name} className="group relative">
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={c.name}
              onClick={() => trackContactClick(c.channel, "floating")}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:h-12 sm:w-12"
              style={{
                background: c.bg,
                border: `2px solid ${c.ring}`,
                boxShadow: `3px 3px 0 ${c.ring}`,
              }}
            >
              <span className="block h-5 w-5 sm:h-6 sm:w-6">{c.icon}</span>
            </a>
            {/* Tooltip — desktop only, แสดงเมื่อ hover */}
            <span
              aria-hidden="true"
              className="font-pixel pointer-events-none absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 whitespace-nowrap bg-[#0A2540] px-2.5 py-1.5 text-[10px] uppercase tracking-widest text-[#F1C40F] opacity-0 transition-opacity group-hover:opacity-100 lg:inline-block"
              style={{ boxShadow: "3px 3px 0 #F1C40F" }}
            >
              {c.name}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
