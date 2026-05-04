// 3 บริการหลักของ RubKianCode
// แต่ละการ์ดมี SVG illustration แบบพิกเซลคู่กับ feature list

type KeyService = {
  num: string
  title: string
  subtitle: string
  description: string
  features: string[]
  duration: string
  accent: string
  art: React.ReactNode
}

const SERVICES: KeyService[] = [
  {
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
    ],
    duration: "เริ่มต้น 4 สัปดาห์",
    accent: "#E63946",
    art: <MarketingArt />,
  },
  {
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
    ],
    duration: "เริ่มต้น 12 สัปดาห์",
    accent: "#3498DB",
    art: <ErpArt />,
  },
  {
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
    ],
    duration: "เริ่มต้น 1 สัปดาห์ · ต่อ event",
    accent: "#F1C40F",
    art: <LuckyDrawArt />,
  },
]

export function KeyServicesSection() {
  return (
    <section id="services" className="bg-[#F4EDE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="CORE SERVICES · 03"
          heading={
            <>
              3 ระบบหลัก
              <br />
              ที่เราชำนาญที่สุด
            </>
          }
          description="ชูจุดแข็ง 3 ด้านที่ผู้ประกอบการต้องการมากที่สุด พร้อมเทมเพลตที่ติดตั้งได้ใน 2 สัปดาห์ และปรับแต่งได้ตามขนาดธุรกิจ — ไม่ว่าจะเริ่มจาก 0 หรือต่อยอดของเดิม"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.num}
              className="flex flex-col bg-white transition-transform hover:-translate-x-1 hover:-translate-y-1"
              style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 " + s.accent }}
            >
              <div
                className="flex items-start gap-3 border-b-[3px] border-[#0A2540] p-5"
                style={{ background: s.accent }}
              >
                <span className="font-pixel bg-[#0A2540] px-2 py-1.5 text-xs text-[#F1C40F]">
                  {s.num}
                </span>
                <h3 className="text-lg font-black uppercase leading-tight text-white sm:text-xl">
                  {s.title}
                  <br />
                  <span className="text-sm normal-case opacity-90">{s.subtitle}</span>
                </h3>
              </div>

              <div className="border-b-[3px] border-[#0A2540] bg-[#F4EDE0]">{s.art}</div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="text-sm leading-relaxed text-[#0A2540]/80">{s.description}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0A2540]">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-2 w-2 flex-shrink-0"
                        style={{ background: s.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="flex items-center justify-between border-t-[3px] border-[#0A2540] bg-[#0A2540] px-5 py-3 text-xs uppercase text-[#F1C40F]"
              >
                <span className="font-pixel">{s.duration}</span>
                <span style={{ color: s.accent }}>▶</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============== ส่วนย่อย: หัวเรื่องของ section (ใช้ซ้ำทั้งหน้า) ============== */
export function SectionHead({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string
  heading: React.ReactNode
  description: string
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-12">
      <div>
        <span
          className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
          style={{ boxShadow: "4px 4px 0 #E63946" }}
        >
          {eyebrow}
        </span>
        <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </div>
      <p className="text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">{description}</p>
    </div>
  )
}

/* ============== Pixel art illustrations ============== */
function MarketingArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-44 w-full">
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
      <text x="220" y="160" className="font-pixelify" fontSize="14" fill="#0A2540">
        +218%
      </text>
    </svg>
  )
}

function ErpArt() {
  return (
    <svg viewBox="0 0 320 200" className="pixel-svg block h-44 w-full">
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
    <svg viewBox="0 0 320 200" className="pixel-svg block h-44 w-full">
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
