// บริษัทจดทะเบียนถูกต้อง — ใช้ข้อมูลจริงจากหนังสือรับรองสร้างความเชื่อมั่น
// Source: หนังสือรับรอง DBD เลขที่ E10091220281823 (ออก 14 มี.ค. 2569)

import { SectionHead } from "./key-services-section"

type TrustFact = {
  num: string
  label: string
  value: string
  sub: string
  accent: string
  icon: React.ReactNode
}

const FACTS: TrustFact[] = [
  {
    num: "01",
    label: "CERTIFIED",
    value: "010 5569 041779",
    sub: "เลขทะเบียนนิติบุคคล รับรองโดยกรมพัฒนาธุรกิจการค้า",
    accent: "#2ECC71",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
        {/* shield outline */}
        <g fill="#2ECC71">
          <rect x="4" y="1" width="8" height="2" />
          <rect x="2" y="3" width="12" height="6" />
          <rect x="3" y="9" width="10" height="2" />
          <rect x="4" y="11" width="8" height="2" />
          <rect x="6" y="13" width="4" height="2" />
        </g>
        {/* check mark */}
        <g fill="white">
          <rect x="6" y="6" width="2" height="2" />
          <rect x="8" y="8" width="2" height="1" />
          <rect x="10" y="5" width="2" height="2" />
          <rect x="11" y="3" width="2" height="2" />
        </g>
      </svg>
    ),
  },
  {
    num: "02",
    label: "CAPITAL",
    value: "1,000,000 ฿",
    sub: "ทุนจดทะเบียน หนึ่งล้านบาทถ้วน · ชำระเต็มจำนวน",
    accent: "#F1C40F",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
        {/* coin */}
        <g fill="#F1C40F">
          <rect x="4" y="2" width="8" height="2" />
          <rect x="3" y="4" width="10" height="2" />
          <rect x="2" y="6" width="12" height="4" />
          <rect x="3" y="10" width="10" height="2" />
          <rect x="4" y="12" width="8" height="2" />
        </g>
        {/* ฿ symbol */}
        <g fill="#0A2540">
          <rect x="7" y="5" width="2" height="6" />
          <rect x="6" y="5" width="3" height="1" />
          <rect x="6" y="7" width="3" height="1" />
          <rect x="6" y="10" width="3" height="1" />
          <rect x="9" y="6" width="1" height="1" />
          <rect x="9" y="8" width="1" height="2" />
        </g>
      </svg>
    ),
  },
  {
    num: "03",
    label: "DIRECTORS",
    value: "3 ท่าน",
    sub: "กรรมการบริหารลงนามผูกพันร่วมกันทุกธุรกรรม",
    accent: "#3498DB",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
        {/* 3 heads */}
        <g fill="#3498DB">
          {/* head 1 */}
          <rect x="1" y="3" width="3" height="3" />
          <rect x="0" y="6" width="5" height="4" />
          {/* head 2 (center, slightly higher) */}
          <rect x="6" y="2" width="4" height="4" />
          <rect x="5" y="6" width="6" height="5" />
          {/* head 3 */}
          <rect x="12" y="3" width="3" height="3" />
          <rect x="11" y="6" width="5" height="4" />
        </g>
        {/* shadow ground */}
        <rect x="0" y="14" width="16" height="2" fill="#0A2540" opacity="0.2" />
      </svg>
    ),
  },
  {
    num: "04",
    label: "HEADQUARTERS",
    value: "กรุงเทพฯ",
    sub: "สำนักงานใหญ่ ตั้งอยู่ที่เขตประเวศ กรุงเทพมหานคร",
    accent: "#E63946",
    icon: (
      <svg viewBox="0 0 16 16" className="pixel-svg h-8 w-8" fill="none">
        {/* pin/marker */}
        <g fill="#E63946">
          <rect x="5" y="1" width="6" height="2" />
          <rect x="3" y="3" width="10" height="6" />
          <rect x="4" y="9" width="8" height="2" />
          <rect x="6" y="11" width="4" height="2" />
          <rect x="7" y="13" width="2" height="2" />
        </g>
        {/* inner dot */}
        <g fill="white">
          <rect x="6" y="4" width="4" height="4" />
        </g>
        <g fill="#E63946">
          <rect x="7" y="5" width="2" height="2" />
        </g>
      </svg>
    ),
  },
] as const

