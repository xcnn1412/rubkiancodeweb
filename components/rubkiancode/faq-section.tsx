// FAQ — accordion ใช้ <details> เพื่อให้ทำงานโดยไม่ต้องใช้ JS
// คำถามที่ผู้ประกอบการถามบ่อยก่อนเริ่มโปรเจกต์

import { SectionHead } from "./key-services-section"

const FAQS = [
  {
    q: "เริ่มต้นโปรเจกต์ต้องเตรียมอะไรบ้าง?",
    a: "เตรียมแค่โจทย์ที่อยากได้ และนัดประชุม 1 ชม.แรก — เราจะช่วยร่าง Scope, ทำ Wireframe และส่ง Quote เป็นลายลักษณ์อักษรให้ครบถ้วน ขั้นตอนนี้ฟรี ไม่มีค่ามัดจำ",
    open: true,
  },
  {
    q: "ราคาเริ่มต้นเท่าไหร่ และคิดอย่างไร?",
    a: "ระบบ Lucky Draw เริ่มที่ 35,000 บาท/event · ระบบ Marketing เริ่มที่ 180,000 บาท · Office ERP เริ่มที่ 480,000 บาท ทุกราคาแจกแจงค่าใช้จ่ายให้เห็นทุกบรรทัด ไม่มีค่าแฝง",
  },
  {
    q: "ระบบเสร็จแล้ว ใครดูแลต่อ?",
    a: "มี 30 วันแรกเป็น Hypercare ฟรี (รับสายภายใน 1 ชม.) จากนั้นเลือกได้ว่าจะต่อ MA รายเดือนกับเรา หรือถ้าทีมลูกค้าจะรับช่วงต่อ เราส่งมอบ Source code · เอกสาร · Training ครบให้",
  },
  {
    q: "สามารถปรับปรุงระบบเดิมได้หรือไม่?",
    a: "ได้ครับ เรารับงาน Refactor / Migration ของระบบที่มีอยู่แล้ว เช่น เปลี่ยนจาก Excel เป็น ERP, ย้าย On-premise ขึ้น Cloud หรือต่อระบบเข้ากับ API ใหม่ — เริ่มจาก Audit ก่อน ให้เห็นภาพแล้วค่อยตัดสินใจ",
  },
  {
    q: "เก็บข้อมูลลูกค้าปลอดภัยแค่ไหน?",
    a: "ทุกระบบทำตาม PDPA ตั้งแต่ Day 1 มี Audit log ครบ ใช้ Encrypted at rest + in transit · backup รายวันพร้อม retention 30 วัน · พร้อม recovery test ทุกไตรมาส",
  },
] as const

export function FaqSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="FAQ · 05"
          heading={
            <>
              คำถามที่ผู้ประกอบการ
              <br />
              มักถามก่อนเริ่ม
            </>
          }
          description="คำตอบครบ ไม่อ้อม — ถ้ามีคำถามอื่นทักผ่าน LINE ได้ตลอดเวลาทำการ"
        />

        <div className="mt-12 mx-auto max-w-3xl space-y-4">
          {FAQS.map((item, i) => (
            <details
              key={i}
              open={"open" in item ? item.open : false}
              className="group bg-[#F4EDE0] transition-transform hover:-translate-x-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-base font-bold text-[#0A2540] [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-3">
                  <span className="font-pixel mt-0.5 inline-block bg-[#E63946] px-2 py-1 text-[10px] text-white">
                    Q.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.q}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-pixel text-xl text-[#E63946] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="border-t-[3px] border-[#0A2540] bg-white px-5 py-4 text-sm leading-relaxed text-[#0A2540]/80">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
