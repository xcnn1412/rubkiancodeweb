"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle, ChevronDown, Globe } from "lucide-react"
import { useLanguage, LANG_OPTIONS } from "@/lib/language-context"
import { useTranslations } from "next-intl"
import { useExitTransition } from "@/providers/exit-transition-provider"

export interface NavLinkItem {
  href: string
  labelKey: string
}

export interface NavbarProps {
  namespace?: string
  brandHref?: string
  navItems?: NavLinkItem[]
}

const DEFAULT_NAV_ITEMS: NavLinkItem[] = [
  { href: "#showcase", labelKey: "nav_rental" },
  { href: "#services", labelKey: "nav_software" },
  { href: "#photobooth", labelKey: "nav_photobooth" },
  { href: "#contact", labelKey: "nav_contact" },
]

export function Navbar({
  namespace = "navbar",
  brandHref = "/",
  navItems = DEFAULT_NAV_ITEMS,
}: NavbarProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { lang, setLang, isTranslating, currentLangOption } = useLanguage()
  const t = useTranslations(namespace)
  const langRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = useExitTransition()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = navItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }))

  const handleLineContact = () => {
    triggerTransition('https://lin.ee/ZDaqVzd', 'line')
    setIsMenuOpen(false)
  }

  const handleSelectLang = (code: typeof lang) => {
    setLang(code)
    setIsLangOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: '#cddce9', borderBottom: '3px solid #8a99b1', boxShadow: '0 3px 0px #7e7f7f' }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Brand */}
          <Link href={brandHref} className="flex items-center gap-1 flex-shrink-0">
            <span className="font-mono text-base font-black" style={{ color: '#7e7f7f' }}>【</span>
            <span
              className="font-black text-sm sm:text-lg uppercase leading-tight max-w-[160px] sm:max-w-none truncate"
              style={{
                color: '#1a0e00',
                fontFamily: 'var(--font-prompt), Prompt, sans-serif',
                letterSpacing: currentLangOption.isNonLatin ? '0.04em' : '0',
              }}
            >
              {t("brand")}
            </span>
            <span className="font-mono text-base font-black" style={{ color: '#7e7f7f' }}>】</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase px-2.5 py-1.5 transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px] whitespace-nowrap"
                style={{ color: '#1a0e00', border: '2px solid transparent', borderRadius: '10px' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = '2px solid #1a0e00'
                    ; (e.currentTarget as HTMLElement).style.background = 'rgba(26,14,0,0.1)'
                    ; (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 #1a0e00'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '2px solid transparent'
                    ; (e.currentTarget as HTMLElement).style.background = 'transparent'
                    ; (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right: Lang Dropdown + CTA */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 font-black px-3 py-2 transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px]"
                style={{
                  background: isLangOpen ? '#1a0e00' : 'rgba(26,14,0,0.12)',
                  color: isLangOpen ? '#f3f84a' : '#1a0e00',
                  border: '2px solid #1a0e00',
                  borderRadius: '999px',
                  boxShadow: '3px 3px 0px #1a0e00',
                  fontSize: '0.75rem',
                  minWidth: '80px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #1a0e00' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0px #1a0e00' }}
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="flex-1 text-center">
                  {isTranslating ? (
                    <span className="animate-pulse">{currentLangOption.flag} {currentLangOption.short}</span>
                  ) : (
                    <>{currentLangOption.flag} {currentLangOption.short}</>
                  )}
                </span>
                <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown panel */}
              {isLangOpen && (
                <div
                  className="absolute top-full right-0 mt-2 z-50 p-2"
                  style={{
                    background: '#93c8cf',
                    border: '3px solid #1a0e00',
                    boxShadow: '6px 6px 0px #1a0e00',
                    borderRadius: '16px',
                    minWidth: '220px',
                  }}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {LANG_OPTIONS.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => handleSelectLang(opt.code)}
                        className="flex items-center gap-2 px-3 py-2 text-left transition-all duration-100"
                        style={{
                          background: lang === opt.code ? '#1a0e00' : 'transparent',
                          color: lang === opt.code ? '#f3f84a' : '#1a0e00',
                          border: lang === opt.code ? '2px solid #f3f84a' : '2px solid transparent',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                        onMouseEnter={e => {
                          if (lang !== opt.code) {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(26,14,0,0.15)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (lang !== opt.code) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent'
                          }
                        }}
                      >
                        <span className="text-base leading-none">{opt.flag}</span>
                        <span className="truncate">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleLineContact}
              className="btn-shimmer font-black uppercase px-4 py-2.5 transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px] whitespace-nowrap"
              style={{
                background: '#f4e6af',
                color: '#1a0e00',
                border: '3px solid #1a0e00',
                boxShadow: '4px 4px 0px #1a0e00',
                fontSize: '0.8rem',
                borderRadius: '999px',
                letterSpacing: currentLangOption.isNonLatin ? '0.05em' : '0.025em',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #1a0e00' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #1a0e00' }}
            >
              <span className="shimmer-light" />
              <MessageCircle className="inline mr-1.5 w-4 h-4" />
              {t("cta")}
            </button>
          </div>

          {/* Mobile: Lang + Hamburger */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <div ref={undefined} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 font-black px-2.5 py-2 transition-all duration-150"
                style={{
                  background: isLangOpen ? '#1a0e00' : 'transparent',
                  color: isLangOpen ? '#f3f84a' : '#1a0e00',
                  border: '2px solid #1a0e00',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                }}
              >
                <span>{currentLangOption.flag}</span>
                <span>{currentLangOption.short}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div
                  className="absolute top-full right-0 mt-2 z-50 p-2"
                  style={{
                    background: '#93c8cf',
                    border: '3px solid #1a0e00',
                    boxShadow: '6px 6px 0px #1a0e00',
                    borderRadius: '16px',
                    width: '200px',
                  }}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {LANG_OPTIONS.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => handleSelectLang(opt.code)}
                        className="flex items-center gap-2 px-2 py-1.5 text-left transition-all duration-100"
                        style={{
                          background: lang === opt.code ? '#1a0e00' : 'transparent',
                          color: lang === opt.code ? '#f3f84a' : '#1a0e00',
                          border: lang === opt.code ? '2px solid #f3f84a' : '2px solid transparent',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                        }}
                      >
                        <span>{opt.flag}</span>
                        <span className="truncate">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="p-2 font-black transition-colors"
              style={{ color: '#1a0e00', border: '2px solid #1a0e00', background: 'transparent', borderRadius: '10px' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden absolute top-[80px] left-0 right-0 z-50"
          style={{
            background: '#93c8cf',
            borderTop: '3px solid #f3f84a',
            borderBottom: '3px solid #f3f84a',
            boxShadow: '0 8px 0px #7a5010',
          }}
        >
          <div className="px-6 py-5 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-black uppercase py-2 border-b-2 border-[#1a0e00]/20"
                style={{ color: '#1a0e00' }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span style={{ color: '#7a5010' }} className="font-mono mr-2">▶</span>
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLineContact}
              className="btn-shimmer w-full h-12 text-base font-black uppercase tracking-wider transition-all duration-150 mt-2"
              style={{
                background: '#f3f84a',
                color: '#1a0e00',
                border: '3px solid #1a0e00',
                boxShadow: '4px 4px 0px #1a0e00',
                borderRadius: '999px',
              }}
            >
              <span className="shimmer-light" />
              <MessageCircle className="inline mr-2 w-4 h-4" />
              {t("cta")}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