// ขอบเขตธุรกิจ 10 ข้อ — แสดงเป็น chips เพื่อยืนยันว่าครอบคลุมงานซอฟต์แวร์ครบ
const SCOPE = [
  "Software Development",
  "UI/UX Design",
  "Software Licensing",
  "IT Consulting",
  "Maintenance",
  "Cloud Hosting",
  "IoT / Hardware",
  "IT Trading",
  "Sales Agent",
  "Training",
] as const

// พลุ pixel-art — ยิงขึ้นฟ้า ระเบิด แล้วจาง (launch animation 3 variants)
const FIREWORKS: Array<{
  left: string
  top: string
  size: number
  color: string
  delay: string
  anim: string
}> = [
  { left: "3%",  top: "10%", size: 80, color: "#F1C40F", delay: "0s",   anim: "rk-firework-launch-a" },
  { left: "92%", top: "13%", size: 70, color: "#E63946", delay: "1.4s", anim: "rk-firework-launch-b" },
  { left: "1%",  top: "50%", size: 90, color: "#3498DB", delay: "2.6s", anim: "rk-firework-launch-a" },
  { left: "94%", top: "52%", size: 65, color: "#2ECC71", delay: "0.7s", anim: "rk-firework-launch-c" },
  { left: "12%", top: "82%", size: 75, color: "#9B59B6", delay: "3.8s", anim: "rk-firework-launch-b" },
  { left: "86%", top: "85%", size: 80, color: "#E67E22", delay: "2.1s", anim: "rk-firework-launch-a" },
  { left: "45%", top: "8%",  size: 50, color: "#E63946", delay: "5.0s", anim: "rk-firework-launch-c" },
  { left: "55%", top: "92%", size: 55, color: "#3498DB", delay: "1.9s", anim: "rk-firework-launch-c" },
  { left: "30%", top: "45%", size: 45, color: "#F1C40F", delay: "4.2s", anim: "rk-firework-launch-c" },
  { left: "70%", top: "50%", size: 48, color: "#9B59B6", delay: "3.1s", anim: "rk-firework-launch-c" },
]

// Sparkles pikxel — ดาวเล็กๆ ตามมุม
const SPARKLES: Array<{ left: string; top: string; color: string; delay: string }> = [
  { left: "22%", top: "18%", color: "#F1C40F", delay: "0s"   },
  { left: "76%", top: "22%", color: "#E63946", delay: "0.5s" },
  { left: "48%", top: "8%",  color: "#3498DB", delay: "1.0s" },
  { left: "62%", top: "14%", color: "#2ECC71", delay: "1.5s" },
  { left: "8%",  top: "38%", color: "#9B59B6", delay: "0.3s" },
  { left: "90%", top: "40%", color: "#F1C40F", delay: "0.8s" },
  { left: "26%", top: "72%", color: "#E63946", delay: "1.2s" },
  { left: "78%", top: "76%", color: "#3498DB", delay: "0.6s" },
  { left: "52%", top: "88%", color: "#2ECC71", delay: "1.4s" },
  { left: "38%", top: "62%", color: "#F1C40F", delay: "0.9s" },
  { left: "70%", top: "5%",  color: "#9B59B6", delay: "2.0s" },
  { left: "15%", top: "60%", color: "#E67E22", delay: "1.7s" },
]

