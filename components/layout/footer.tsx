"use client"

import Link from "next/link"
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useExitTransition } from "@/providers/exit-transition-provider"

export interface FooterNavItem {
  href: string
  labelKey: string
}

export interface FooterProps {
  navbarNamespace?: string
  footerNamespace?: string
  brandHref?: string
  navItems?: FooterNavItem[]
}

const DEFAULT_FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { href: "#showcase", labelKey: "nav_rental" },
  { href: "#services", labelKey: "nav_software" },
  { href: "#photobooth", labelKey: "nav_photobooth" },
  { href: "#contact", labelKey: "nav_contact" },
]

export function Footer({
  navbarNamespace = "navbar",
  footerNamespace = "footer",
  brandHref = "/",
  navItems = DEFAULT_FOOTER_NAV_ITEMS,
}: FooterProps = {}) {
  const tNavbar = useTranslations(navbarNamespace)
  const tFooter = useTranslations(footerNamespace)
  const { triggerTransition } = useExitTransition()

  const navLinks = navItems.map((item) => ({
    href: item.href,
    label: tNavbar(item.labelKey),
  }))

  const contactLinks = [
    { icon: Mail,          label: "rubkiancode@gmail.com", href: "mailto:rubkiancode@gmail.com",              linkType: 'email'    as const },
    { icon: Phone,         label: "063-594-4429",          href: "tel:063-594-4429",                           linkType: 'tel'      as const },
    { icon: MessageCircle, label: "@rubkiancode",           href: "https://lin.ee/ZDaqVzd",                   linkType: 'line'     as const },
    { icon: MapPin,        label: tFooter("bangkok"),       href: "https://maps.app.goo.gl/CunTwgBaAkmhZ3Gg9", linkType: 'maps'     as const },
  ]

  return (
    <footer className="relative overflow-hidden" style={{ background: '#cddce9' }}>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-[4]" style={{ background: '#8a99b1', boxShadow: '0 0 12px #7e7f7f' }} />

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse, rgba(243,248,74,0.08), transparent)' }} />

      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={brandHref} className="inline-flex items-center gap-1 mb-5 group">
              <span className="font-mono text-xl font-black" style={{ color: '#1a0e00' }}>【</span>
              <span
                className="font-black text-lg uppercase"
                style={{
                  color: '#1a0e00',
                  textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-prompt), Prompt, sans-serif',
                }}
              >
                {tFooter("brand")}
              </span>
              <span className="font-mono text-xl font-black" style={{ color: '#1a0e00' }}>】</span>
            </Link>
            <p className="font-medium text-sm leading-relaxed mb-5 max-w-xs" style={{ color: 'rgba(26,14,0,0.7)' }}>
              {tFooter("description")}
            </p>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{
                background: 'rgba(26,14,0,0.05)',
                border: '2px solid rgba(26,14,0,0.2)',
                boxShadow: '3px 3px 0 rgba(26,14,0,0.15)',
                borderRadius: '999px',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: 'rgba(26,14,0,0.7)' }}>
                {tFooter("online_status")}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-mono font-black uppercase tracking-[0.3em] mb-5"
              style={{ color: '#1a0e00' }}
            >
              // {tFooter("services_heading")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: 'rgba(26,14,0,0.6)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c8900a' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,14,0,0.6)' }}
                  >
                    <span className="font-mono font-black text-xs" style={{ color: 'rgba(26,14,0,0.3)' }}>▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-mono font-black uppercase tracking-[0.3em] mb-5"
              style={{ color: '#1a0e00' }}
            >
              // {tFooter("contact_heading")}
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.linkType === 'tel' ? item.href : '#'}
                    className="flex items-center gap-3 text-sm font-bold transition-colors duration-200 group"
                    style={{ color: 'rgba(26,14,0,0.6)' }}
                    onClick={item.linkType !== 'tel' ? (e) => {
                      e.preventDefault()
                      triggerTransition(item.href, item.linkType)
                    } : undefined}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c8900a' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,14,0,0.6)' }}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(26,14,0,0.4)' }} />
                    <span className="font-mono">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '2px solid rgba(26,14,0,0.15)' }}
        >
          <p className="text-xs font-mono font-bold" style={{ color: 'rgba(26,14,0,0.5)' }}>
            © 2026 {tFooter("copyright_brand")} — {tFooter("copyright_rights")}.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs font-mono font-bold transition-colors" style={{ color: 'rgba(26,14,0,0.5)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c8900a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,14,0,0.5)' }}
            >
              {tFooter("privacy_policy")}
            </Link>
            <Link href="#" className="text-xs font-mono font-bold transition-colors" style={{ color: 'rgba(26,14,0,0.5)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c8900a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,14,0,0.5)' }}
            >
              {tFooter("terms_of_service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
