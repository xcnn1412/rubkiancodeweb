import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/rubkiancode/navbar"
import { HeroSection } from "@/components/rubkiancode/hero-section"
import { MarqueeSection } from "@/components/rubkiancode/marquee-section"

// ── Below-the-fold sections — dynamic import เพื่อลด initial JS bundle ──
const KeyServicesSection = dynamic(
  () => import("@/components/rubkiancode/key-services-section").then((m) => ({ default: m.KeyServicesSection }))
)
const ExtraServicesSection = dynamic(
  () => import("@/components/rubkiancode/extra-services-section").then((m) => ({ default: m.ExtraServicesSection }))
)
const PortfolioSection = dynamic(
  () => import("@/components/rubkiancode/portfolio-section").then((m) => ({ default: m.PortfolioSection }))
)
const ProcessSection = dynamic(
  () => import("@/components/rubkiancode/process-section").then((m) => ({ default: m.ProcessSection }))
)
const WhyUsSection = dynamic(
  () => import("@/components/rubkiancode/why-us-section").then((m) => ({ default: m.WhyUsSection }))
)
const TrustSection = dynamic(
  () => import("@/components/rubkiancode/trust-section").then((m) => ({ default: m.TrustSection }))
)
const FaqSection = dynamic(
  () => import("@/components/rubkiancode/faq-section").then((m) => ({ default: m.FaqSection }))
)
const CtaSection = dynamic(
  () => import("@/components/rubkiancode/cta-section").then((m) => ({ default: m.CtaSection }))
)
const ContactSection = dynamic(
  () => import("@/components/rubkiancode/contact-section").then((m) => ({ default: m.ContactSection }))
)
const Footer = dynamic(
  () => import("@/components/rubkiancode/footer").then((m) => ({ default: m.Footer }))
)

export const metadata: Metadata = {
  title: "RubKianCode — รับเขียนโค้ด พัฒนาซอฟต์แวร์ เว็บไซต์ และแอปพลิเคชัน",
  description:
    "RubKianCode รับเขียนโค้ด พัฒนาซอฟต์แวร์ เว็บไซต์ แอปมือถือ และระบบเฉพาะทาง ครบวงจรตั้งแต่ออกแบบ พัฒนา ทดสอบ ถึงดูแลหลังส่งมอบ",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RubKianCode — รับเขียนโค้ด พัฒนาซอฟต์แวร์ครบวงจร",
    description:
      "ทีมนักพัฒนาคุณภาพ รับงาน Marketing System, Office ERP, Lucky Draw และ Custom Software",
    url: "/",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4EDE0] text-[#0A2540]">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <KeyServicesSection />
      <ExtraServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <WhyUsSection />
      <TrustSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
