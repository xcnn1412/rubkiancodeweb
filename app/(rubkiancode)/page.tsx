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
  title: "RubKianCode — รับเขียนซอฟต์แวร์ SME ไทย เริ่มต้น 35,000 บาท/ปี",
  description:
    "บริษัท รับเขียนโค้ด จำกัด — รับพัฒนาซอฟต์แวร์ครบวงจรสำหรับ SME ไทย: Marketing System, Office ERP, Lucky Draw และ Photobooth Software เริ่ม 35,000 บาท/ปี จดทะเบียนพาณิชย์ถูกต้อง ตรวจสอบได้",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RubKianCode — รับเขียนซอฟต์แวร์ SME ไทย",
    description:
      "Marketing System, Office ERP, Lucky Draw, Photobooth Software ครบวงจร — เริ่มต้น 35,000 บาท/ปี",
    url: "/",
    type: "website",
    locale: "th_TH",
    siteName: "RubKianCode",
  },
}

// Website + ItemList JSON-LD — สำหรับ rich snippet ของบริการทั้ง 4
const HOMEPAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://rubkiancode.com/#website",
      url: "https://rubkiancode.com",
      name: "RubKianCode",
      description: "รับเขียนซอฟต์แวร์ SME ไทย เริ่มต้น 35,000 บาท/ปี",
      inLanguage: "th-TH",
      publisher: { "@id": "https://rubkiancode.com/#organization" },
    },
    {
      "@type": "ItemList",
      "@id": "https://rubkiancode.com/#services",
      name: "บริการหลักของ RubKianCode",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Marketing System",  url: "https://rubkiancode.com/services/marketing-system" },
        { "@type": "ListItem", position: 2, name: "Office ERP",        url: "https://rubkiancode.com/services/office-erp" },
        { "@type": "ListItem", position: 3, name: "Lucky Draw",        url: "https://rubkiancode.com/services/lucky-draw" },
        { "@type": "ListItem", position: 4, name: "Photobooth Software", url: "https://rubkiancode.com/services/photoboothsoftware" },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4EDE0] text-[#0A2540]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_JSON_LD) }}
      />
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
