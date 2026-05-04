// 4 ขั้นตอนการทำงานตั้งแต่คุยโจทย์จนส่งมอบ
// แสดงเป็นการ์ดเรียง + เส้นเชื่อมแสดง flow

import { SectionHead } from "./key-services-section"

const STEPS = [
  {
    num: "01",
    title: "DISCOVERY",
    description:
      "คุยโจทย์ ทำความเข้าใจธุรกิจ ระบุเป้าหมาย KPI และทรัพยากรที่มี — ฟรี ไม่มัดจำ",
    duration: "1–2 สัปดาห์",
    accent: "#E63946",
  },
  {
    num: "02",
    title: "BLUEPRINT",
    description:
      "ออกแบบสถาปัตยกรรม Wireframe และ Quote ราคาเป็นลายลักษณ์อักษร — ไม่บานปลาย",
    duration: "1 สัปดาห์",
    accent: "#F1C40F",
  },
  {
    num: "03",
    title: "BUILD",
    description:
      "พัฒนาเป็น Sprint 2 สัปดาห์ มี Demo ทุกศุกร์ ปรับได้ตลอด — โปร่งใสด้วย Project Board",
    duration: "4–16 สัปดาห์",
    accent: "#3498DB",
  },
  {
    num: "04",
    title: "HANDOFF",
    description:
      "ส่งมอบพร้อม Runbook · เทรนนิ่ง · 30 วันแรก Hypercare — ดูแลต่อเป็นรายเดือน",
    duration: "+ 4 สัปดาห์",
    accent: "#2ECC71",
  },
] as const

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="HOW WE WORK · 04 STEPS"
          heading={
            <>
              วิธีการทำงาน
              <br />
              ที่ผู้ประกอบการสบายใจ
            </>
          }
          description="ขั้นตอนที่ชัดเจน วัดผลได้ ทุกสัปดาห์มี Demo ทุก phase มีเอกสารยืนยัน — คุณรู้สถานะโครงการตลอดเวลา ไม่ต้องตามถามว่าถึงไหนแล้ว"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className="relative flex flex-col bg-[#F4EDE0] p-6 transition-transform hover:-translate-y-1"
              style={{ border: "3px solid #0A2540", boxShadow: "6px 6px 0 " + s.accent }}
            >
              <span
                className="font-pixel mb-4 inline-flex h-12 w-12 items-center justify-center text-xs"
                style={{
                  background: s.accent,
                  border: "2px solid #0A2540",
                  boxShadow: "3px 3px 0 #0A2540",
                  color: s.accent === "#F1C40F" ? "#0A2540" : "white",
                }}
              >
                {s.num}
              </span>

              <h4 className="font-pixel mb-3 text-base text-[#0A2540]">{s.title}</h4>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-[#0A2540]/75">
                {s.description}
              </p>

              <span
                className="font-pixel inline-block self-start bg-[#0A2540] px-3 py-1.5 text-[10px] uppercase text-[#F1C40F]"
              >
                {s.duration}
              </span>

              {/* ลูกศรเชื่อมไปขั้นต่อไป (เฉพาะบน lg+) */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-5 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-[#0A2540] lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
