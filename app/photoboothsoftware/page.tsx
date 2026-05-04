import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { PHOTOBOOTH_NAV_ITEMS } from "./_config/nav-items"

// ── Below-the-fold sections — dynamically imported to reduce initial JS bundle ──
const ShowcaseSection = dynamic(
  () => import("@/components/sections/showcase-section").then((m) => ({ default: m.ShowcaseSection }))
)
const PhotoboothResultsSection = dynamic(
  () => import("@/components/photobooth/photobooth-results-section").then((m) => ({ default: m.PhotoboothResultsSection }))
)
const ServicesSection = dynamic(
  () => import("@/components/sections/services-section").then((m) => ({ default: m.ServicesSection }))
)
const PhotoboothSection = dynamic(
  () => import("@/components/photobooth/photobooth-section").then((m) => ({ default: m.PhotoboothSection }))
)
const ContactBannerSection = dynamic(
  () => import("@/components/sections/contact-banner-section").then((m) => ({ default: m.ContactBannerSection }))
)
const ContactSection = dynamic(
  () => import("@/components/sections/contact-section").then((m) => ({ default: m.ContactSection }))
)
const Footer = dynamic(
  () => import("@/components/layout/footer").then((m) => ({ default: m.Footer }))
)

export const metadata: Metadata = {
  title: "ระบบซอฟต์แวร์โฟโต้บูธ — Photobooth Software Thailand | RubKianCode",
  description:
    "บริษัท Rub Kian Code Co.,Ltd. รับผลิต ให้เช่า และปรึกษาการทำซอฟต์แวร์โฟโต้บูธ พร้อมตู้ถ่ายรูปสไตล์เกาหลี รองรับงาน Event ทุกขนาด",
  alternates: { canonical: "/photoboothsoftware" },
  openGraph: {
    title: "ระบบซอฟต์แวร์โฟโต้บูธ — Photobooth Software Thailand",
    description:
      "ระบบโฟโต้บูธพร้อมซอฟต์แวร์เฉพาะทาง รองรับงาน Event ทุกขนาด พร้อมทีมงานดูแลตลอดงาน",
    url: "/photoboothsoftware",
    type: "website",
  },
}

export default function PhotoboothSoftwarePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar
        namespace="navbar"
        brandHref="/photoboothsoftware"
        navItems={PHOTOBOOTH_NAV_ITEMS}
      />
      <HeroSection namespace="hero" />
      <ShowcaseSection namespace="showcase" />
      <PhotoboothResultsSection />
      <ServicesSection namespace="services" />
      <PhotoboothSection namespace="photobooth" />
      <ContactBannerSection namespace="contact_banner" />
      <ContactSection namespace="contact" />
      <Footer
        navbarNamespace="navbar"
        footerNamespace="footer"
        brandHref="/photoboothsoftware"
        navItems={PHOTOBOOTH_NAV_ITEMS}
      />
    </main>
  )
}
