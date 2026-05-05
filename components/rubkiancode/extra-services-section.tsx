// บริการเสริมอีก 6 ตัว — งาน end-to-end ที่ไม่อยู่ใน 3 ระบบหลัก
// แสดงเป็น grid 3 คอลัมน์บน desktop / 2 บน tablet / 1 บน mobile

import { SectionHead } from "./key-services-section"

type ExtraService = {
  num: string
  title: string
  description: string
  icon: React.ReactNode
}

const SERVICES: ExtraService[] = [
  {
    num: "/ 04",
    title: "Custom Software",
    description:
      "รับเขียนซอฟต์แวร์เฉพาะกิจตามโจทย์ ออกแบบ Data Model · API · UI ให้ครบวงจร",
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
  },
  {
    num: "/ 05",
    title: "Web & E-commerce",
    description:
      "เว็บไซต์องค์กร · Multi-page Information Site · Online Store ครบวงจร",
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
  },
  {
    num: "/ 06",
    title: "Mobile App",
    description:
      "iOS / Android App สำหรับลูกค้าและทีมขาย พร้อมเชื่อมต่อระบบหลังบ้าน",
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
  },
  {
    num: "/ 07",
    title: "Data & Analytics",
    description:
      "Data Warehouse · BI Dashboard · ETL Pipeline ใช้ตัดสินใจจากข้อมูลจริง",
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
  },
  {
    num: "/ 08",
    title: "POS & Inventory",
    description:
      "ระบบขายหน้าร้านและคลังสินค้า รองรับหลายสาขา ปรินต์ใบเสร็จ ภาษี",
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
  },
  {
    num: "/ 09",
    title: "IT Consulting",
    description:
      "วางแผนสถาปัตยกรรมระบบ · Cloud Migration · Security Audit · Tech Roadmap",
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
  },
]

export function ExtraServicesSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="FULL CATALOG · 06"
          heading="บริการเสริมอื่น ๆ"
          description="นอกจาก 3 ระบบหลัก เรายังรับงานพัฒนาแบบ End-to-End สำหรับธุรกิจที่ต้องการระบบเฉพาะทาง — ทำงานคู่กับทีม IT ของลูกค้าหรือทำให้ทั้งหมดก็ได้"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.num}
              className="relative bg-[#F4EDE0] p-6 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              <span className="font-pixel absolute right-3 top-3 text-[10px] uppercase text-[#0A2540]/40">
                {s.num}
              </span>
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-[#0A2540]"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #E63946" }}
              >
                {s.icon}
              </span>
              <h4 className="mb-2 text-base font-black uppercase text-[#0A2540]">{s.title}</h4>
              <p className="text-sm leading-relaxed text-[#0A2540]/75">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
