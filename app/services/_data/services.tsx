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
import Image from "next/image"

export type Screenshot = {
  src: string                   // path ไป /public/images/...
  alt: string                   // alt text สำหรับ SEO + a11y
  caption: string               // สั้นๆ บอกว่าภาพนี้คืออะไร
}

// Section deep-dive ของ feature เด่น 1 ตัวของ service (optional)
// — ใช้เน้น USP ที่อยากให้ลูกค้าจำได้แม่น 1 อย่าง
export type KeyFeature = {
  eyebrow: string               // เช่น "★ INSIGHT · MULTI-TOUCH"
  title: string                 // ส่วนแรกของ heading
  highlightedTitle: string      // ส่วนที่ระบายสี accent
  description: string           // 1 paragraph อธิบาย concept
  image: Screenshot             // ภาพประกอบ — ใช้เป็น SEO alt text + bottom caption ตลอด
  // (optional) ถ้ากำหนด — render VideoLoopPreview แทน <Image>
  // string = ไฟล์เดียว วน loop / array = หลายไฟล์ เล่นต่อกัน
  video?: string | string[]
  // ปรับสัดส่วน frame ภาพให้แมตช์กับ aspect ratio ของภาพจริง
  // ค่า default = "auto" → portrait บน mobile / landscape บน desktop (เหมาะกับภาพ landscape ส่วนใหญ่)
  // ใช้ "portrait" เมื่อภาพเป็นแนวตั้ง เพื่อกัน letterbox กว้างบน desktop
  imageAspect?: "auto" | "portrait" | "square" | "landscape" | "phone" | "video"
  benefits: { title: string; description: string }[]  // 3-4 ข้อ
}

