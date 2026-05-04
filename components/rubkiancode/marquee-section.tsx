// แถบข้อความวิ่ง — บรรทัดเดียว loop ไม่มีช่องว่าง
//
// Trick การทำให้ loop เนียน:
//   1. ทำซ้ำ ITEMS 2 รอบ (translateX(-50%) จะวกมาเริ่มที่จุดเดียวกันพอดี)
//   2. label กับ ★ เป็น flex child แยกกัน → ใช้ flex gap คุมระยะให้สม่ำเสมอ
//      (ไม่ใช้ margin ผสม mx-3/mx-6 ที่ทำให้ rhythm เพี้ยน)
//
// ปรับความเร็ว: animation duration ที่ .rk-marquee-track ใน globals.css

import { Fragment } from "react"

const ITEMS = [
  "ระบบการตลาด",
  "OFFICE ERP",
  "LUCKY DRAW",
  "E-COMMERCE",
  "POS SYSTEM",
  "CRM",
  "HR / PAYROLL",
  "WAREHOUSE",
] as const

export function MarqueeSection() {
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div
      className="rk-marquee-viewport border-y-[3px] border-[#0A2540] bg-[#0A2540]"
      aria-hidden="true"
    >
      <div className="rk-marquee-track py-4">
        {loop.map((label, i) => (
          <Fragment key={i}>
            <span className="font-pixel text-xs uppercase tracking-[0.2em] text-[#F1C40F] sm:text-sm">
              {label}
            </span>
            <span className="font-pixel text-base text-[#E63946]">★</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
