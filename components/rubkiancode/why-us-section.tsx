// 4 เหตุผลที่ผู้ประกอบการเลือกเรา + การ์ด terminal โชว์ activity log

import { SectionHead } from "./key-services-section"

type Reason = {
  title: string
  description: string
  iconColor: string
  icon: React.ReactNode
}

const REASONS: Reason[] = [
  {
    title: "คุยภาษาคนทำธุรกิจ",
    description:
      "เราอธิบายเรื่องเทคนิคเป็นภาษาที่ผู้บริหารเข้าใจ ไม่ใช้ศัพท์ไอทีให้สับสน — ตัดสินใจจาก ROI จริง",
    iconColor: "#F1C40F",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="#F1C40F">
        <rect x="6" y="2" width="4" height="2" />
        <rect x="3" y="4" width="10" height="2" />
        <rect x="2" y="6" width="12" height="6" />
        <rect x="3" y="12" width="10" height="2" />
        <rect x="6" y="14" width="4" height="2" />
      </svg>
    ),
  },
  {
    title: "ราคาชัด ไม่บานปลาย",
    description:
      "Quote เป็นลายลักษณ์อักษร แตกค่าใช้จ่ายให้เห็นทุกบรรทัด ทำเกินสโคปแจ้งล่วงหน้าเสมอ",
    iconColor: "#E63946",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="#E63946">
        <rect x="2" y="3" width="12" height="2" />
        <rect x="2" y="3" width="2" height="10" />
        <rect x="12" y="3" width="2" height="10" />
        <rect x="2" y="11" width="12" height="2" />
        <rect x="6" y="6" width="4" height="2" />
        <rect x="6" y="9" width="4" height="2" />
      </svg>
    ),
  },
  {
    title: "ส่งของตรงเวลา 100%",
    description:
      "120+ โปรเจกต์ที่ผ่านมา ส่งมอบตรงตามแผน ไม่เคยทิ้งงาน — มี SLA เป็นลายลักษณ์อักษร",
    iconColor: "#3498DB",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6">
        <rect x="3" y="2" width="10" height="12" fill="#3498DB" />
        <rect x="5" y="4" width="6" height="2" fill="#F1C40F" />
        <rect x="5" y="7" width="6" height="2" fill="#F4EDE0" />
        <rect x="5" y="10" width="4" height="2" fill="#F4EDE0" />
      </svg>
    ),
  },
  {
    title: "ดูแลหลังส่งมอบจริง",
    description:
      "ทุกระบบมี 30 วัน Hypercare ฟรี ต่อด้วย MA รายเดือน — รับสายตอบ LINE ภายใน 1 ชั่วโมง",
    iconColor: "#2ECC71",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-6 w-6" fill="#2ECC71">
        <rect x="3" y="6" width="10" height="2" />
        <rect x="5" y="4" width="6" height="2" />
        <rect x="3" y="6" width="2" height="6" />
        <rect x="11" y="6" width="2" height="6" />
        <rect x="5" y="10" width="6" height="2" />
        <rect x="6" y="12" width="4" height="2" />
      </svg>
    ),
  },
]

const LOG_ENTRIES = [
  { time: "2569-05-04 09:14", icon: "✔", iconColor: "#2ECC71", text: "sprint-12 demo · client approved" },
  { time: "2569-05-03 16:42", icon: "✔", iconColor: "#2ECC71", text: "deploy prod · v2.4.1" },
  { time: "2569-05-03 11:08", icon: "✔", iconColor: "#2ECC71", text: "142/142 tests passing" },
  { time: "2569-05-02 18:30", icon: "!", iconColor: "#F1C40F", text: "P95 latency · 142ms (target 200ms)" },
  { time: "2569-05-02 10:15", icon: "✔", iconColor: "#2ECC71", text: "handoff Aroi Foods · MA active" },
  { time: "2569-05-01 14:00", icon: "✔", iconColor: "#2ECC71", text: "Lucky Draw · 248,000 entries" },
  { time: "2569-04-30 22:11", icon: "✔", iconColor: "#2ECC71", text: "uptime · 99.97%" },
] as const

export function WhyUsSection() {
  return (
    <section id="why" className="bg-[#F4EDE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="WHY US · 04 REASONS"
          heading={
            <>
              ทำไมผู้ประกอบการ
              <br />
              เลือกเรา
            </>
          }
          description="เราไม่ใช่แค่บริษัทรับงาน — เราเป็นพาร์ทเนอร์ระยะยาว ที่อยู่กับลูกค้าตั้งแต่ Day 1 ไปจนถึงปีที่ 5 ของระบบ"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* รายการเหตุผล */}
          <div className="space-y-5">
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="flex gap-4 bg-white p-5 transition-transform hover:-translate-x-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[#0A2540]"
                  style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 " + r.iconColor }}
                >
                  {r.icon}
                </span>
                <div>
                  <h4 className="mb-1 text-base font-black uppercase text-[#0A2540]">{r.title}</h4>
                  <p className="text-sm leading-relaxed text-[#0A2540]/75">{r.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* การ์ด terminal — โชว์ project log จริง */}
          <aside
            className="overflow-hidden bg-[#0A2540]"
            style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #E63946" }}
          >
            <div className="flex items-center justify-between gap-3 bg-[#F1C40F] px-3 py-2">
              <span className="flex gap-1.5">
                <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
              </span>
              <span className="font-pixel text-[9px] uppercase text-[#0A2540]">PROJECT_LOG.TXT</span>
              <span className="font-pixel text-[9px] uppercase text-[#0A2540]">LIVE</span>
            </div>
            <div className="font-pixelify space-y-2 p-5 text-sm text-[#F4EDE0] sm:text-base">
              {LOG_ENTRIES.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[#F4EDE0]/40">{entry.time}</span>
                  <span style={{ color: entry.iconColor }}>{entry.icon}</span>
                  <span>{entry.text}</span>
                </div>
              ))}
              <div className="mt-4 flex gap-2 border-t border-[#F4EDE0]/20 pt-4">
                <span className="text-[#F1C40F]">&gt;</span>
                <span>4 active projects · 0 missed deadlines</span>
                <span className="rk-caret bg-[#F1C40F]" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
