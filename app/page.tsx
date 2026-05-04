import dynamic from "next/dynamic"
import { Navbar, type NavLinkItem } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

// ── Below-the-fold sections — dynamically imported to reduce initial JS bundle ──
const ShowcaseSection = dynamic(
  () => import("@/components/showcase-section").then((m) => ({ default: m.ShowcaseSection }))
)
const PhotoboothResultsSection = dynamic(
  () => import("@/components/photobooth-results-section").then((m) => ({ default: m.PhotoboothResultsSection }))
)
const ServicesSection = dynamic(
  () => import("@/components/services-section").then((m) => ({ default: m.ServicesSection }))
)
const PhotoboothSection = dynamic(
  () => import("@/components/photobooth-section").then((m) => ({ default: m.PhotoboothSection }))
)
const ContactBannerSection = dynamic(
  () => import("@/components/contact-banner-section").then((m) => ({ default: m.ContactBannerSection }))
)
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((m) => ({ default: m.ContactSection }))
)
const Footer = dynamic(
  () => import("@/components/footer").then((m) => ({ default: m.Footer }))
)

const RUBKIANCODE_NAV_ITEMS: NavLinkItem[] = [
  { href: "#showcase", labelKey: "nav_portfolio" },
  { href: "#services", labelKey: "nav_services" },
  { href: "#photobooth", labelKey: "nav_product" },
  { href: "#contact", labelKey: "nav_contact" },
]

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
