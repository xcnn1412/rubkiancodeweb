// ════════════════════════════════════════════════════════════════════════
// CENTRAL SERVICES DATA — single source of truth สำหรับทุก service ของบริษัท
// ════════════════════════════════════════════════════════════════════════
//
// 🚀 วิธีเพิ่ม service ใหม่ (scale up):
//   1. เพิ่ม entry ใน array `SERVICES` ด้านล่าง (ตั้ง slug ที่ unique)
//   2. ตอนเปิด `/services/{slug}` ระบบจะ build detail page อัตโนมัติ
//   3. ถ้าอยากให้ขึ้น homepage ด้วย ใส่ flag `featured: true`
//   4. ไม่ต้องแก้ไฟล์ routing/UI อื่น ๆ — central data อ่านได้ทุกที่
//
// 🗂  ภายหลังถ้า product เยอะมาก (>20) อาจแยกเป็นหลายไฟล์:
//   _data/services.marketing.tsx, _data/services.event.tsx
//   แล้ว re-export จาก index.ts รวมกัน
// ════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react"

export type Service = {
  slug: string                  // URL path: /services/{slug}
  num: string                   // ลำดับโชว์บนการ์ด — "01", "02"...
  title: string                 // ชื่อภาษาไทย
  subtitle: string              // ภาษาอังกฤษ/รอง
  description: string           // ความยาว ~2 บรรทัด ใช้ทั้ง card + detail hero
  features: string[]            // bullet หลัก ของบริการ
  duration: string              // ระยะเวลาส่งมอบ
  startingPrice?: string        // ราคาเริ่มต้น (optional)
  accent: string                // hex color ของ theme service นี้
  featured: boolean             // true = ขึ้นการ์ดบน homepage
  customPage?: boolean          // true = มี static page ของตัวเองที่ /services/{slug}/page.tsx
                                //        (ไม่ต้องให้ [slug] dynamic route generate ทับ)
  meta: {
    title: string               // <title> ของ detail page
    description: string         // <meta description>
  }
  art: ReactNode                // pixel art illustration
}

// ════════════════════════════════════════════════════════════════════════
// SERVICES — เรียงตามลำดับความสำคัญ
// ════════════════════════════════════════════════════════════════════════

