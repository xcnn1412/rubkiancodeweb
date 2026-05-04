// แถบข้อความวิ่งระหว่าง Hero กับ KeyServices
// ตั้ง animation duration ที่ .rk-marquee-track ใน globals.css (ค่าเริ่มต้น 32s)

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
  // ทำซ้ำ 2 ชุดเพื่อให้ scroll วนได้เนียนตอน loop
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-[3px] border-[#0A2540] bg-[#0A2540] py-4"
    >
      <div className="rk-marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-pixel mx-8 inline-block text-sm uppercase tracking-widest text-[#F1C40F]"
          >
            {item}
            <span className="ml-8 text-[#E63946]">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
