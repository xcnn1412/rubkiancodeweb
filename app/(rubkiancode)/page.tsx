import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { RUBKIANCODE_NAV_ITEMS } from "./_config/nav-items"

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
  title: "RubKianCode — รับเขียนโค้ด พัฒนาซอฟต์แวร์ เว็บไซต์ และแอปพลิเคชัน",
  description:
    "RubKianCode รับเขียนโค้ด พัฒนาซอฟต์แวร์ เว็บไซต์ แอปมือถือ และระบบเฉพาะทาง ครบวงจรตั้งแต่ออกแบบ พัฒนา ทดสอบ ถึงดูแลหลังส่งมอบ",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RubKianCode — รับเขียนโค้ด พัฒนาซอฟต์แวร์ครบวงจร",
    description:
      "ทีมนักพัฒนาคุณภาพ รับงาน Custom Software, Web App, Mobile App และ AI Integration",
    url: "/",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar
        namespace="rubkiancode_navbar"
        brandHref="/"
        navItems={RUBKIANCODE_NAV_ITEMS}
      />
      <HeroSection namespace="rubkiancode_hero" />
      <ShowcaseSection namespace="rubkiancode_showcase" />
      <PhotoboothResultsSection />
      <ServicesSection namespace="rubkiancode_services" />
      <PhotoboothSection namespace="rubkiancode_photobooth" />
      <ContactBannerSection namespace="rubkiancode_contact_banner" />
      <ContactSection namespace="rubkiancode_contact" />
      <Footer
        navbarNamespace="rubkiancode_navbar"
        footerNamespace="rubkiancode_footer"
        brandHref="/"
        navItems={RUBKIANCODE_NAV_ITEMS}
      />
    </main>
  )
}