export const SERVICES: Service[] = [
  {
    slug: "marketing-system",
    num: "01",
    title: "ระบบการตลาด",
    subtitle: "Marketing System",
    description:
      "เพิ่มยอดขายและลูกค้ากลับมาซ้ำ ด้วยระบบที่วัดผลได้ทุกบาท ตั้งแต่ Landing, CRM, Email/LINE Automation จนถึง Dashboard รวม",
    features: [
      "Marketing Automation (LINE OA · Email)",
      "Multi-touch Attribution Dashboard",
      "Customer Data Platform",
      "A/B Testing & Conversion Tracking",
      "Lead scoring · Segmentation",
      "เชื่อม Facebook · Google · TikTok Ads",
    ],
    duration: "เริ่มต้น 4 สัปดาห์",
    startingPrice: "180,000 บาท",
    accent: "#E63946",
    featured: true,
    meta: {
      title: "ระบบการตลาด — Marketing System | RubKianCode",
      description:
        "ระบบการตลาดครบวงจร — Marketing Automation, CRM, Multi-touch Attribution พร้อม Dashboard วัดผลแบบ Real-time",
    },
    art: <MarketingArt />,
  },
  {
    slug: "office-erp",
    num: "02",
    title: "ระบบภายในออฟฟิศ",
    subtitle: "Office ERP",
    description:
      "รวมงานหลังบ้านทุกแผนกไว้ในระบบเดียว ลดงานซ้ำซ้อน ลดเอกสารกระดาษ — ทำให้ทีมตัดสินใจจากข้อมูลจริง ไม่ใช่ความรู้สึก",
    features: [
      "HR · Payroll · Leave · OT",
      "Inventory & Multi-warehouse",
      "Accounting · ภาษี ภงด./ภพ.30",
      "Approval Workflow & e-Document",
      "Sales · CRM · Quotation",
      "Report & BI Dashboard",
    ],
    duration: "เริ่มต้น 12 สัปดาห์",
    startingPrice: "480,000 บาท",
    accent: "#3498DB",
    featured: true,
    meta: {
      title: "ระบบภายในออฟฟิศ — Office ERP | RubKianCode",
      description:
        "ระบบ ERP ภายในองค์กรครบวงจร HR, Payroll, Inventory, Accounting และ Approval Workflow ที่เชื่อมต่อข้อมูลทุกแผนก",
    },
    art: <ErpArt />,
  },
  {
    slug: "lucky-draw",
    num: "03",
    title: "ระบบ Lucky Draw",
    subtitle: "สำหรับงานอีเวนต์",
    description:
      "ระบบจับฉลากแบบโปร่งใสตรวจสอบได้ ใช้กับงานบริษัท งานเปิดตัวสินค้า งานคอนเสิร์ต — รองรับผู้เข้าร่วมหลักแสน เริ่มงานใน 1 สัปดาห์",
    features: [
      "RNG ตรวจสอบได้ · Audit log ครบ",
      "รองรับ 250,000 รายชื่อ · จับ <1 วินาที",
      "OBS Overlay สำหรับ Live สด",
      "QR Check-in & Realtime Dashboard",
      "Custom Animation · ตามธีมงาน",
      "Export ผลรางวัล PDF / Excel",
    ],
    duration: "เริ่มต้น 1 สัปดาห์ · ต่อ event",
    startingPrice: "35,000 บาท / event",
    accent: "#F1C40F",
    featured: true,
    meta: {
      title: "ระบบ Lucky Draw — Event Lucky Draw System | RubKianCode",
      description:
        "ระบบจับฉลากออนไลน์โปร่งใสตรวจสอบได้ รองรับ 250,000 รายชื่อ พร้อม OBS overlay และ QR check-in สำหรับงานอีเวนต์",
    },
    art: <LuckyDrawArt />,
  },
  {
    slug: "photoboothsoftware",
    num: "04",
    title: "ระบบ Photobooth",
    subtitle: "Korean-style Booth",
    description:
      "ตู้ถ่ายรูปสไตล์เกาหลีพร้อมซอฟต์แวร์ครบวงจร — รับผลิต ให้เช่า มี operator มืออาชีพ ปรับ template/filter ตาม brand ลูกค้าได้ทุกงาน",
    features: [
      "AI Filter & Auto Beauty Retouch",
      "Custom Frame · ตามธีมงานลูกค้า",
      "Print + QR Cloud Share ทันที",
      "งานเลี้ยง · เปิดตัวสินค้า · Wedding",
      "ตู้ผลิตเองในไทย · บริการหลังการขาย",
      "Realtime Photo Gallery",
    ],
    duration: "ให้เช่ารายวัน · เริ่ม 1 สัปดาห์",
    startingPrice: "8,500 บาท / วัน",
    accent: "#2ECC71",
    featured: true,
    customPage: true, // → ใช้ /services/photoboothsoftware/page.tsx (static) แทน dynamic template
    meta: {
      title: "ระบบ Photobooth — Korean-style Booth | RubKianCode",
      description:
        "ตู้ถ่ายรูปสไตล์เกาหลีพร้อมซอฟต์แวร์ครบวงจร AI Filter, Custom Frame, Print + QR Share สำหรับงาน event ทุกขนาด",
    },
    art: <PhotoboothArt />,
  },
]

// ════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured)
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  return SERVICES.filter((s) => s.slug !== slug).slice(0, limit)
}

/**
 * คืน URL ของหน้า detail สำหรับ service หนึ่ง ๆ
 *
 * ทุก service ใช้ pattern เดียว: /services/{slug}
 * - ถ้า `customPage: true` → routing จะหยิบ static page ที่ /services/{slug}/page.tsx
 * - ถ้า `customPage: false/undefined` → routing จะหยิบ dynamic [slug]/page.tsx (template ทั่วไป)
 *
 * 💡 เรียกฟังก์ชันนี้แทนการ build URL เองเพื่อให้มี central logic ที่เดียว
 */
export function getServiceHref(service: Service): string {
  return `/services/${service.slug}`
}

