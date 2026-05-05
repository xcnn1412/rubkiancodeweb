"use client"

import { useEffect, useState } from "react"
import { BrandLogo } from "./icons"

const NAV_ITEMS = [
  { href: "#services", section: "services", label: "บริการ" },
  { href: "#portfolio", section: "portfolio", label: "ผลงาน" },
  { href: "#process", section: "process", label: "วิธีทำงาน" },
  { href: "#why", section: "why", label: "ทำไมต้องเรา" },
  { href: "#contact", section: "contact", label: "ติดต่อ" },
] as const

export function Navbar() {
  // ขีดเส้นใต้เมนูตัวที่กำลัง scroll ผ่าน — ใช้ React state แทนการ querySelector DOM ตรง ๆ
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const ANCHOR_OFFSET = 140

    const onScroll = () => {
      let active = ""
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.section)
        if (!el) continue
        if (el.getBoundingClientRect().top - ANCHOR_OFFSET <= 0) {
          active = item.section
        }
      }
      setActiveSection(active)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      id="nav"
      className="sticky top-0 z-50 border-b-[3px] border-[#0A2540] bg-[#F4EDE0]/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="RubKianCode หน้าแรก"
          className="flex items-center gap-3 text-[#0A2540] transition-transform hover:-translate-y-0.5"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center bg-[#f7a700] text-[#0A2540]"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            <BrandLogo className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <b className="text-base font-black sm:text-lg">
              rubkian<span className="text-[#E63946]">code</span>
            </b>
            <small className="font-pixelify text-[11px] text-[#0A2540]/60">
              &gt; software_studio.exe
            </small>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.section
            return (
              <a
                key={item.section}
                href={item.href}
                className={`relative text-sm font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "text-[#E63946]" : "text-[#0A2540] hover:text-[#E63946]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[3px] bg-[#E63946] transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#E63946] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm"
            style={{ border: "2px solid #0A2540", boxShadow: "4px 4px 0 #0A2540" }}
          >
            ขอใบเสนอราคา
          </a>
        </div>
      </div>
    </header>
  )
}
