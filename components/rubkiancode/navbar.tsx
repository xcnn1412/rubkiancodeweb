"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BrandLogo } from "./icons"

// ใช้ /# prefix สำหรับ section บน homepage — link ทำงานได้จากทุกหน้า
// (จากหน้าอื่นจะ navigate ไป homepage แล้ว scroll ไป section นั้น)
// "บริการ" ผูก path ตรงไปหน้า /services (รวมทุกบริการครบ ไม่ใช่ scroll anchor)
const NAV_ITEMS = [
  { href: "/services", section: "services", label: "บริการ" },
  { href: "/#portfolio", section: "portfolio", label: "ผลงาน" },
  { href: "/#process", section: "process", label: "วิธีทำงาน" },
  { href: "/#why", section: "why", label: "ทำไมต้องเรา" },
  { href: "/#contact", section: "contact", label: "ติดต่อ" },
] as const

export function Navbar() {
  // ขีดเส้นใต้เมนูตัวที่กำลัง scroll ผ่าน — ใช้ React state แทนการ querySelector DOM ตรง ๆ
  const [activeSection, setActiveSection] = useState<string>("")
  const [mobileOpen, setMobileOpen] = useState(false)

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

  // ปิด mobile menu เมื่อ navigate (route change)
  useEffect(() => {
    if (!mobileOpen) return
    // กัน body scroll ตอนเปิด menu
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // ปิด menu ด้วย ESC key
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  return (
    <header
      id="nav"
      className="sticky top-0 z-50 border-b-[3px] border-[#0A2540] bg-[#F4EDE0]/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="RubKianCode หน้าแรก"
          className="flex shrink-0 items-center gap-2.5 text-[#0A2540] transition-transform hover:-translate-y-0.5 sm:gap-3"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center bg-[#f7a700] text-[#0A2540] sm:h-10 sm:w-10"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            <BrandLogo className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <b className="text-sm font-black sm:text-base lg:text-lg">
              rubkian<span className="text-[#E63946]">code</span>
            </b>
            <small className="font-pixelify hidden text-[11px] text-[#0A2540]/60 sm:inline">
              &gt; software_studio.exe
            </small>
          </span>
        </Link>

        {/* Desktop nav */}
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
                  className={`absolute -bottom-1.5 left-0 h-0.75 bg-[#E63946] transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            )
          })}
        </nav>

        {/* Right cluster — CTA + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA — ซ่อน label บน xs ให้เหลือไอคอน, มี label คืนตอน sm+ */}
          <a
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-1.5 bg-[#E63946] px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:px-4 sm:text-xs lg:text-sm"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            <span className="hidden sm:inline">ขอใบเสนอราคา</span>
            <span className="sm:hidden">ติดต่อ</span>
          </a>

          {/* Hamburger — เฉพาะ mobile/tablet */}
          <button
            type="button"
            aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#0A2540] transition-transform hover:-translate-y-0.5 lg:hidden"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="ปิดเมนู"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-15 z-40 bg-[#0A2540]/40 backdrop-blur-sm lg:hidden"
          />
          {/* Panel */}
          <nav
            id="mobile-nav"
            aria-label="Mobile primary"
            className="absolute inset-x-0 top-full z-50 origin-top border-b-[3px] border-[#0A2540] bg-[#F4EDE0] shadow-lg lg:hidden"
            style={{
              boxShadow: "0 8px 0 -3px #0A2540, 0 12px 24px rgba(10,37,64,0.15)",
            }}
          >
            <ul className="flex flex-col gap-1 p-4 sm:p-5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.section
                return (
                  <li key={item.section}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between gap-3 px-4 py-3 text-base font-bold uppercase tracking-wide transition-transform hover:-translate-x-0.5 ${
                        isActive
                          ? "bg-[#E63946] text-white"
                          : "bg-white text-[#0A2540]"
                      }`}
                      style={{
                        border: "2px solid #0A2540",
                        boxShadow: isActive ? "3px 3px 0 #0A2540" : "2px 2px 0 #0A2540",
                      }}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`font-pixel text-xs ${
                          isActive ? "text-[#F1C40F]" : "text-[#0A2540]/40"
                        }`}
                      >
                        ▶
                      </span>
                    </a>
                  </li>
                )
              })}

              {/* Mobile CTA — เน้นกว่าเดิม */}
              <li className="mt-3 pt-3" style={{ borderTop: "2px dashed #0A2540" }}>
                <a
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#E63946] px-4 py-3 text-sm font-black uppercase tracking-wider text-white"
                  style={{ border: "3px solid #0A2540", boxShadow: "4px 4px 0 #0A2540" }}
                >
                  ★ ขอใบเสนอราคา ★
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}

/* ── Pixel-art icons ── */
function HamburgerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="pixel-svg h-5 w-5" fill="currentColor">
      <rect x="2" y="3" width="12" height="2" />
      <rect x="2" y="7" width="12" height="2" />
      <rect x="2" y="11" width="12" height="2" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="pixel-svg h-5 w-5" fill="currentColor">
      <rect x="3" y="3" width="2" height="2" />
      <rect x="5" y="5" width="2" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="9" y="5" width="2" height="2" />
      <rect x="11" y="3" width="2" height="2" />
      <rect x="9" y="9" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
      <rect x="5" y="9" width="2" height="2" />
      <rect x="3" y="11" width="2" height="2" />
    </svg>
  )
}
