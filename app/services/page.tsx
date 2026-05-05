// ════════════════════════════════════════════════════════════════════════
// SERVICES INDEX PAGE — รวมทุก service ของบริษัท
// ════════════════════════════════════════════════════════════════════════
//
// URL: /services
// แสดง:
//   - Hero intro (pixel theme)
//   - 4 Core Services (จาก SERVICES data — featured)
//   - 6 Extra Services (Custom Software, IT Consulting ฯลฯ)
//
// SEO: ItemList JSON-LD สำหรับ rich snippet ของบริการทั้งหมด
// ════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"

import { Navbar } from "@/components/rubkiancode/navbar"
import { ArrowIcon } from "@/components/rubkiancode/icons"
import { SERVICES, getServiceHref, getFeaturedServices, getExtraServices } from "./_data/services"

const KeyServicesSection = dynamic(() =>
  import("@/components/rubkiancode/key-services-section").then((m) => ({ default: m.KeyServicesSection }))
)
const ExtraServicesSection = dynamic(() =>
  import("@/components/rubkiancode/extra-services-section").then((m) => ({ default: m.ExtraServicesSection }))
)
const CtaSection = dynamic(() =>
  import("@/components/rubkiancode/cta-section").then((m) => ({ default: m.CtaSection }))
)
const Footer = dynamic(() =>
  import("@/components/rubkiancode/footer").then((m) => ({ default: m.Footer }))
)

export const metadata: Metadata = {
  title: "บริการทั้งหมด — Marketing System, Office ERP, Lucky Draw, Photobooth | RubKianCode",
  description:
    "รวมทุกบริการพัฒนาซอฟต์แวร์ของ RubKianCode — Marketing System, Office ERP, Lucky Draw, Photobooth Software, Custom Software, IT Consulting, POS, Mobile App สำหรับ SME ไทย เริ่มต้น 35,000 บาท/ปี",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "บริการทั้งหมดของ RubKianCode — Software House SME ไทย",
    description:
      "Marketing System, Office ERP, Lucky Draw, Photobooth, Custom Software ครบวงจรสำหรับ SME — เริ่ม 35,000 บาท/ปี",
    url: "/services",
    type: "website",
    locale: "th_TH",
    siteName: "RubKianCode",
  },
}

// JSON-LD ItemList — บอก search engine ว่าหน้านี้คือ list ของบริการทั้งหมด
const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "บริการทั้งหมดของ RubKianCode",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://rubkiancode.com${getServiceHref(s)}`,
    name: s.title,
    description: s.description,
  })),
}

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#F4EDE0] text-[#0A2540]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />

      <Navbar />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b-[3px] border-[#0A2540] bg-[#0A2540] py-3"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 text-xs text-[#F4EDE0]/70 sm:px-6 lg:px-8">
          <Link href="/" className="font-pixel uppercase hover:text-[#F1C40F]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-pixel uppercase text-[#F1C40F]">Services</span>
        </div>
      </nav>

      {/* Hero intro — pixel-themed */}
      <header className="relative overflow-hidden border-b-[3px] border-[#0A2540] bg-[#FFF8F0]">
        {/* Pixel ★ corners */}
        <span aria-hidden className="font-pixel pointer-events-none absolute left-3 top-3 text-base text-[#0A2540]/25 sm:left-4 sm:top-4 sm:text-lg">★</span>
        <span aria-hidden className="font-pixel pointer-events-none absolute right-3 top-3 text-base text-[#0A2540]/25 sm:right-4 sm:top-4 sm:text-lg">★</span>
        <span aria-hidden className="font-pixel pointer-events-none absolute bottom-3 left-3 text-base text-[#0A2540]/25 sm:bottom-4 sm:left-4 sm:text-lg">★</span>
        <span aria-hidden className="font-pixel pointer-events-none absolute bottom-3 right-3 text-base text-[#0A2540]/25 sm:bottom-4 sm:right-4 sm:text-lg">★</span>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 #E63946" }}
            >
              ★ ALL SERVICES · LV.99
            </span>

            <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] text-[#0A2540] sm:text-5xl lg:text-6xl">
              บริการทั้งหมด
            </h1>

            <span
              aria-hidden
              className="mt-3 block h-1.5 w-28"
              style={{ background: "#F1C40F", boxShadow: "0 3px 0 #0A2540" }}
            />

            <p className="font-pixel mt-5 text-sm uppercase tracking-[0.3em] text-[#0A2540]/85 sm:text-base">
              ▸ Software · System · Hardware
            </p>

            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-[#0A2540] sm:text-lg">
              รวมทุกบริการของ RubKianCode สำหรับ SME ไทย — ตั้งแต่ Marketing System, Office ERP, Lucky Draw, Photobooth Software ไปจนถึง Custom Software และ IT Consulting พร้อมเริ่มงานในไม่กี่สัปดาห์
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #E63946" }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="#core-services"
                className="inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                ดูบริการ
              </a>
            </div>

            {/* Quick stats — 3 ตัวเลขเด่นในรูป pixel pill */}
            <div className="mt-10 flex flex-wrap gap-3">
              <span
                className="font-pixel inline-flex items-center gap-2 bg-white px-4 py-2 text-xs uppercase tracking-wider text-[#0A2540]"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #E63946" }}
              >
                <span className="text-[#E63946]">★</span> {getFeaturedServices().length} CORE SERVICES
              </span>
              <span
                className="font-pixel inline-flex items-center gap-2 bg-white px-4 py-2 text-xs uppercase tracking-wider text-[#0A2540]"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #3498DB" }}
              >
                <span className="text-[#3498DB]">★</span> {getExtraServices().length} EXTRA SERVICES
              </span>
              <span
                className="font-pixel inline-flex items-center gap-2 bg-white px-4 py-2 text-xs uppercase tracking-wider text-[#0A2540]"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #F1C40F" }}
              >
                <span className="text-[#F1C40F]">★</span> เริ่ม ฿35K / ปี
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Anchor target ของปุ่ม "ดูบริการ" ใน hero */}
      <div id="core-services" className="scroll-mt-20" aria-hidden />

      {/* 4 Core Services — ซ่อนปุ่ม "สินค้าทั้งหมด" เพราะอยู่หน้านี้แล้ว */}
      <KeyServicesSection showAllProductsCta={false} />

      {/* 6 Extra Services */}
      <ExtraServicesSection />

      <CtaSection />
      <Footer />
    </main>
  )
}
