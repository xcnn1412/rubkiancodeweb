import { ArrowIcon } from "./icons"

const STATS = [
  { value: "120", suffix: "+", label: "PROJECTS" },
  { value: "8", suffix: "YR", label: "EXP" },
  { value: "99", suffix: "%", label: "UPTIME" },
  { value: "24/7", suffix: "", label: "SUPPORT" },
] as const

const PILLS = [
  { label: "Marketing System", color: "#E63946" },
  { label: "Office ERP", color: "#3498DB" },
  { label: "Lucky Draw", color: "#F1C40F" },
] as const

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#F4EDE0] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* คอลัมน์ซ้าย — เนื้อหาหลัก */}
        <div>
          <span
            className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
            style={{ boxShadow: "4px 4px 0 #E63946" }}
          >
            ★ SOFTWARE HOUSE · LV.99
          </span>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] text-[#0A2540] sm:text-5xl lg:text-6xl">
            เขียนโปรแกรมทุกระบบ
            <br />
            เพื่อ<em className="not-italic text-[#E63946]">ผู้ประกอบการ</em>ไทย
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">
            RubKianCode คือพาร์ทเนอร์ด้านซอฟต์แวร์ที่พึ่งพาได้ — รับผลิต จำหน่าย
            และให้คำปรึกษา เน้นระบบการตลาดที่วัดผลได้ ระบบภายในออฟฟิศที่ใช้งานจริง
            และระบบ Lucky Draw สำหรับงานอีเวนต์ ส่งมอบเสร็จ ใช้งานได้ทันที
            <span className="rk-caret" />
          </p>

          {/* Pills โชว์ 3 บริการหลัก */}
          <div className="mt-6 flex flex-wrap gap-3">
            {PILLS.map((p) => (
              <span
                key={p.label}
                className="font-pixel px-3 py-2 text-[10px] uppercase tracking-wider text-white"
                style={{
                  background: p.color,
                  border: "2px solid #0A2540",
                  boxShadow: "3px 3px 0 #0A2540",
                }}
              >
                {p.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              เริ่มโปรเจกต์
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              ดูผลงาน
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white p-3 text-center"
                style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
              >
                <div className="font-pixel text-lg text-[#E63946] sm:text-xl">
                  {s.value}
                  {s.suffix && <small className="text-sm">{s.suffix}</small>}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#0A2540]/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* คอลัมน์ขวา — Mockup arcade console */}
        <div className="relative">
          <ArcadeConsole />
          <span
            className="font-pixel absolute -top-3 -left-3 bg-[#F1C40F] px-3 py-2 text-[10px] uppercase text-[#0A2540]"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            ★ START NOW
          </span>
          <span
            className="font-pixel absolute -bottom-3 -right-3 bg-[#2ECC71] px-3 py-2 text-[10px] uppercase text-white"
            style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 #0A2540" }}
          >
            ⚡ ON-TIME 100%
          </span>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   ARCADE CONSOLE — กล่องโชว์ระบบที่ทำได้ พร้อม progress bar
   ========================================================== */
function ArcadeConsole() {
  return (
    <div className="bg-[#0A2540]" style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #E63946" }}>
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 bg-[#F1C40F] px-3 py-2">
        <span className="flex gap-1.5">
          <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
          <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
          <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
        </span>
        <span className="font-pixel text-[9px] uppercase text-[#0A2540]">RUBKIAN_CONSOLE.EXE</span>
        <span className="font-pixel text-[9px] uppercase text-[#0A2540]">ONLINE</span>
      </div>

      <div className="space-y-4 bg-[#F4EDE0] p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-pixel text-xs uppercase text-[#0A2540]">SELECT YOUR SYSTEM</span>
          <span className="font-pixel text-xs uppercase text-[#E63946]">P1 READY</span>
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-3 gap-3">
          <ArcadeTile color="#E63946" label="MARKETING" pts="+200% ROI">
            <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
              <g fill="#E63946">
                <rect x="2" y="10" width="2" height="4" />
                <rect x="5" y="7" width="2" height="7" />
                <rect x="8" y="4" width="2" height="10" />
                <rect x="11" y="2" width="2" height="12" />
              </g>
              <rect x="13" y="2" width="1" height="1" fill="#F1C40F" />
            </svg>
          </ArcadeTile>
          <ArcadeTile color="#3498DB" label="OFFICE ERP" pts="SAVE 40 HRS">
            <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
              <g fill="#3498DB">
                <rect x="2" y="2" width="12" height="2" />
                <rect x="2" y="6" width="12" height="2" />
                <rect x="2" y="10" width="12" height="2" />
              </g>
              <g fill="#F1C40F">
                <rect x="3" y="3" width="1" height="1" />
                <rect x="3" y="7" width="1" height="1" />
                <rect x="3" y="11" width="1" height="1" />
              </g>
            </svg>
          </ArcadeTile>
          <ArcadeTile color="#F1C40F" label="LUCKY DRAW" pts="250K ENTRIES">
            <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
              <g fill="#F1C40F">
                <rect x="6" y="2" width="4" height="2" />
                <rect x="4" y="4" width="8" height="2" />
                <rect x="2" y="6" width="12" height="6" />
                <rect x="6" y="12" width="4" height="2" />
              </g>
              <g fill="#0A2540">
                <rect x="6" y="8" width="4" height="2" />
              </g>
            </svg>
          </ArcadeTile>
        </div>

        {/* Stat row */}
        <div
          className="flex items-center justify-between gap-2 bg-white p-3 text-center text-xs"
          style={{ border: "2px solid #0A2540" }}
        >
          <ArcadeStat k="UPTIME" v="99.97%" tone="green" />
          <ArcadeStat k="SLA" v="24/7" />
          <ArcadeStat k="DEPLOYED" v="2026" tone="red" />
        </div>

        {/* Build / QA progress */}
        <div className="space-y-2">
          <ProgressRow label="BUILD PROGRESS" value="87%" pct={87} fill="#2ECC71" />
          <ProgressRow label="QA COVERAGE" value="82%" pct={82} fill="#F1C40F" />
        </div>
      </div>
    </div>
  )
}

function ArcadeTile({
  color,
  label,
  pts,
  children,
}: {
  color: string
  label: string
  pts: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 bg-white p-2 text-center transition-transform hover:-translate-y-0.5"
      style={{ border: "2px solid #0A2540", boxShadow: "3px 3px 0 " + color }}
    >
      <span>{children}</span>
      <span className="font-pixel text-[9px] uppercase text-[#0A2540]">{label}</span>
      <span className="font-pixel text-[8px] uppercase" style={{ color }}>
        {pts}
      </span>
    </div>
  )
}

function ArcadeStat({ k, v, tone }: { k: string; v: string; tone?: "green" | "red" }) {
  const valColor = tone === "green" ? "#2ECC71" : tone === "red" ? "#E63946" : "#0A2540"
  return (
    <div className="flex flex-col">
      <span className="font-pixel text-[9px] uppercase text-[#0A2540]/60">{k}</span>
      <span className="font-pixel text-sm font-black" style={{ color: valColor }}>
        {v}
      </span>
    </div>
  )
}

function ProgressRow({
  label,
  value,
  pct,
  fill,
}: {
  label: string
  value: string
  pct: number
  fill: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-pixel text-[9px] uppercase text-[#0A2540]/70">{label}</span>
        <span className="font-pixel text-[10px] text-[#0A2540]">{value}</span>
      </div>
      <div className="mt-1 h-3 w-full bg-white" style={{ border: "2px solid #0A2540" }}>
        <span className="block h-full" style={{ width: `${pct}%`, background: fill }} />
      </div>
    </div>
  )
}