// ════════════════════════════════════════════════════════════════════════
// PIXEL ART ILLUSTRATIONS
// ════════════════════════════════════════════════════════════════════════

function MarketingArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-full w-full">
      <rect width="320" height="200" fill="#F4EDE0" />
      <g fill="#E63946">
        <rect x="40" y="140" width="20" height="40" />
        <rect x="70" y="120" width="20" height="60" />
        <rect x="100" y="90" width="20" height="90" />
        <rect x="130" y="60" width="20" height="120" />
        <rect x="160" y="40" width="20" height="140" />
      </g>
      <g fill="#0A2540">
        <rect x="40" y="180" width="160" height="4" />
        <rect x="40" y="20" width="4" height="160" />
      </g>
      <g fill="#2ECC71">
        <rect x="220" y="60" width="60" height="8" />
        <rect x="220" y="68" width="50" height="8" />
        <rect x="220" y="76" width="40" height="8" />
        <rect x="240" y="40" width="20" height="20" />
        <rect x="232" y="48" width="8" height="8" />
        <rect x="260" y="48" width="8" height="8" />
      </g>
      <g fill="#F1C40F">
        <rect x="220" y="120" width="16" height="16" />
        <rect x="244" y="120" width="16" height="16" />
        <rect x="268" y="120" width="16" height="16" />
      </g>
      <g fill="#0A2540">
        <rect x="226" y="126" width="4" height="4" />
        <rect x="250" y="126" width="4" height="4" />
        <rect x="274" y="126" width="4" height="4" />
      </g>
      <text x="220" y="160" className="font-pixelify" fontSize="14" fill="#0A2540">+218%</text>
    </svg>
  )
}

function ErpArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-full w-full">
      <rect width="320" height="200" fill="#F4EDE0" />
      <rect x="40" y="30" width="60" height="50" fill="#3498DB" />
      <rect x="110" y="30" width="60" height="50" fill="#0A2540" />
      <rect x="180" y="30" width="60" height="50" fill="#3498DB" />
      <rect x="250" y="30" width="40" height="50" fill="#F1C40F" />
      <rect x="40" y="90" width="60" height="50" fill="#0A2540" />
      <rect x="110" y="90" width="60" height="50" fill="#3498DB" />
      <rect x="180" y="90" width="60" height="50" fill="#0A2540" />
      <rect x="250" y="90" width="40" height="50" fill="#3498DB" />
      <rect x="40" y="150" width="100" height="20" fill="#0A2540" />
      <rect x="150" y="150" width="60" height="20" fill="#E63946" />
      <rect x="220" y="150" width="70" height="20" fill="#3498DB" />
      <g fill="#F4EDE0">
        <rect x="60" y="50" width="20" height="2" />
        <rect x="60" y="55" width="14" height="2" />
        <rect x="60" y="60" width="20" height="2" />
        <rect x="130" y="50" width="20" height="10" fill="#F1C40F" />
        <rect x="130" y="62" width="14" height="2" />
        <rect x="200" y="50" width="20" height="2" />
        <rect x="200" y="55" width="20" height="2" />
        <rect x="200" y="60" width="14" height="2" />
        <rect x="265" y="50" width="10" height="10" fill="#0A2540" />
      </g>
    </svg>
  )
}

function LuckyDrawArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-full w-full">
      <rect width="320" height="200" fill="#F4EDE0" />
      <g fill="#E63946">
        <rect x="80" y="20" width="160" height="20" />
        <rect x="60" y="40" width="200" height="120" />
        <rect x="80" y="160" width="160" height="20" />
      </g>
      <g fill="#0A2540">
        <rect x="80" y="60" width="40" height="80" />
        <rect x="140" y="60" width="40" height="80" />
        <rect x="200" y="60" width="40" height="80" />
      </g>
      <text x="100" y="115" textAnchor="middle" className="font-pixelify" fontSize="28" fill="#F1C40F">7</text>
      <text x="160" y="115" textAnchor="middle" className="font-pixelify" fontSize="28" fill="#F1C40F">7</text>
      <text x="220" y="115" textAnchor="middle" className="font-pixelify" fontSize="28" fill="#F1C40F">7</text>
      <g fill="#F1C40F">
        <rect x="40" y="120" width="10" height="10" />
        <rect x="50" y="140" width="10" height="10" />
        <rect x="270" y="130" width="10" height="10" />
        <rect x="260" y="150" width="10" height="10" />
        <rect x="40" y="170" width="10" height="10" />
        <rect x="280" y="170" width="10" height="10" />
        <rect x="140" y="6" width="40" height="6" />
        <rect x="140" y="0" width="6" height="6" />
        <rect x="157" y="0" width="6" height="6" />
        <rect x="174" y="0" width="6" height="6" />
      </g>
    </svg>
  )
}

function PhotoboothArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-full w-full">
      <rect width="320" height="200" fill="#F4EDE0" />
      <rect x="50" y="14" width="84" height="172" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
      <rect x="50" y="14" width="84" height="14" fill="#0A2540" />
      <text x="92" y="25" textAnchor="middle" className="font-pixelify" fontSize="9" fill="#F1C40F">2026.05</text>
      <rect x="58" y="34" width="68" height="32" fill="#3498DB" />
      <rect x="78" y="44" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="44" width="3" height="3" fill="#0A2540" />
      <rect x="80" y="55" width="24" height="3" fill="#0A2540" />
      <rect x="78" y="52" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="52" width="3" height="3" fill="#0A2540" />
      <rect x="58" y="70" width="68" height="32" fill="#E63946" />
      <rect x="78" y="80" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="80" width="3" height="3" fill="#0A2540" />
      <rect x="76" y="91" width="3" height="3" fill="#F1C40F" />
      <rect x="79" y="94" width="26" height="3" fill="#F1C40F" />
      <rect x="105" y="91" width="3" height="3" fill="#F1C40F" />
      <rect x="58" y="106" width="68" height="32" fill="#F1C40F" />
      <rect x="78" y="116" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="116" width="3" height="3" fill="#0A2540" />
      <rect x="80" y="127" width="24" height="3" fill="#0A2540" />
      <rect x="78" y="124" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="124" width="3" height="3" fill="#0A2540" />
      <rect x="58" y="142" width="68" height="32" fill="#2ECC71" />
      <g fill="#E63946">
        <rect x="76" y="151" width="2" height="2" />
        <rect x="78" y="149" width="2" height="2" />
        <rect x="80" y="151" width="2" height="2" />
        <rect x="78" y="153" width="2" height="2" />
        <rect x="103" y="151" width="2" height="2" />
        <rect x="105" y="149" width="2" height="2" />
        <rect x="107" y="151" width="2" height="2" />
        <rect x="105" y="153" width="2" height="2" />
      </g>
      <rect x="80" y="163" width="24" height="3" fill="#0A2540" />
      <rect x="78" y="160" width="3" height="3" fill="#0A2540" />
      <rect x="103" y="160" width="3" height="3" fill="#0A2540" />
      <rect x="170" y="50" width="120" height="110" fill="#0A2540" />
      <rect x="220" y="44" width="20" height="6" fill="#F1C40F" />
      <rect x="200" y="76" width="60" height="60" fill="#F4EDE0" stroke="#F1C40F" strokeWidth="3" />
      <rect x="210" y="86" width="40" height="40" fill="#0A2540" />
      <rect x="216" y="92" width="28" height="28" fill="#3498DB" />
      <rect x="222" y="98" width="16" height="16" fill="#F4EDE0" />
      <rect x="226" y="102" width="8" height="8" fill="#0A2540" />
      <rect x="178" y="56" width="6" height="6" fill="#2ECC71" />
      <rect x="270" y="146" width="14" height="8" fill="#E63946" />
      <g fill="#E63946">
        <rect x="40" y="14" width="4" height="4" />
        <rect x="36" y="18" width="4" height="4" />
        <rect x="44" y="18" width="4" height="4" />
        <rect x="40" y="22" width="4" height="4" />
      </g>
      <g fill="#F1C40F">
        <rect x="148" y="46" width="4" height="4" />
        <rect x="156" y="64" width="4" height="4" />
        <rect x="298" y="160" width="4" height="4" />
        <rect x="148" y="160" width="4" height="4" />
      </g>
    </svg>
  )
}
