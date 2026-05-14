"use client"

import { useState } from "react"
import { SectionHead } from "./key-services-section"

type Channel = {
  href: string
  iconBg: string
  icon: React.ReactNode
  label: string
  value: string
  note: string
}

const CHANNELS: Channel[] = [
  {
    href: "https://lin.ee/ZDaqVzd",
    iconBg: "#2ECC71",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="white">
        <rect x="2" y="2" width="12" height="10" />
        <rect x="4" y="12" width="2" height="2" />
      </svg>
    ),
    label: "LINE OFFICIAL",
    value: "@rubkiancode",
    note: "ตอบกลับภายใน 1 ชม. (เวลาทำการ)",
  },
  {
    href: "tel:0635944429",
    iconBg: "#E63946",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="white">
        <rect x="3" y="3" width="4" height="4" />
        <rect x="3" y="9" width="2" height="4" />
        <rect x="5" y="11" width="6" height="2" />
        <rect x="11" y="9" width="2" height="4" />
        <rect x="9" y="3" width="4" height="4" />
        <rect x="7" y="7" width="2" height="2" />
      </svg>
    ),
    label: "โทรศัพท์",
    value: "063-594-4429",
    note: "จันทร์–ศุกร์ · 10:00–19:00 น.",
  },
  {
    href: "mailto:rubkiancode@gmail.com",
    iconBg: "#3498DB",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="white">
        <rect x="2" y="4" width="12" height="8" />
        <rect x="2" y="4" width="2" height="2" fill="#0A2540" />
        <rect x="12" y="4" width="2" height="2" fill="#0A2540" />
        <rect x="6" y="6" width="4" height="2" fill="#0A2540" />
      </svg>
    ),
    label: "อีเมล",
    value: "rubkiancode@gmail.com",
    note: "ตอบกลับภายใน 24 ชม.",
  },
  {
    href: "#",
    iconBg: "#F1C40F",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="#0A2540">
        <rect x="6" y="2" width="4" height="2" />
        <rect x="4" y="4" width="8" height="6" />
        <rect x="6" y="10" width="4" height="3" />
        <rect x="7" y="13" width="2" height="2" />
      </svg>
    ),
    label: "ที่อยู่ออฟฟิศ",
    value: "กรุงเทพมหานคร",
    note: "รับงานทั่วประเทศไทย",
  },
]

const SERVICE_OPTIONS = [
  "ระบบการตลาด · Marketing System",
  "ระบบภายในออฟฟิศ · Office ERP",
  "ระบบ Lucky Draw สำหรับ Event",
  "Custom Software อื่น ๆ",
  "ขอคำปรึกษา · IT Consulting",
] as const

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-[#F4EDE0] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="CONTACT · INSERT_COIN"
          heading={
            <>
              ติดต่อทีมงาน
              <br />
              พร้อมรับฟังคุณ
            </>
          }
          description="เลือกช่องทางที่สะดวกที่สุด — LINE Official ตอบไวสุดในเวลาทำการ ส่งฟอร์มแล้วเราติดต่อกลับภายใน 24 ชม."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          {/* คอลัมน์ซ้าย — ช่องทางติดต่อ */}
          <div className="space-y-4">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 bg-white p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center"
                  style={{
                    background: c.iconBg,
                    border: "2px solid #0A2540",
                    boxShadow: "3px 3px 0 #0A2540",
                  }}
                >
                  {c.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-pixel block text-[10px] uppercase tracking-widest text-[#0A2540]/60">
                    {c.label}
                  </span>
                  <span className="block truncate text-base font-black text-[#0A2540]">
                    {c.value}
                  </span>
                  <span className="block text-xs text-[#0A2540]/70">{c.note}</span>
                </div>
              </a>
            ))}
          </div>

          {/* คอลัมน์ขวา — ฟอร์ม */}
          <div
            className="overflow-hidden bg-white"
            style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #E63946" }}
          >
            <div className="flex items-center justify-between gap-3 bg-[#F1C40F] px-3 py-2">
              <span className="flex gap-1.5">
                <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
              </span>
              <span className="font-pixel text-[9px] uppercase text-[#0A2540]">CONTACT_FORM.EXE</span>
              <span className="font-pixel text-[9px] uppercase text-[#0A2540]">ONLINE</span>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-black uppercase text-[#0A2540]">ส่งโจทย์มาให้เรา</h3>
              <p className="mt-2 text-sm text-[#0A2540]/70">
                กรอกข้อมูล ทีมงานจะติดต่อกลับพร้อม Scope &amp; Quote เบื้องต้น ภายใน 1 วันทำการ
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="f-name" label="ชื่อ–นามสกุล" required placeholder="สมชาย ใจดี" />
                  <Field id="f-company" label="บริษัท" placeholder="ABC Co., Ltd." />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="f-email" label="อีเมล" type="email" required placeholder="you@example.com" />
                  <Field id="f-phone" label="เบอร์โทร" type="tel" placeholder="08x-xxx-xxxx" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="f-svc" className="block text-xs font-bold uppercase tracking-wider text-[#0A2540]">
                    บริการที่สนใจ
                  </label>
                  <select
                    id="f-svc"
                    defaultValue={SERVICE_OPTIONS[0]}
                    className="w-full bg-[#F4EDE0] px-3 py-3 text-sm text-[#0A2540] outline-none focus:bg-white"
                    style={{ border: "2px solid #0A2540" }}
                  >
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="f-msg" className="block text-xs font-bold uppercase tracking-wider text-[#0A2540]">
                    รายละเอียดโปรเจกต์
                  </label>
                  <textarea
                    id="f-msg"
                    required
                    rows={5}
                    placeholder="เล่าเป้าหมาย ขนาดทีม งบประมาณคร่าว ๆ และระยะเวลาที่อยากเสร็จ"
                    className="w-full bg-[#F4EDE0] px-3 py-3 text-sm text-[#0A2540] outline-none focus:bg-white"
                    style={{ border: "2px solid #0A2540" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="font-pixel block w-full px-6 py-4 text-xs uppercase tracking-widest text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:translate-x-0 disabled:translate-y-0 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                  style={{
                    background: submitted ? "#2ECC71" : "#E63946",
                    border: "3px solid #0A2540",
                    boxShadow: "5px 5px 0 #0A2540",
                    color: submitted ? "#0A2540" : "white",
                  }}
                >
                  {submitted ? "✔ ส่งสำเร็จ — ขอบคุณครับ" : "▶ ส่งข้อความเลย"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-[#0A2540]">
        {label}
        {required && <span className="ml-1 text-[#E63946]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#F4EDE0] px-3 py-3 text-sm text-[#0A2540] outline-none placeholder:text-[#0A2540]/40 focus:bg-white"
        style={{ border: "2px solid #0A2540" }}
      />
    </div>
  )
}