export type Service = {
  slug: string                  // URL path: /services/{slug}
  num: string                   // ลำดับโชว์บนการ์ด — "01", "02"...
  title: string                 // ชื่อภาษาไทย
  subtitle: string              // ภาษาอังกฤษ/รอง
  description: string           // ความยาว ~2 บรรทัด ใช้ทั้ง card + detail hero
  features: string[]            // bullet หลัก ของบริการ
  duration: string              // ระยะเวลาส่งมอบ
  postSupport?: string          // (optional) override ข้อความ "การดูแลหลังส่งมอบ" ใน stat strip
                                //            default = "30 วัน Hypercare ฟรี"
  startingPrice?: string        // ราคาเริ่มต้น (optional)
  accent: string                // hex color ของ theme service นี้
  featured: boolean             // true = ขึ้นการ์ดบน homepage
  customPage?: boolean          // true = มี static page ของตัวเองที่ /services/{slug}/page.tsx
                                //        (ไม่ต้องให้ [slug] dynamic route generate ทับ)
  meta: {
    title: string               // <title> ของ detail page
    description: string         // <meta description>
  }
  art: ReactNode                // pixel art illustration / preview รูปจริง — ใช้เป็น fallback
  icon?: ReactNode              // (optional) ไอคอน 16x16 viewBox สำหรับ card บน list view
                                //            ถ้ากำหนด — ใช้ใน catalog grid (/services index, ExtraServices)
  extraOnly?: boolean           // true = บริการทั่วไป (Custom Software, Web ฯลฯ) → ขึ้นใน Extra Services เท่านั้น
                                // false/undefined = สินค้าเฉพาะตัว → ขึ้นใน Main Products grid ของ /services
  heroImage?: Screenshot        // (optional) screenshot จริงใช้แทน art ใน hero preview
                                //           ถ้ากำหนด — render <Image> แทน pixel art
  heroVideo?: string | string[] // (optional) video สำหรับ homepage card preview — autoplay/muted/loop
                                //           string  = ไฟล์เดียว วน loop
                                //           array   = หลายไฟล์ เล่นต่อกัน วนกลับ [0]
                                //           ใช้ใน KeyServicesSection card
  heroDetailVideo?: string | string[]
                                // (optional) video สำหรับ hero ของหน้า /services/{slug}
                                //           ถ้ากำหนด — render <VideoLoopPreview> แทน art/heroImage
                                //           priority บน hero: heroDetailVideo > heroImage > art
  screenshots?: Screenshot[]    // (optional) แกลเลอรี screenshot สำหรับ /services/{slug}
  keyFeatures?: KeyFeature[]    // (optional) section deep-dive ของ USP เด่น (หลาย sections)
  ctaPayment?: {                // (optional) banner สรุป settlement / payment timeline
    badge: string               // eyebrow pixel tag
    highlight: string           // ตัวเด่น เช่น "T + 2"
    title: string               // headline ต่อจาก highlight
    description: string         // คำอธิบาย 1-2 บรรทัด
    note?: string               // (optional) disclaimer ตัวเล็ก
  }
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
    startingPrice: "35,000 บาท / ปี",
    accent: "#E63946",
    featured: true,
    meta: {
      title: "ระบบการตลาด — Marketing System & A/B Testing | RubKianCode",
      description:
        "ระบบการตลาดครบวงจร — Marketing Automation, CRM, Multi-touch Attribution, A/B Testing & Conversion Rate Optimization พร้อม Dashboard วัดผล Real-time เพิ่ม Conversion Rate 20–50% โดยไม่ต้องเพิ่มงบโฆษณา",
    },
    art: <MarketingArt />,
    screenshots: [
      {
        src: "/images/example-products/marketing1.jpg",
        alt: "Marketing Dashboard ภาพรวม — รายได้ · ROAS · CAC · LTV · Channel Mix ครบในจอเดียว",
        caption:
          "เห็นภาพรวมธุรกิจในจอเดียว — รายได้, ค่าโฆษณา, กำไร, ROAS ครบ ไม่ต้องเปิดหลายแอป",
      },
      {
        src: "/images/example-products/marketing2.jpg",
        alt: "Marketing Automation Dashboard — Conversion Funnel · A/B Experiments · Hot Leads scoring",
        caption:
          "ระบบส่ง LINE/Email อัตโนมัติ 24 ชม. + AI Score บอกว่า 'ลูกค้าคนไหนพร้อมซื้อ' ตอนนี้",
      },
      {
        src: "/images/example-products/marketing3.jpg",
        alt: "Multi-touch Attribution — Revenue Performance chart + Channel breakdown (Google, Facebook, LINE, TikTok)",
        caption:
          "รู้ทันทีว่าโฆษณาช่องไหนคุ้ม — เห็นเงินจาก Google/Facebook/LINE/TikTok ทุกบาทที่ลง",
      },
    ],
    keyFeatures: [
      // ── Deep dive 1: Top Conversion Path ──
      {
        eyebrow: "★ DEEP DIVE · MULTI-TOUCH PATH",
        title: "เห็นเส้นทางที่ลูกค้า",
        highlightedTitle: "ซื้อจริง ไม่ต้องเดา",
        description:
          "ลูกค้าไม่ได้ซื้อเพราะโฆษณาตัวเดียว — บางคนเริ่มจาก Google → ตามด้วย Email → แล้วปิดที่ Direct ระบบ Top Conversion Path ของเราจะเห็นเส้นทางจริงทั้งหมด ทำให้คุณรู้ว่าช่องไหน 'เริ่ม' ช่องไหน 'ปิด' กระจายงบให้ถูกที่ ไม่ใช่ทุ่มที่ช่องสุดท้ายอย่างเดียว",
        image: {
          src: "/images/example-products/marketing4.jpg",
          alt: "Top Conversion Paths — multi-touch sequences ของ 30 วันล่าสุด · Google → Email → Direct, Facebook → LINE → Direct, TikTok → Google → Email → Direct",
          caption: "Top Conversion Paths · 30 วันล่าสุด",
        },
        benefits: [
          {
            title: "เห็นทุกจุดสัมผัส (Touch Point)",
            description:
              "ไม่ใช่แค่ช่องสุดท้าย — เห็นทุกครั้งที่ลูกค้าเจอแบรนด์เรา ตั้งแต่ Google, Facebook, TikTok ไปจนถึงปิดดีลที่ Direct",
          },
          {
            title: "ลงทุนงบโฆษณาฉลาดขึ้น",
            description:
              "รู้ว่าช่องไหนคน 'เริ่มต้น' ช่องไหน 'ปิด' → กระจายงบให้ถูกที่ ลด CAC ขึ้น ROAS",
          },
          {
            title: "เลิกเสียเงินกับช่องไม่คุ้ม",
            description:
              "ตัด channel ที่ไม่มีส่วนช่วยจริงออก เห็นเงินคืนชัด — ไม่ต้องทุ่มงบกับช่องที่แค่ได้ยอดผิวเผิน",
          },
          {
            title: "เพิ่มยอดปิดการขาย 30%+",
            description:
              "ส่ง remarketing ตามเส้นทางที่ Convert จริง → ลูกค้าได้รับโฆษณาที่เหมาะสมในจังหวะที่ใช่",
          },
        ],
      },

      // ── Deep dive 2: Marketing Automation ──
      {
        eyebrow: "★ DEEP DIVE · MARKETING AUTOMATION",
        title: "ตั้งครั้งเดียว ทำงาน 24 ชม.",
        highlightedTitle: "ลูกค้าซื้อซ้ำเองอัตโนมัติ",
        description:
          "เซ็ตอัพ flow ครั้งเดียว ระบบจะส่ง LINE OA / Email ตามจังหวะของลูกค้าแต่ละคน — ตั้งแต่ Welcome Series ตอนเริ่มต้น, Cart Abandon ดึงคนกลับ, Re-engagement ปลุกลูกค้าเก่า, ไปจนถึง Repeat Purchase ลูกค้าได้รับเนื้อหาที่ตรงสถานะตัวเอง คุณนอนหลับ — ระบบทำงานต่อ พร้อมโชว์ sent / open / click / revenue ทุก flow แบบ real-time",
        image: {
          src: "/images/example-products/marketing5.jpg",
          alt: "Marketing automation 12 active flows — Welcome Series LINE OA, Cart Abandon Email, Re-engagement 60-day, Demo Booked Nurture, Repeat Purchase 30d พร้อม Sent/Open/Click/Revenue metrics",
          caption: "Marketing Automation · 12 active flows",
        },
        benefits: [
          {
            title: "ตั้งครั้งเดียว ทำงานตลอด",
            description:
              "Welcome / Cart Abandon / Re-engagement — ส่งตามจังหวะลูกค้าแต่ละคน ไม่ต้องนั่งคิดทุกวัน",
          },
          {
            title: "เห็น performance ทุก flow",
            description:
              "Sent · Open rate · CTR · Revenue ของแต่ละ campaign บอกชัดว่า flow ไหนคุ้ม flow ไหนต้องปรับ",
          },
          {
            title: "Personalize ระดับลึก",
            description:
              "Segment ลูกค้าตาม behavior — VIP, Inactive, New follower แต่ละกลุ่มได้ message ต่างกัน ตรงใจกว่า",
          },
          {
            title: "คืนทุนใน 30 วันแรก",
            description:
              "Cart Abandon flow เดียวดึง revenue กลับมา ฿2M+ ใน 30 วัน — เซ็ตครั้งเดียวแต่ขายให้ตลอดปี",
          },
        ],
      },

      // ── Deep dive 3: A/B Testing & Conversion Rate Optimization ──
      {
        eyebrow: "★ DEEP DIVE · A/B TESTING",
        title: "ทดสอบทุกการตัดสินใจ",
        highlightedTitle: "ก่อนทุ่มงบเต็มสเกล",
        description:
          "A/B Testing คือการทดสอบเปรียบเทียบสองเวอร์ชันแบบเป็นวิทยาศาสตร์ — Headline แบบไหนคนคลิกมากกว่า, ปุ่ม CTA สีไหนปิดการขายได้เยอะกว่า, ข้อความ LINE OA แบบไหนได้ Open Rate สูงกว่า ระบบของเรารัน Split Test พร้อมกันได้หลาย experiments แสดง Conversion Rate, Uplift % และ Statistical Significance แบบ real-time พร้อมประกาศ 'Winner' อัตโนมัติเมื่อข้อมูลถึงระดับเชื่อถือได้ ทำให้ทุกการตัดสินใจมีหลักฐานเชิงข้อมูล (Data-driven Decision) ลด Risk ก่อน Scale และเพิ่ม Conversion Rate ได้ 20–50% โดยไม่ต้องเพิ่มงบโฆษณาแม้แต่บาทเดียว",
        image: {
          src: "/images/example-products/marketing6.jpg",
          alt: "A/B Testing dashboard — 3 running experiments: Pricing page hero copy (12,480 visitors, significance 98%, Variant B Outcome-led winner +42% CVR 4.86%), Demo CTA placement (8,920 visitors, significance 94%, Variant A Sticky bar winner +18% CVR 5.18%), LINE welcome message (4,210 followers, significance 91%, Variant B Single CTA winner +23% CVR 22.4%)",
          caption: "A/B Experiments · 3 running · ประกาศ Winner อัตโนมัติ",
        },
        imageAspect: "portrait",
        benefits: [
          {
            title: "ตัดสินใจด้วยข้อมูลจริง",
            description:
              "Statistical Significance · Sample Size · p-value — รู้ทันทีว่าผลทดลองเชื่อถือได้แค่ไหน ก่อนเปลี่ยนของจริงทั้งหมด",
          },
          {
            title: "ทดสอบได้ทุก Touch Point",
            description:
              "Headline · CTA Copy · Pricing Page · Email Subject · LINE Message — ปรับทีละจุด หา Winner ที่ Convert จริง",
          },
          {
            title: "ลด Risk ก่อน Scale",
            description:
              "ทดสอบกับ traffic แค่ 10% ก่อน เห็นเวอร์ชันใหม่ชนะอย่างมีนัยสำคัญ ค่อยขยายเต็มที่ — ประหยัดงบที่อาจเสียเปล่า",
          },
          {
            title: "เพิ่ม Conversion Rate 20–50%",
            description:
              "Optimize Headline + CTA + UX ทีละชิ้น เอฟเฟกต์ทบต้น (Compound) ดัน ROAS ขึ้นชัดภายใน 60 วัน ไม่ต้องเพิ่มงบ Ads",
          },
        ],
      },
    ],
  },
  {
    slug: "office-erp",
    num: "02",
    title: "ระบบภายในออฟฟิศ",
    subtitle: "Office ERP",
    description:
      "ระบบ ERP สำหรับ SME ไทย — รวม HR, Payroll, Accounting, Inventory และ Approval Workflow ในซอฟต์แวร์เดียว ลดงานซ้ำ เห็นภาพรวมธุรกิจ Real-time รองรับ Cloud และ On-premise",
    features: [
      "HR · Payroll · Leave · OT · Time Attendance",
      "Multi-warehouse Inventory & Asset Tracking",
      "Accounting · ภาษี ภงด./ภพ.30 · งบการเงิน",
      "Approval Workflow & e-Document Online",
      "Sales · CRM · Quotation · Invoice",
      "Real-time Dashboard & BI Report",
      "Notification Center & Activity Feed",
      "Mobile-friendly · Cloud / On-premise · API Integration",
    ],
    duration: "เริ่มต้น 12 สัปดาห์",
    startingPrice: "35,000 บาท / ปี",
    accent: "#3498DB",
    featured: true,
    meta: {
      title: "ระบบ ERP สำหรับ SME — Office ERP, Approval Workflow & Real-time Dashboard | RubKianCode",
      description:
        "ระบบ ERP ภายในองค์กรสำหรับ SME ไทยครบวงจร — Real-time Dashboard, KPI Alerts, Job Kanban, Multi-warehouse Inventory, Approval Workflow, e-Document, Notification Center, HR/Payroll/Accounting รวมทุกแผนกในซอฟต์แวร์เดียว ลดเวลาทำงาน 70% ปิดบัญชีเร็ว 3 เท่า รองรับ Cloud และ On-premise",
    },
    art: <ErpArt />,
    heroImage: {
      src: "/images/example-products/ERP1.jpg",
      alt: "Office ERP Executive Dashboard — ระบบ ERP สำหรับ SME ภาพรวมธุรกิจ Real-time พร้อม KPI Alerts, Profit Margin Distribution, รายรับ/ต้นทุน/กำไร Live ทุก 30 วินาที",
      caption: "Executive Dashboard",
    },
    screenshots: [
      {
        src: "/images/example-products/ERP1.jpg",
        alt: "ระบบ ERP สำหรับ SME — Executive Dashboard ภาพรวมธุรกิจ Real-time: 99 อีเวนต์, รายรับรวม ฿12.2M, ต้นทุน ฿743K, กำไรสุทธิ ฿11.5M (Profit Margin 93.9%), 7 KPI Alerts (อีเวนต์ขาดทุน, รายได้ยังไม่ลงต้นทุน, ไม่ระบุเซล, Margin ต่ำ, เบิกค้าง 30 วัน), Profit Margin Distribution กระจายความเสี่ยง",
        caption: "Executive Dashboard + KPI Alerts — รู้สถานะธุรกิจ Real-time",
      },
      {
        src: "/images/example-products/ERP2.jpg",
        alt: "ระบบบริหารงาน Office ERP — Job Management Kanban Board พร้อม 6 สถานะ workflow ตั้งแต่ล็อคคิวงาน 24, กำลังออกแบบ 9, รอตรวจ/แก้ไข 4, ประสาน Event 2, ประสานขาย/ระบบ 3, จนถึงเสร็จสิ้น 36 รายการ พร้อม Filter ตามสถานะและบุคคล รองรับการทำงานข้ามแผนก",
        caption: "Job Management Kanban — ทุกแผนกเห็นงานเดียวกัน",
      },
      {
        src: "/images/example-products/ERP3.jpg",
        alt: "ระบบจัดการคลังอุปกรณ์ Office ERP — Multi-warehouse Inventory Management พร้อมรายการอุปกรณ์, รูปสินค้า, ชื่อ, จำนวนคงเหลือ, Serial Number, ตำแหน่งเก็บ (กระเป๋า/กล่อง/ชั้น), สถานะการใช้งาน (ว่าง/ถูกยืม/ซ่อม), ราคาทุน รองรับ Asset Tracking ระดับ Serial-level สำหรับธุรกิจอีเวนต์, โรงงาน และคลังสินค้า",
        caption: "Multi-warehouse Inventory + Asset Tracking — Serial-level",
      },
    ],
    keyFeatures: [
      // ── Deep dive 1: Real-time Dashboard & KPI Alerts ──
      {
        eyebrow: "★ DEEP DIVE · REAL-TIME DASHBOARD",
        title: "เห็นภาพรวมธุรกิจ",
        highlightedTitle: "ใน 5 วินาที",
        description:
          "Real-time Dashboard รวมรายรับ, ต้นทุน, กำไร, Profit Margin ครบในจอเดียว พร้อม KPI Alerts อัตโนมัติ — เตือนเมื่ออีเวนต์ขาดทุน, รายได้ค้าง, Margin ต่ำ ก่อนความเสียหายเกิดขึ้น เปิดมือถือ 5 วินาทีรู้สถานะธุรกิจวันนี้",
        image: {
          src: "/images/example-products/ERP1.jpg",
          alt: "Office ERP Executive Dashboard สำหรับ SME — Event Overview Real-time พร้อม 7 KPI Alerts (อีเวนต์ขาดทุน 2 รายการ ฿11K, รายได้ยังไม่ลงต้นทุน 17 อีเวนต์, ไม่ระบุเซล 71, ลดราคา >20%, เบิกค้าง >30 วัน, รายรับเดือนนี้ -87.6% YoY) + ตัวเลขภาพรวม ฿12.2M รายรับ · ฿11.5M กำไรสุทธิ · Margin 93.9% · Profit Margin Distribution กราฟแนวนอน",
          caption: "Executive Dashboard + 7 KPI Alerts",
        },
        benefits: [
          {
            title: "KPI Alerts อัตโนมัติ 24/7",
            description: "ตรวจจับเหตุการณ์ผิดปกติเอง — อีเวนต์ขาดทุน, รายได้ค้าง, Margin ต่ำ ส่งสัญญาณก่อนความเสียหายเกิด",
          },
          {
            title: "Drill-down ถึง Transaction",
            description: "คลิกตัวเลขใดก็ได้ ลงไปเห็นรายการจริงทันที — ใบเบิก ใบสั่งซื้อ ใบขาย ในไม่กี่คลิก",
          },
          {
            title: "Profit Margin Distribution",
            description: "เห็นว่าโปรเจกต์กระจายในเกรด Margin ไหน — สูง/กลาง/ต่ำ/ขาดทุน ปรับ pricing ตรงจุด",
          },
          {
            title: "Real-time ทุก 30 วินาที",
            description: "ข้อมูลอัปเดต Live ผ่าน Cloud — เห็นสถานะธุรกิจวันนี้ได้ทันที ไม่ต้องรอรายงานสิ้นเดือน",
          },
        ],
      },

      // ── Deep dive 2: Approval Workflow & e-Document ──
      {
        eyebrow: "★ DEEP DIVE · APPROVAL WORKFLOW",
        title: "งานเอกสาร · เบิกจ่าย",
        highlightedTitle: "อนุมัติทุกที่ ทุกเวลา",
        description:
          "ระบบ e-Document + Multi-level Approval Workflow สำหรับใบเบิก, ใบลา, PO/PR, ใบเสนอราคา — ส่งอนุมัติผ่านมือถือ 24 ชม. ตั้งสายอนุมัติได้หลายระดับตามมูลค่า/แผนก พร้อม Audit Log ครบทุก action ลดเวลาเอกสาร 70% ปิดบัญชีสิ้นเดือนเร็วขึ้น 3 เท่า",
        image: {
          src: "/images/example-products/ERP4.jpg",
          alt: "ระบบใบเบิกเงินออนไลน์ Office ERP — e-Document Approval Workflow แสดง 163 รายการ Active, แบบร่าง 34, รออนุมัติ 8, อนุมัติแล้ว 53, รอจ่ายสิ้นเดือน 56, ปฏิเสธ 2 พร้อม Filter ตามสถานะและรายการ EXP-202605 series · ครบ Audit Trail · รองรับใบเบิก, ใบลา, PO, PR, ใบเสนอราคา",
          caption: "ใบเบิกเงิน · 163 รายการ Active",
        },
        benefits: [
          {
            title: "Approve ผ่านมือถือ 24 ชม.",
            description: "หัวหน้าไม่อยู่ออฟฟิศก็เซ็นได้ทุกที่ Push Notification เด้งทันที ลดเวลารอ 70%",
          },
          {
            title: "Multi-level Workflow",
            description: "ตั้งสายอนุมัติตามมูลค่า/แผนก — เบิก <฿5K 1 ระดับ, >฿50K 2 ระดับ ระบบเลือกให้อัตโนมัติ",
          },
          {
            title: "Audit Log ครบทุก Action",
            description: "บันทึก timestamp + IP ครบทุก event ผ่านการตรวจสอบ สรรพากร/ผู้สอบบัญชีได้สบาย",
          },
          {
            title: "ปิดบัญชีเร็วขึ้น 3 เท่า",
            description: "เอกสารส่งเข้าระบบบัญชีอัตโนมัติ — ลด Human Error 95% ปิดเดือนได้ใน 3 วัน",
          },
        ],
      },

      // ── Deep dive 3: Notification Center & Activity Feed ──
      {
        eyebrow: "★ DEEP DIVE · NOTIFICATION CENTER",
        title: "รู้ทันทุกการเคลื่อนไหว",
        highlightedTitle: "ในที่เดียว",
        description:
          "Notification Center รวมทุกเหตุการณ์ข้ามโมดูลไว้ในจุดเดียว — ใบเบิกอนุมัติ, สถานะงานเปลี่ยน, Ticket ตอบกลับ ส่ง Real-time ผ่าน Web Push, LINE Notify, Email เก็บประวัติย้อนหลัง 1 ปี เหมาะกับองค์กร Hybrid/Remote",
        image: {
          src: "/images/example-products/ERP5.jpg",
          alt: "ระบบแจ้งเตือนข้ามโมดูล Office ERP — Notification Center / Activity Feed รวม 55 รายการ Real-time จากทุกโมดูล: ใบเบิก EXP-202605-020/045/008 อัปโหลดใบกำกับภาษีและรอชำระเงิน, ใบเบิก EXP-202604-209 อนุมัติแล้ว (รอจ่ายสิ้นเดือน), Ticket สรุปการคุยกับลูกค้า, สถานะงาน Selfie Studio Event เปลี่ยน loading → teardown และ preparing → loading พร้อม Tab ทั้งหมด/ยังไม่อ่าน",
          caption: "Notification Center · 55 รายการ Real-time",
        },
        benefits: [
          {
            title: "Real-time ทุกเหตุการณ์",
            description: "Push Notification ผ่าน Web, Mobile, LINE Notify, Email — ไม่พลาดแม้ทำงาน Remote",
          },
          {
            title: "ข้ามโมดูล · ที่เดียว",
            description: "ใบเบิก, สถานะงาน Kanban, Ticket, ใบลา รวมในจุดเดียว ไม่ต้องเปิดหลายแอป",
          },
          {
            title: "Smart Filter",
            description: "Filter ตามประเภท/ผู้ส่ง/ความสำคัญ ทำเครื่องหมายอ่านแล้วได้ทีละรายการ",
          },
          {
            title: "ประวัติย้อนหลัง 1 ปี",
            description: "ค้นหาเหตุการณ์ 12 เดือนย้อนหลัง — เหมาะสำหรับ Compliance และ Performance Review",
          },
        ],
      },
    ],
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
    startingPrice: "35,000 บาท / ปี",
    accent: "#F1C40F",
    featured: true,
    meta: {
      title: "ระบบ Lucky Draw — Event Lucky Draw System | RubKianCode",
      description:
        "ระบบจับฉลากออนไลน์โปร่งใสตรวจสอบได้ รองรับ 250,000 รายชื่อ พร้อม OBS overlay และ QR check-in สำหรับงานอีเวนต์",
    },
    art: <LuckyDrawArt />,
    heroVideo: "/videos/project3/Luckydraw1.mp4",
  },
  {
    slug: "photoboothsoftware",
    num: "04",
    title: "ระบบ Photobooth",
    subtitle: "Korean-style Photobooth Software",
    description:
      "ตู้ถ่ายรูปสไตล์เกาหลีพร้อมซอฟต์แวร์ครบวงจร — รับผลิต ให้เช่า บริการ operator มืออาชีพ ปรับ template/filter ตาม brand ลูกค้าได้ทุกงาน รองรับงานเลี้ยง, เปิดตัวสินค้า, Wedding และ Corporate Event",
    features: [
      "AI Filter & Auto Beauty Retouch",
      "Photo Signature · เซ็นชื่อ/เขียนข้อความสดบนรูป",
      "Custom Frame · ตามธีม Brand ลูกค้า",
      "Print + QR Cloud Share ทันที",
      "Realtime Photo Gallery & Live Wall",
      "Payment Channel · Alipay · PromptPay · WeChat Pay",
      "T+2 Settlement · เข้าบัญชีภายใน 2 วันทำการ",
      "ตู้สไตล์เกาหลี · ผลิตเองในไทย",
      "Online Support ตลอดอายุสัญญา",
    ],
    duration: "ให้เช่ารายปี· เริ่ม 1 ปี",
    postSupport: "ตลอดอายุสัญญา ( Online Service )",
    startingPrice: "35,000 บาท / ปี",
    accent: "#2ECC71",
    featured: true,
    meta: {
      title: "ระบบ Photobooth — ตู้ถ่ายรูปสไตล์เกาหลี + Photobooth Software | RubKianCode",
      description:
        "ระบบ Photobooth Software ครบวงจรสำหรับงานอีเวนต์ในไทย — ตู้ถ่ายรูปสไตล์เกาหลี (Korean-style Booth), AI Filter, Auto Beauty Retouch, Custom Frame ตามแบรนด์, Print + QR Cloud Share, Realtime Photo Gallery รับผลิต ให้เช่า มีทีม operator มืออาชีพ รองรับงานแต่งงาน เปิดตัวสินค้า Corporate Event",
    },
    art: <PhotoboothArt />,
    // homepage card preview — เล่น live1.mp4 → live2 → ... → live11 วนกลับ
    // ถ้ามีไฟล์ใหม่ใน /public/videos/liveview/ แค่อัปเลขนี้
    heroVideo: Array.from({ length: 11 }, (_, i) => `/videos/liveview/live${i + 1}.mp4`),
    // hero ของหน้า /services/photoboothsoftware — เล่น project0 video sequence
    // ครอบคลุม Vsign, liveview, preview, reels — ให้เห็น UI workflow ของ Photobooth จริง
    heroDetailVideo: [
      "/videos/project0/preview1.mp4",
      "/videos/project0/liveview1.mp4",
      "/videos/project0/liveview2.mp4",
      "/videos/project0/Vsign1.mp4",
      "/videos/project0/Vsign2.mp4",
      "/videos/project0/reelsign1.mp4",
      "/videos/project0/reelsign2.mp4",
      "/videos/project0/reels1.mp4",
    ],
    screenshots: [
      {
        src: "/images/photobooth/photo1.jpg",
        alt: "ตู้ Photobooth สไตล์เกาหลี (Korean-style Booth) ของ RubKianCode — โครงสีขาว Mirror Booth พร้อม Soft Light Lantern 2 ดวงให้แสงสวยถูกใจ ติดตั้งในงาน Corporate Event โรงแรม รองรับ Live Preview และ AI Beauty Retouch",
        caption: "Mirror Booth + Soft Light — งาน Corporate · Hotel Event",
      },
      {
        src: "/images/photobooth/photo2.jpg",
        alt: "ตู้ Photobooth ออกงาน True 5G x dtac TU Temporium — ติด custom branding ตามธีมงาน, มีป้าย QR Code ให้ผู้ร่วมงานสแกน Add Line OA + โหลด True App รับสิทธิ์ถ่าย Photo Booth ฟรี ตัวอย่างการใช้งาน Photobooth Marketing",
        caption: "Custom Branding — งาน Activation · Roadshow Marketing",
      },
      {
        src: "/images/photobooth/photo3.jpg",
        alt: "ตัวอย่างการใช้งาน Photobooth Software ของ RubKianCode — ตู้ถ่ายรูป Korean-style ในงานอีเวนต์ พร้อม Realtime Photo Gallery และ Print + QR Cloud Share สำหรับผู้ร่วมงาน",
        caption: "Photobooth in Action — งานอีเวนต์จริง",
      },
      {
        src: "/images/photobooth/photo4.jpg",
        alt: "ตัวอย่างผลงาน Photobooth จาก RubKianCode — ติดตั้งในงาน Wedding / Birthday Party พร้อมกรอบ custom และ AI Beauty Filter ทำให้ภาพออกมาสวยทันทีไม่ต้องแต่ง",
        caption: "Wedding & Private Event Setup",
      },
    ],
    keyFeatures: [
      // ── Deep dive 1: Signage Photobooth ──
      {
        eyebrow: "★ DEEP DIVE · SIGNAGE PHOTOBOOTH",
        title: "Signage Photobooth",
        highlightedTitle: "ตู้ถ่ายรูปที่เซ็นชื่อลงบนรูปได้",
        description:
          "ตู้ถ่ายรูปของเรามีฟีเจอร์ให้แขกในงานเซ็นลายเซ็นลงบนรูปก่อนปริ้นต์หรือส่งกลับ จะเซ็นชื่อตัวเอง เขียนข้อความถึงเจ้าของงาน หรือฝากคำอวยพรก็ได้\n\nทำให้รูปแต่ละใบมีความเป็นส่วนตัวและเก็บเป็นที่ระลึกได้จริง ถ่ายเสร็จ เซ็นต์ได้ ปริ้นได้เลยในเครื่องเดียว ไม่ต้องต่ออุปกรณ์เพิ่ม\n\nเหมาะกับงานแต่งงาน งานเปิดตัวสินค้า งาน Gala Dinner หรืองาน Corporate ที่อยากให้แขกมีส่วนร่วมมากกว่าแค่ยืนถ่ายรูปเฉยๆ",
        image: {
          src: "/images/photobooth/photo1.jpg",
          alt: "Signage Photobooth ของ RubKianCode — ตู้ถ่ายรูปทำหน้าที่เป็นทั้ง Photobooth และ Digital Signage แสดง Brand Reel, ตารางอีเวนต์, Live Photo Wall ในเครื่องเดียว เหมาะกับงาน Brand Activation, Roadshow Marketing และ Corporate Event",
          caption: "Signage Photobooth · Reel + Photo + Digital Signage",
        },
        video: [
          "/videos/project0/reelsign1.mp4",
          "/videos/project0/reelsign2.mp4",
        ],
        imageAspect: "portrait",
        benefits: [
          {
            title: "Dual Mode",
            description: "ตู้ถ่ายรูป + Digital Signage ในเครื่องเดียว — ลด cost เช่าจอ ไม่ต้องลากสายไฟเพิ่ม",
          },
          {
            title: "Auto-play Brand Reel",
            description: "เล่น Brand Video / Promo Reel เมื่อ Idle — แตะหน้าจอเข้า Photobooth Mode ทันที",
          },
          {
            title: "Live Photo Wall",
            description: "สลับโชว์ภาพล่าสุดที่ผู้ร่วมงานถ่าย — เพิ่ม FOMO ดึงคนมาต่อคิว",
          },
          {
            title: "Schedule Playlist",
            description: "ตั้ง playlist ตามเวลางาน — เปิดงาน, Keynote Break, Closing แต่ละช่วงเล่นคนละ asset",
          },
        ],
      },

      // ── Deep dive 2: Custom Branding ──
      {
        eyebrow: "★ DEEP DIVE · BRAND CUSTOMIZATION",
        title: "Custom Frame & Branding",
        highlightedTitle: "ปรับตามธีมงานทุกงาน",
        description:
          "ทีมงานออกแบบ Frame, Logo Overlay, Background, UI ของหน้าจอ — ตรงตาม brand identity ของลูกค้า/sponsor ทุก asset แก้ไขได้ภายใน 24 ชม. ก่อนงาน เหมาะกับ Roadshow, Brand Activation และ Corporate Event ที่ต้องการ Photobooth Marketing เต็มรูปแบบ",
        image: {
          src: "/images/photobooth/photo2.jpg",
          alt: "ตัวอย่าง Custom Branding ของ Photobooth Software RubKianCode — ติดตั้งในงาน True 5G x dtac TU Temporium พร้อม custom frame, brand color และ QR Code ให้ผู้ร่วมงานสแกน Add Line OA",
          caption: "True 5G x dtac · Brand Activation",
        },
        benefits: [
          {
            title: "Frame ตาม Brand",
            description: "Logo, Color, Tagline, Hashtag — ออกแบบให้ตรงโทนงาน",
          },
          {
            title: "Live Preview UI",
            description: "หน้าจอ Booth ปรับ background + animation ตามธีมงาน",
          },
          {
            title: "QR Lead Capture",
            description: "เก็บ Line OA / Email ผู้ร่วมงานก่อนถ่าย ส่งให้ Marketing CRM",
          },
          {
            title: "แก้ไขด่วน 24 ชม.",
            description: "Asset เปลี่ยนได้ก่อนงาน — รองรับการอัปเดตโลโก้/ข้อความล่วงหน้า",
          },
        ],
      },

      // ── Deep dive 3: Print + Cloud Share ──
      {
        eyebrow: "★ DEEP DIVE · PRINT & CLOUD",
        title: "Print + QR Cloud Share",
        highlightedTitle: "ภาพถึงมือทันที + เก็บออนไลน์",
        description:
          "พิมพ์ภาพสด ๆ ที่งานด้วยเครื่อง Dye-sublimation Printer คุณภาพสตูดิโอ + QR Code สำหรับโหลดไฟล์ดิจิทัลเก็บได้ทันที พร้อม Realtime Photo Gallery / Live Wall ฉายภาพล่าสุดบนจอ LED ในงาน — เพิ่ม engagement และให้ทุกคนเห็นโมเมนต์ไปด้วยกัน",
        image: {
          src: "/images/photobooth/photo3.jpg",
          alt: "Photobooth Software RubKianCode รองรับ Print + QR Cloud Share พร้อม Realtime Photo Gallery — ผู้ร่วมงานได้ภาพถ่ายปริ้นในมือทันที + ลิงก์ดาวน์โหลดไฟล์ดิจิทัลผ่าน QR",
          caption: "Print + QR Cloud Share",
        },
        // Liveview clip sequence — เล่น live1 → live11 วน loop กลับ [0]
        // โชว์การถ่าย/preview จริงบน booth screen แทนภาพนิ่ง
        video: Array.from({ length: 11 }, (_, i) => `/videos/liveview/live${i + 1}.mp4`),
        benefits: [
          {
            title: "Print 6×4 Studio Quality",
            description: "Dye-sublimation Printer · ภาพไม่ซีด ไม่ลอก เก็บได้ 50 ปี",
          },
          {
            title: "QR Cloud Share",
            description: "สแกนโหลดไฟล์ดิจิทัล HD เก็บไว้ในมือถือ + Watermark Brand",
          },
          {
            title: "Realtime Photo Gallery",
            description: "Live Wall ฉายภาพล่าสุดบนจอ LED ในงาน — เพิ่ม engagement",
          },
          {
            title: "Export Album สิ้นงาน",
            description: "ส่งอัลบั้มภาพรวมทั้งหมดให้ Organizer ภายใน 24 ชม. หลังงาน",
          },
        ],
      },

      // ── Deep dive 4: Payment Channel ──
      {
        eyebrow: "★ DEEP DIVE · PAYMENT CHANNEL",
        title: "Photobooth Payment Channel",
        highlightedTitle: "ชำระเงินครบทุกช่องทาง — รับนักท่องเที่ยวทั่วโลก",
        description:
          "Photobooth Software ของเรารองรับการชำระเงินครบทุกช่องทาง — PromptPay สำหรับลูกค้าไทย, Alipay และ WeChat Pay สำหรับนักท่องเที่ยวจีน เปลี่ยนตู้ Photobooth ให้กลายเป็น Self-service Vending — ลูกค้าจ่ายเอง ถ่ายเอง รับภาพเอง ไม่ต้องมี operator คอยเก็บเงิน เหมาะกับ Mall Installation, Tourist Spot, Theme Park และร้านค้าที่ต้องการรายได้ Passive 24 ชั่วโมง",
        image: {
          src: "/images/photobooth/photo3.jpg",
          alt: "Photobooth Payment Channel ของ RubKianCode — ระบบรับชำระเงินบนตู้ Photobooth รองรับ PromptPay, Alipay, WeChat Pay เปลี่ยนตู้ถ่ายรูปให้เป็น Self-service Vending รับนักท่องเที่ยวไทย-จีน 24 ชั่วโมง เหมาะกับ Mall, Tourist Spot, Theme Park",
          caption: "Self-service Payment · PromptPay · Alipay · WeChat Pay",
        },
        video: "/videos/project1/moshipayment.mp4",
        imageAspect: "video",
        benefits: [
          {
            title: "PromptPay QR",
            description: "รับลูกค้าไทยได้ทันที — สแกน QR จ่ายผ่าน Mobile Banking ทุกธนาคาร",
          },
          {
            title: "Alipay + WeChat Pay",
            description: "รองรับนักท่องเที่ยวจีน — ตลาดใหญ่ที่สุดของอุตสาหกรรม Photobooth ใน Asia",
          },
          {
            title: "Self-service Vending",
            description: "ลูกค้าจ่ายเอง ถ่ายเอง รับภาพเอง — ลด cost operator, เปิดให้บริการ 24 ชั่วโมง",
          },
          {
            title: "Realtime Settlement",
            description: "ยอดขายเข้าบัญชีทันที + Dashboard สรุปรายได้รายวัน/รายเดือน ดูได้จากมือถือ",
          },
        ],
      },
    ],
    // Banner ต่อท้าย Payment Channel — เน้น settlement timeline ให้ merchant อุ่นใจ
    ctaPayment: {
      badge: "★ MERCHANT SETTLEMENT",
      highlight: "T + 2",
      title: "จะได้รับเงินภายในวันที่โอน + 2 วัน",
      description:
        "ระบบ settle อัตโนมัติทุกวันทำการ — ยอดขายจาก Alipay · WeChat Pay · PromptPay เข้าบัญชีคุณภายใน 2 วันทำการ ไม่มีค่าธรรมเนียมแอบแฝง ไม่ต้องรอเป็นเดือน",
      note: "★ T = วันที่ลูกค้าทำรายการสำเร็จ · นับเฉพาะวันทำการ (จันทร์–ศุกร์)",
    },
  },

  // ── Extra Services ── (featured: false → ไม่ขึ้น homepage card หลัก)
  // แต่ยังมีหน้า detail อัตโนมัติที่ /services/{slug} + ขึ้น list บน /services
  {
    slug: "custom-software",
    num: "01",
    title: "Custom Software",
    subtitle: "ซอฟต์แวร์เฉพาะกิจ",
    description:
      "รับเขียนซอฟต์แวร์เฉพาะกิจตามโจทย์ ออกแบบ Data Model · API · UI ครบวงจร — รองรับธุรกิจที่ต้องการระบบไม่ซ้ำใคร เริ่มจาก requirement เปล่า ไปจนถึง production พร้อมดูแลหลังส่งมอบ",
    features: [
      "ออกแบบ Data Model & API",
      "Frontend + Backend Full-stack",
      "Cloud Deploy (AWS / GCP / Azure)",
      "CI/CD · Automated Testing",
      "30 วัน Hypercare หลังส่งมอบ",
      "เอกสาร Technical Documentation",
    ],
    duration: "เริ่มต้น 8 สัปดาห์",
    startingPrice: "ตามขอบเขตงาน",
    accent: "#9B59B6",
    featured: false,
    extraOnly: true,
    meta: {
      title: "Custom Software Development — รับเขียนซอฟต์แวร์เฉพาะกิจ | RubKianCode",
      description:
        "บริการรับเขียนซอฟต์แวร์เฉพาะกิจตามโจทย์ — Data Model, API, Frontend, Backend, Cloud Deploy พร้อมดูแลหลังส่งมอบ สำหรับธุรกิจที่ต้องการระบบไม่ซ้ำใคร",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="2" y="2" width="12" height="2" />
          <rect x="2" y="2" width="2" height="12" />
          <rect x="12" y="2" width="2" height="12" />
          <rect x="2" y="12" width="12" height="2" />
          <rect x="6" y="6" width="4" height="4" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#9B59B6" label="CODE" />,
  },
  {
    slug: "web-ecommerce",
    num: "02",
    title: "Web & E-commerce",
    subtitle: "เว็บไซต์องค์กร · ร้านค้าออนไลน์",
    description:
      "พัฒนาเว็บไซต์องค์กร, Landing Page, Multi-page Information Site และ Online Store ครบวงจร — ออกแบบ UX/UI ที่ Conversion สูง เชื่อมต่อระบบชำระเงินไทย และระบบ ERP/CRM หลังบ้าน",
    features: [
      "Corporate Website · Landing Page",
      "Online Store · Shopping Cart",
      "Payment Gateway (Omise · 2C2P · TrueMoney)",
      "SEO On-page · Schema Markup",
      "Multilingual · Multi-currency",
      "เชื่อม CRM / ERP / Inventory",
    ],
    duration: "เริ่มต้น 4 สัปดาห์",
    startingPrice: "35,000 บาท / ปี",
    accent: "#1ABC9C",
    featured: false,
    extraOnly: true,
    meta: {
      title: "Web & E-commerce Development — เว็บไซต์องค์กรและร้านค้าออนไลน์ | RubKianCode",
      description:
        "บริการทำเว็บไซต์องค์กร Landing Page และ Online Store ครบวงจร เชื่อม Payment Gateway ไทย และ CRM/ERP หลังบ้าน รองรับ SEO ตั้งแต่ on-page",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="2" y="3" width="12" height="10" />
        </g>
        <g fill="#0A2540">
          <rect x="4" y="5" width="8" height="2" />
          <rect x="4" y="8" width="6" height="2" />
        </g>
        <g fill="#E63946">
          <rect x="11" y="8" width="2" height="2" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#1ABC9C" label="WEB" />,
  },
  {
    slug: "mobile-app",
    num: "03",
    title: "Mobile App",
    subtitle: "iOS · Android · Cross-platform",
    description:
      "พัฒนา Mobile App สำหรับลูกค้า, ทีมขาย, พนักงาน — ทั้ง Native (iOS/Android) และ Cross-platform (React Native, Flutter) เชื่อมต่อระบบหลังบ้าน, Push Notification, Offline-mode พร้อมขึ้น Store ให้ครบ",
    features: [
      "iOS · Android Native / Cross-platform",
      "Push Notification · LINE Notify",
      "Offline-mode · Sync เมื่อต่อเน็ต",
      "App Store + Play Store Submission",
      "เชื่อม API หลังบ้าน",
      "Analytics & Crash Reporting",
    ],
    duration: "เริ่มต้น 8 สัปดาห์",
    startingPrice: "120,000 บาท",
    accent: "#E67E22",
    featured: false,
    extraOnly: true,
    meta: {
      title: "Mobile App Development — iOS, Android, React Native | RubKianCode",
      description:
        "บริการพัฒนา Mobile App สำหรับลูกค้าและทีมขาย — iOS, Android, Cross-platform พร้อม Push Notification, Offline-mode และเชื่อมระบบหลังบ้าน ขึ้น App Store ให้ครบ",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="3" y="2" width="10" height="12" />
        </g>
        <g fill="#0A2540">
          <rect x="5" y="4" width="6" height="2" />
          <rect x="5" y="7" width="6" height="2" />
          <rect x="5" y="10" width="4" height="2" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#E67E22" label="APP" />,
  },
  {
    slug: "data-analytics",
    num: "04",
    title: "Data & Analytics",
    subtitle: "BI · Data Warehouse · ETL",
    description:
      "วาง Data Warehouse, ETL Pipeline, BI Dashboard ใช้ตัดสินใจจากข้อมูลจริงไม่ใช่ความรู้สึก — รองรับ BigQuery, Snowflake, PostgreSQL พร้อม Looker Studio / Metabase / PowerBI Dashboard ที่ทีมเปิดดูเองได้",
    features: [
      "Data Warehouse Design",
      "ETL/ELT Pipeline (Airflow · dbt)",
      "BI Dashboard (Metabase · Looker · PowerBI)",
      "Cohort & Funnel Analysis",
      "Predictive Analytics & Forecasting",
      "Self-service Analytics สำหรับทีม",
    ],
    duration: "เริ่มต้น 6 สัปดาห์",
    startingPrice: "80,000 บาท",
    accent: "#16A085",
    featured: false,
    extraOnly: true,
    meta: {
      title: "Data & Analytics — BI Dashboard, Data Warehouse, ETL Pipeline | RubKianCode",
      description:
        "บริการวาง Data Warehouse, ETL Pipeline, BI Dashboard สำหรับ SME ไทย — รองรับ BigQuery/Snowflake/PostgreSQL พร้อม Self-service Analytics ให้ทีมเปิดดูข้อมูลเองได้",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="2" y="6" width="2" height="6" />
          <rect x="6" y="3" width="2" height="9" />
          <rect x="10" y="5" width="2" height="7" />
        </g>
        <g fill="#E63946">
          <rect x="2" y="13" width="12" height="1" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#16A085" label="DATA" />,
  },
  {
    slug: "pos-inventory",
    num: "05",
    title: "POS & Inventory",
    subtitle: "ระบบขายหน้าร้าน · คลังสินค้า",
    description:
      "ระบบ POS ขายหน้าร้านพร้อมจัดการคลังสินค้า รองรับหลายสาขา — ปรินต์ใบเสร็จ, ออกใบกำกับภาษีเต็มรูป/ย่อ, เชื่อมเครื่องอ่านบาร์โค้ด, รองรับ E-Tax สำหรับ VAT 7% และเชื่อมระบบบัญชีอัตโนมัติ",
    features: [
      "POS หน้าร้าน · Multi-branch",
      "Inventory · Stock Transfer ระหว่างสาขา",
      "Barcode · Receipt Printer · Cash Drawer",
      "ใบกำกับภาษี เต็มรูป / ย่อ · E-Tax",
      "เชื่อมระบบบัญชีและ E-commerce",
      "รายงานยอดขาย Real-time",
    ],
    duration: "เริ่มต้น 6 สัปดาห์",
    startingPrice: "55,000 บาท",
    accent: "#E91E63",
    featured: false,
    extraOnly: true,
    meta: {
      title: "POS & Inventory — ระบบขายหน้าร้านและคลังสินค้า Multi-branch | RubKianCode",
      description:
        "ระบบ POS ขายหน้าร้านและจัดการคลังสินค้า รองรับหลายสาขา ใบกำกับภาษี E-Tax เชื่อมระบบบัญชีและ E-commerce พร้อม Barcode Scanner และ Receipt Printer",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="4" y="2" width="8" height="3" />
          <rect x="2" y="5" width="12" height="8" />
          <rect x="4" y="13" width="8" height="2" />
        </g>
        <g fill="#0A2540">
          <rect x="6" y="7" width="4" height="2" />
          <rect x="5" y="9" width="6" height="2" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#E91E63" label="POS" />,
  },
  {
    slug: "it-consulting",
    num: "06",
    title: "IT Consulting",
    subtitle: "Tech Roadmap · Cloud Migration",
    description:
      "บริการที่ปรึกษาด้านเทคโนโลยี — วางแผน Tech Roadmap, สถาปัตยกรรมระบบ, Cloud Migration, Security Audit สำหรับ SME ที่ไม่มีทีม IT เอง หรือทีมเล็กแต่อยากโตอย่างเป็นระบบและประหยัดค่า cloud",
    features: [
      "Tech Strategy & Roadmap",
      "System Architecture Review",
      "Cloud Migration (On-premise → Cloud)",
      "Security Audit · OWASP Top 10",
      "Cost Optimization (AWS/GCP)",
      "Tech Hiring Support",
    ],
    duration: "ราย project · 2-8 สัปดาห์",
    startingPrice: "ตามขอบเขตงาน",
    accent: "#34495E",
    featured: false,
    extraOnly: true,
    meta: {
      title: "IT Consulting — ที่ปรึกษาเทคโนโลยี, Cloud Migration, Security Audit | RubKianCode",
      description:
        "บริการที่ปรึกษาด้านเทคโนโลยี Tech Roadmap, Cloud Migration, Security Audit สำหรับ SME ไทย — วางแผนระบบให้โตอย่างยั่งยืน ประหยัดค่า cloud และผ่าน Compliance",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="6" y="2" width="4" height="2" />
          <rect x="3" y="4" width="10" height="8" />
        </g>
        <g fill="#0A2540">
          <rect x="5" y="6" width="2" height="2" />
          <rect x="9" y="6" width="2" height="2" />
          <rect x="5" y="9" width="6" height="1" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#34495E" label="CONSULT" />,
  },
  {
    slug: "wishboard",
    num: "05",
    title: "Wishboard",
    subtitle: "การ์ดอวยพรดิจิทัล",
    description:
      "ระบบ Wishboard / Digital Greeting Card สำหรับงานแต่งงาน, วันเกิด, ปีใหม่, งานบริษัท — ผู้ร่วมงานสแกน QR เขียนคำอวยพรลง wall เดียวกัน เห็นแบบ Real-time พร้อมรองรับรูป/วิดีโอ/เสียง และ Export PDF เก็บเป็นที่ระลึก",
    features: [
      "Wishboard ออนไลน์ · QR Share",
      "Custom Background · ตามธีมงาน",
      "รองรับ ข้อความ · รูป · วิดีโอ · เสียง",
      "Real-time Wall · Live Display",
      "Moderation · กรองคำไม่เหมาะสม",
      "Export PDF · พิมพ์เก็บได้",
    ],
    duration: "เริ่มต้น 1 สัปดาห์",
    startingPrice: "25,000 บาท / event",
    accent: "#C2185B",
    featured: false,
    meta: {
      title: "Wishboard — การ์ดอวยพรดิจิทัลสำหรับงานอีเวนต์ | RubKianCode",
      description:
        "ระบบ Wishboard ออนไลน์ สำหรับงานแต่งงาน วันเกิด ปีใหม่ Corporate Event — สแกน QR เขียนคำอวยพรลง Live Wall เดียวกัน รองรับรูป/วิดีโอ/เสียง พร้อม Export PDF เก็บเป็นที่ระลึก",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="2" y="3" width="12" height="10" />
        </g>
        <g fill="#E63946">
          <rect x="5" y="6" width="2" height="1" />
          <rect x="9" y="6" width="2" height="1" />
          <rect x="4" y="7" width="8" height="1" />
          <rect x="5" y="8" width="6" height="1" />
          <rect x="6" y="9" width="4" height="1" />
          <rect x="7" y="10" width="2" height="1" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#C2185B" label="WISH" />,
  },
  {
    slug: "event-registration",
    num: "06",
    title: "ระบบลงทะเบียนงานอีเวนต์",
    subtitle: "Event Registration & Check-in",
    description:
      "ระบบรับสมัคร/ลงทะเบียนงานอีเวนต์ออนไลน์ พร้อม QR Code Check-in หน้างาน — รองรับ Ticket Tier (Early Bird, VIP, Group), เชื่อม Payment Gateway ไทย, Real-time Attendee Dashboard และ Export ข้อมูลเข้า CRM อัตโนมัติ เหมาะสำหรับงานสัมมนา, คอนเสิร์ต, Workshop, Trade Show",
    features: [
      "Custom Form · Multi-step Registration",
      "Ticket Tier · Early Bird · Group Discount",
      "Payment Gateway (Omise · 2C2P · พร้อมเพย์)",
      "QR Code Check-in หน้างาน",
      "Real-time Attendee Dashboard",
      "Export Excel · เชื่อม CRM อัตโนมัติ",
    ],
    duration: "เริ่มต้น 2 สัปดาห์",
    startingPrice: "35,000 บาท / event",
    accent: "#00ACC1",
    featured: false,
    meta: {
      title: "ระบบลงทะเบียนงานอีเวนต์ — Event Registration & QR Check-in | RubKianCode",
      description:
        "ระบบรับสมัครลงทะเบียนงานอีเวนต์ออนไลน์พร้อม QR Check-in หน้างาน รองรับ Ticket Tier, Payment Gateway ไทย, Real-time Dashboard, Export CRM สำหรับงานสัมมนา คอนเสิร์ต Workshop",
    },
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8">
        <g fill="#F1C40F">
          <rect x="2" y="4" width="12" height="8" />
        </g>
        <g fill="#0A2540">
          <rect x="4" y="6" width="2" height="2" />
          <rect x="7" y="6" width="2" height="2" />
          <rect x="10" y="6" width="2" height="2" />
          <rect x="4" y="9" width="2" height="2" />
          <rect x="10" y="9" width="2" height="2" />
        </g>
      </svg>
    ),
    art: <IconArt accent="#00ACC1" label="EVENT" />,
  },
]

// ════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

/** Service ที่ตั้ง featured: true → ขึ้น Core Services grid บน homepage (4 cards) */
export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured)
}

/** Service ที่ตั้ง extraOnly: true → ขึ้น Extra Services section (บริการทั่วไป 6 รายการ) */
export function getExtraServices(): Service[] {
  return SERVICES.filter((s) => s.extraOnly)
}

/**
 * สินค้าเฉพาะตัว (named products) — ทุก service ที่ไม่ใช่ extraOnly
 * รวม 4 featured + Wishboard + Event Registration + future products
 * ใช้บนหน้า /services เป็น Main Products grid
 */
export function getMainProducts(): Service[] {
  return SERVICES.filter((s) => !s.extraOnly)
}

export function getAllServices(): Service[] {
  return SERVICES
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  return SERVICES.filter((s) => s.slug !== slug && s.featured).slice(0, limit)
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

/**
 * IconArt — preview แบบ generic สำหรับ service ที่ไม่มี art เฉพาะตัว
 * ใช้ accent color เป็นพื้นหลัง + label ข้อความ pixel กลางจอ
 * เหมาะกับ Extra Services ที่ยังไม่มีรูป screenshot/ภาพประกอบ
 */
function IconArt({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ background: accent }}>
      {/* Pixel pattern background */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,0.5) 6px,rgba(255,255,255,0.5) 7px)",
        }}
      />
      {/* Center label box */}
      <div
        className="font-pixel relative bg-[#0A2540] px-5 py-3 text-base uppercase tracking-widest text-[#F1C40F] sm:px-6 sm:py-4 sm:text-lg"
        style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 white" }}
      >
        {label}
      </div>
      {/* Pixel corner accents */}
      <span aria-hidden className="absolute left-0 top-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute right-0 top-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute bottom-0 left-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute bottom-0 right-0 h-2 w-2 bg-[#F1C40F]" />
    </div>
  )
}

function MarketingArt() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0A2540]">
      <Image
        src="/images/example-products/marketing1.jpg"
        alt="Marketing Dashboard ของระบบการตลาด — รายได้ · ROAS · Attribution"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
        className="object-cover object-top"
      />
      {/* Pixel corner accents — 8-bit frame */}
      <span aria-hidden className="absolute left-0 top-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute right-0 top-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute bottom-0 left-0 h-2 w-2 bg-[#F1C40F]" />
      <span aria-hidden className="absolute bottom-0 right-0 h-2 w-2 bg-[#F1C40F]" />
      {/* Subtle scanline overlay (CRT feel) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.5) 3px,rgba(0,0,0,0.5) 4px)",
        }}
      />
    </div>
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