export function TrustSection() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden border-y-[3px] border-[#0A2540] bg-white py-14 sm:py-20 lg:py-28"
    >
      {/* ── Background พลุยิงขึ้นฟ้า + ดาวประกาย ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {FIREWORKS.map((f, i) => (
          <div
            key={`fw-${i}`}
            className={`absolute ${f.anim}`}
            style={{
              left: f.left,
              top: f.top,
              animationDelay: f.delay,
            }}
          >
            <FireworkBurst size={f.size} color={f.color} />
          </div>
        ))}
        {SPARKLES.map((s, i) => (
          <div
            key={`sp-${i}`}
            className="absolute rk-twinkle"
            style={{
              left: s.left,
              top: s.top,
              animationDelay: s.delay,
            }}
          >
            <PixelSparkle color={s.color} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="★ VERIFIED · LV.MAX"
          heading={
            <>
              จดทะเบียน
              <br />
              ถูกต้องตามกฎหมาย
              <br />
              <span className="text-[#E63946]">ตรวจสอบได้</span>ทุกข้อมูล
            </>
          }
          description="RubKianCode คือบริษัทจริง จดทะเบียนกับกรมพัฒนาธุรกิจการค้า กระทรวงพาณิชย์ มีตัวตนทางกฎหมายชัดเจน — มั่นใจว่าทุกโปรเจกต์มีคนรับผิดชอบ ไม่ใช่ทีมแฝงที่หายไปหลังรับเงิน"
        />

        {/* === Trust facts grid === */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <li
              key={f.num}
              className="group flex flex-col bg-[#F4EDE0] p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              {/* Header — num + icon */}
              <div className="flex items-start justify-between gap-3">
                <span
                  className="font-pixel bg-[#0A2540] px-2 py-1.5 text-[10px] text-[#F1C40F]"
                  style={{ boxShadow: "2px 2px 0 " + f.accent }}
                >
                  {f.num}
                </span>
                <span>{f.icon}</span>
              </div>
              {/* Label */}
              <span className="font-pixel mt-4 text-[10px] uppercase tracking-widest text-[#0A2540]/60">
                {f.label}
              </span>
              {/* Value (big) */}
              <span
                className="mt-1 text-2xl font-black text-[#0A2540] sm:text-3xl"
                style={{ color: f.accent === "#F1C40F" ? "#0A2540" : f.accent }}
              >
                {f.value}
              </span>
              {/* Sub-description */}
              <p className="mt-3 text-sm leading-relaxed text-[#0A2540]/75">{f.sub}</p>
            </li>
          ))}
        </ul>

        {/* === Verification panel === */}
        <div
          className="mt-12 grid gap-8 bg-[#0A2540] p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-12"
          style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #E63946" }}
        >
          {/* Left — info */}
          <div>
            <span
              className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
              style={{ boxShadow: "3px 3px 0 #E63946" }}
            >
              ★ DBD CERTIFICATE
            </span>
            <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
              ตรวจสอบบริษัทผ่านระบบราชการได้ทุกเมื่อ
            </h3>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2 sm:text-base">
              <div className="flex flex-col">
                <dt className="font-pixel text-[10px] uppercase tracking-widest text-[#F1C40F]/80">
                  ชื่อบริษัท
                </dt>
                <dd className="mt-1 font-bold text-white">บริษัท รับเขียนโค้ด จำกัด</dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-pixel text-[10px] uppercase tracking-widest text-[#F1C40F]/80">
                  จดทะเบียนเมื่อ
                </dt>
                <dd className="mt-1 font-bold text-white">27 กุมภาพันธ์ 2569</dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-pixel text-[10px] uppercase tracking-widest text-[#F1C40F]/80">
                  หน่วยงานรับรอง
                </dt>
                <dd className="mt-1 font-bold text-white">
                  กรมพัฒนาธุรกิจการค้า · กระทรวงพาณิชย์
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="font-pixel text-[10px] uppercase tracking-widest text-[#F1C40F]/80">
                  หนังสือรับรองเลขที่
                </dt>
                <dd className="mt-1 font-mono font-bold text-white">E10091220281823</dd>
              </div>
            </dl>
            <a
              href="https://datawarehouse.dbd.go.th/company/profile/50105569041779"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #F1C40F", boxShadow: "5px 5px 0 #E63946" }}
            >
              ตรวจสอบที่ DBD
              <svg viewBox="0 0 16 16" className="pixel-svg h-4 w-4" fill="currentColor">
                <rect x="2" y="7" width="9" height="2" />
                <rect x="9" y="5" width="2" height="2" />
                <rect x="11" y="7" width="2" height="2" />
                <rect x="9" y="9" width="2" height="2" />
              </svg>
            </a>
          </div>

          {/* Right — pixel-art certificate badge */}
          <div className="flex items-center justify-center lg:justify-end">
            <PixelCertificate />
          </div>
        </div>

        {/* === Business scope (10 categories) === */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "3px 3px 0 #3498DB" }}
            >
              SCOPE · 10
            </span>
            <span className="font-pixel text-[10px] uppercase tracking-widest text-[#0A2540]/60">
              ขอบเขตวัตถุประสงค์ธุรกิจ
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SCOPE.map((s, i) => (
              <li
                key={s}
                className="font-pixel bg-white px-3 py-2 text-[10px] uppercase tracking-wider text-[#0A2540]"
                style={{
                  border: "2px solid #0A2540",
                  boxShadow: `2px 2px 0 ${
                    ["#E63946", "#F1C40F", "#2ECC71", "#3498DB"][i % 4]
                  }`,
                }}
              >
                {String(i + 1).padStart(2, "0")} · {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PIXEL CERTIFICATE — ตรา DBD pixel-art
   ══════════════════════════════════════════════════════ */
function PixelCertificate() {
  return (
    <div
      className="relative bg-[#F4EDE0] p-4"
      style={{ border: "3px solid #F1C40F", boxShadow: "6px 6px 0 #E63946" }}
    >
      <svg viewBox="0 0 80 96" className="pixel-svg h-32 w-auto sm:h-40" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ribbon */}
        <rect x="6" y="74" width="8" height="22" fill="#E63946" />
        <rect x="66" y="74" width="8" height="22" fill="#E63946" />
        <rect x="14" y="92" width="6" height="4" fill="#0A2540" />
        <rect x="60" y="92" width="6" height="4" fill="#0A2540" />

        {/* Outer seal circle (square approximation) */}
        <rect x="14" y="6" width="52" height="4" fill="#F1C40F" />
        <rect x="10" y="10" width="60" height="4" fill="#F1C40F" />
        <rect x="6" y="14" width="68" height="56" fill="#F1C40F" />
        <rect x="10" y="70" width="60" height="4" fill="#F1C40F" />
        <rect x="14" y="74" width="52" height="2" fill="#F1C40F" />

        {/* Inner circle */}
        <rect x="18" y="14" width="44" height="2" fill="#0A2540" />
        <rect x="14" y="16" width="52" height="2" fill="#0A2540" />
        <rect x="12" y="18" width="56" height="44" fill="#0A2540" />
        <rect x="14" y="62" width="52" height="2" fill="#0A2540" />
        <rect x="18" y="64" width="44" height="2" fill="#0A2540" />

        {/* Inner gold center */}
        <rect x="22" y="22" width="36" height="36" fill="#F1C40F" />

        {/* "DBD" text — pixel letters */}
        {/* D */}
        <g fill="#0A2540">
          <rect x="26" y="30" width="2" height="12" />
          <rect x="26" y="30" width="6" height="2" />
          <rect x="26" y="40" width="6" height="2" />
          <rect x="32" y="32" width="2" height="8" />
        </g>
        {/* B */}
        <g fill="#0A2540">
          <rect x="36" y="30" width="2" height="12" />
          <rect x="36" y="30" width="6" height="2" />
          <rect x="36" y="35" width="6" height="2" />
          <rect x="36" y="40" width="6" height="2" />
          <rect x="42" y="31" width="2" height="4" />
          <rect x="42" y="37" width="2" height="4" />
        </g>
        {/* D */}
        <g fill="#0A2540">
          <rect x="46" y="30" width="2" height="12" />
          <rect x="46" y="30" width="6" height="2" />
          <rect x="46" y="40" width="6" height="2" />
          <rect x="52" y="32" width="2" height="8" />
        </g>

        {/* Star ornament */}
        <g fill="#E63946">
          <rect x="38" y="48" width="4" height="2" />
          <rect x="36" y="50" width="8" height="2" />
          <rect x="38" y="52" width="4" height="2" />
        </g>
      </svg>

      <span
        className="font-pixel absolute -top-3 -left-3 bg-[#2ECC71] px-2 py-1.5 text-[9px] uppercase text-white"
        style={{ border: "2px solid #0A2540", boxShadow: "2px 2px 0 #0A2540" }}
      >
        ✓ VERIFIED
      </span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   FIREWORK BURST — พลุ pixel-art 8 ทิศ
   ══════════════════════════════════════════════════════ */
function FireworkBurst({ size = 64, color = "#F1C40F" }: { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="pixel-svg"
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === 4 cardinal rays === */}
      <g fill={color}>
        {/* North */}
        <rect x="31" y="6"  width="2" height="18" />
        {/* South */}
        <rect x="31" y="40" width="2" height="18" />
        {/* West */}
        <rect x="6"  y="31" width="18" height="2" />
        {/* East */}
        <rect x="40" y="31" width="18" height="2" />

        {/* === 4 diagonal rays (staircase pixel) === */}
        {/* NE */}
        <rect x="42" y="22" width="2" height="2" />
        <rect x="44" y="20" width="2" height="2" />
        <rect x="46" y="18" width="2" height="2" />
        {/* NW */}
        <rect x="20" y="22" width="2" height="2" />
        <rect x="18" y="20" width="2" height="2" />
        <rect x="16" y="18" width="2" height="2" />
        {/* SE */}
        <rect x="42" y="40" width="2" height="2" />
        <rect x="44" y="42" width="2" height="2" />
        <rect x="46" y="44" width="2" height="2" />
        {/* SW */}
        <rect x="20" y="40" width="2" height="2" />
        <rect x="18" y="42" width="2" height="2" />
        <rect x="16" y="44" width="2" height="2" />

        {/* === Sparkle tips (cardinal) === */}
        <rect x="30" y="2"  width="4" height="3" />
        <rect x="30" y="59" width="4" height="3" />
        <rect x="2"  y="30" width="3" height="4" />
        <rect x="59" y="30" width="3" height="4" />

        {/* === Sparkle tips (diagonal) === */}
        <rect x="48" y="14" width="3" height="3" />
        <rect x="13" y="14" width="3" height="3" />
        <rect x="48" y="47" width="3" height="3" />
        <rect x="13" y="47" width="3" height="3" />
      </g>

      {/* Bright white center */}
      <g fill="white">
        <rect x="28" y="28" width="8" height="8" />
      </g>
      <g fill={color}>
        <rect x="30" y="30" width="4" height="4" />
      </g>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════
   PIXEL SPARKLE — ดาวประกายเล็กๆ
   ══════════════════════════════════════════════════════ */
function PixelSparkle({ size = 14, color = "#F1C40F" }: { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className="pixel-svg"
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 4-direction sparkle */}
      <g fill={color}>
        <rect x="4" y="0" width="2" height="3" />
        <rect x="4" y="7" width="2" height="3" />
        <rect x="0" y="4" width="3" height="2" />
        <rect x="7" y="4" width="3" height="2" />
        <rect x="3" y="3" width="4" height="4" />
      </g>
      {/* Center bright */}
      <rect x="4" y="4" width="2" height="2" fill="white" />
    </svg>
  )
}
