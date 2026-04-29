import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ShowcaseSection />
      <PhotoboothResultsSection />
      <ServicesSection />
      <PhotoboothSection />
      <ContactBannerSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
