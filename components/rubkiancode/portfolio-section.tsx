"use client"

import { useState } from "react"
import { SectionHead } from "./key-services-section"

type Category = "all" | "marketing" | "erp" | "lucky" | "custom"

type Project = {
  id: string
  category: Exclude<Category, "all">
  tag: string
  title: string
  caption: string
  span: "wide" | "tall" | "sq" | "h"
  artBg: string
  art: React.ReactNode
}

const TABS: { key: Category; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "marketing", label: "Marketing" },
  { key: "erp", label: "Office ERP" },
  { key: "lucky", label: "Lucky Draw" },
  { key: "custom", label: "Custom" },
]

const PROJECTS: Project[] = [
  {
    id: "siam-retail",
    category: "marketing",
    tag: "★ MARKETING",
    title: "Siam Retail — Marketing Stack รวม",
    caption: "2025 · ROAS +218%",
    span: "wide",
    artBg: "#F4EDE0",
    art: <DashboardArt />,
  },
  {
    id: "aroi-foods",
    category: "erp",
    tag: "★ OFFICE ERP",
    title: "Aroi Foods — ERP 4 modules",
    caption: "2024 · −40 hrs/wk",
    span: "tall",
    artBg: "#0A2540",
    art: <ErpArt />,
  },
  {
    id: "krungthep",
    category: "lucky",
    tag: "★ LUCKY DRAW",
    title: "Krungthep Anniv. Live Draw",
    caption: "2025 · 248k entries",
    span: "sq",
    artBg: "#E63946",
    art: <TicketArt />,
  },
  {
    id: "northpoint",
    category: "marketing",
    tag: "★ MARKETING",
    title: "Northpoint — Lifecycle & Attribution",
    caption: "2025 · +149% Q/Q",
    span: "h",
    artBg: "#F1C40F",
    art: <FunnelArt />,
  },
  {
    id: "indochina",
    category: "custom",
    tag: "★ CUSTOM",
    title: "Indochina — Data Pipeline",
    caption: "2024 · 99.97% uptime",
    span: "tall",
    artBg: "#3498DB",
    art: <PipelineArt />,
  },
  {
    id: "indo-corp",
    category: "erp",
    tag: "★ OFFICE ERP",
    title: "Indo Corp — HR & Attendance",
    caption: "2024 · 320 พนักงาน",
    span: "h",
    artBg: "#2ECC71",
    art: <HrArt />,
  },
]

export function PortfolioSection() {
  const [active, setActive] = useState<Category>("all")
  const items = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="bg-[#F4EDE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="PORTFOLIO · LV.UP"
          heading={
            <>
              ผลงานที่ส่งมอบจริง
              <br />
              2566–2569
            </>
          }
          description="คัดมาจากงานหลายสิบโปรเจกต์ — ทุกชิ้นมีสรุปผลลัพธ์เป็นตัวเลขให้ลูกค้าตรวจสอบได้ ทุก case study เปิดให้ขอ reference จากลูกค้าตัวจริงได้"
        />

        {/* แท็บกรองหมวดหมู่ */}
        <div className="mt-10 flex flex-wrap gap-3">
          {TABS.map((tab) => {
            const on = active === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={`font-pixel px-4 py-2 text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5 ${
                  on
                    ? "bg-[#E63946] text-white"
                    : "bg-white text-[#0A2540] hover:bg-[#F1C40F]"
                }`}
                style={{
                  border: "2px solid #0A2540",
                  boxShadow: on ? "4px 4px 0 #0A2540" : "3px 3px 0 #0A2540",
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Grid โปรเจกต์ */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <a
              key={p.id}
              href="#"
              className={`group flex flex-col bg-white transition-transform hover:-translate-x-1 hover:-translate-y-1 ${
                spanClass(p.span)
              }`}
              style={{ border: "3px solid #0A2540", boxShadow: "6px 6px 0 #0A2540" }}
            >
              <div
                className="relative flex-1 overflow-hidden border-b-[3px] border-[#0A2540]"
                style={{ background: p.artBg }}
              >
                <span
                  className="font-pixel absolute left-3 top-3 z-10 bg-[#0A2540] px-2 py-1.5 text-[10px] uppercase text-[#F1C40F]"
                  style={{ boxShadow: "3px 3px 0 #E63946" }}
                >
                  {p.tag}
                </span>
                {p.art}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-bold text-[#0A2540] group-hover:text-[#E63946]">
                  {p.title}
                </span>
                <span className="font-pixel text-[10px] uppercase text-[#0A2540]/60">
                  {p.caption}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function spanClass(span: Project["span"]) {
  switch (span) {
    case "wide":
      return "lg:col-span-2"
    case "tall":
      return "lg:row-span-2"
    case "h":
      return "lg:col-span-2"
    case "sq":
    default:
      return ""
  }
}

/* ============== Pixel illustrations สำหรับ Portfolio ============== */

function DashboardArt() {
  return (
    <svg viewBox="0 0 600 280" className="pixel-svg block h-full w-full">
      <rect width="600" height="280" fill="#F4EDE0" />
      <rect x="40" y="40" width="520" height="200" fill="#FFFFFF" stroke="#0A2540" strokeWidth="4" />
      <rect x="40" y="40" width="520" height="24" fill="#0A2540" />
      <text x="56" y="58" className="font-pixelify" fontSize="13" fill="#F1C40F">DASHBOARD.EXE</text>
      <g>
        <rect x="56" y="76" width="120" height="56" fill="#F4EDE0" stroke="#0A2540" strokeWidth="2" />
        <text x="64" y="92" className="font-pixelify" fontSize="11" fill="#E63946">VISITORS</text>
        <text x="64" y="120" className="font-pixelify" fontSize="20" fill="#0A2540">1.2M</text>
        <rect x="184" y="76" width="120" height="56" fill="#F4EDE0" stroke="#0A2540" strokeWidth="2" />
        <text x="192" y="92" className="font-pixelify" fontSize="11" fill="#E63946">CTR</text>
        <text x="192" y="120" className="font-pixelify" fontSize="20" fill="#2ECC71">4.8%</text>
        <rect x="312" y="76" width="120" height="56" fill="#F1C40F" stroke="#0A2540" strokeWidth="2" />
        <text x="320" y="92" className="font-pixelify" fontSize="11" fill="#0A2540">ROAS</text>
        <text x="320" y="120" className="font-pixelify" fontSize="20" fill="#0A2540">8.4x</text>
        <rect x="440" y="76" width="100" height="56" fill="#F4EDE0" stroke="#0A2540" strokeWidth="2" />
        <text x="448" y="92" className="font-pixelify" fontSize="11" fill="#E63946">CHURN</text>
        <text x="448" y="120" className="font-pixelify" fontSize="20" fill="#0A2540">2.1%</text>
      </g>
      <g>
        <rect x="56" y="148" width="484" height="76" fill="#F4EDE0" stroke="#0A2540" strokeWidth="2" />
        <g fill="#E63946">
          <rect x="72" y="190" width="16" height="30" />
          <rect x="100" y="180" width="16" height="40" />
          <rect x="128" y="170" width="16" height="50" />
          <rect x="156" y="160" width="16" height="60" />
        </g>
        <g fill="#3498DB">
          <rect x="200" y="170" width="16" height="50" />
          <rect x="228" y="160" width="16" height="60" />
          <rect x="256" y="150" width="16" height="70" />
          <rect x="284" y="140" width="16" height="80" />
        </g>
        <g fill="#2ECC71">
          <rect x="328" y="160" width="16" height="60" />
          <rect x="356" y="150" width="16" height="70" />
          <rect x="384" y="140" width="16" height="80" />
          <rect x="412" y="130" width="16" height="90" />
        </g>
        <g fill="#F1C40F">
          <rect x="456" y="150" width="16" height="70" />
          <rect x="484" y="140" width="16" height="80" />
          <rect x="512" y="120" width="16" height="100" />
        </g>
      </g>
    </svg>
  )
}

function ErpArt() {
  return (
    <svg viewBox="0 0 280 280" className="pixel-svg block h-full w-full">
      <rect width="280" height="280" fill="#0A2540" />
      <rect x="20" y="20" width="50" height="240" fill="#112C4D" />
      <g fill="#F1C40F">
        <rect x="28" y="32" width="34" height="6" />
      </g>
      <g fill="rgba(244,237,224,0.3)">
        <rect x="28" y="48" width="28" height="4" />
        <rect x="28" y="62" width="34" height="4" />
        <rect x="28" y="76" width="22" height="4" />
        <rect x="28" y="90" width="30" height="4" />
        <rect x="28" y="104" width="26" height="4" />
      </g>
      <g>
        <rect x="80" y="20" width="180" height="60" fill="#F4EDE0" stroke="#F1C40F" strokeWidth="2" />
        <text x="92" y="44" className="font-pixelify" fontSize="11" fill="#0A2540">Q3 REVENUE</text>
        <text x="92" y="70" className="font-pixelify" fontSize="20" fill="#E63946">฿128M</text>
        <rect x="80" y="90" width="86" height="80" fill="#3498DB" />
        <g fill="#F4EDE0">
          <rect x="92" y="102" width="34" height="6" />
          <rect x="92" y="118" width="62" height="4" />
          <rect x="92" y="128" width="48" height="4" />
          <rect x="92" y="138" width="56" height="4" />
          <rect x="92" y="148" width="40" height="4" />
          <rect x="92" y="158" width="50" height="4" />
        </g>
        <rect x="174" y="90" width="86" height="80" fill="#F1C40F" />
        <g fill="#0A2540">
          <rect x="186" y="102" width="34" height="6" />
        </g>
        <g transform="translate(218,138)" fill="#0A2540">
          <rect x="-12" y="-12" width="24" height="12" />
          <rect x="0" y="0" width="12" height="12" />
        </g>
        <rect x="80" y="180" width="180" height="80" fill="#F4EDE0" />
        <g>
          <rect x="92" y="192" width="60" height="6" fill="#0A2540" />
          <rect x="92" y="204" width="156" height="4" fill="#0A2540" opacity=".2" />
          <rect x="92" y="214" width="156" height="4" fill="#0A2540" opacity=".2" />
          <rect x="92" y="224" width="156" height="4" fill="#0A2540" opacity=".2" />
          <rect x="92" y="234" width="156" height="4" fill="#0A2540" opacity=".2" />
          <rect x="92" y="244" width="100" height="4" fill="#E63946" />
        </g>
      </g>
    </svg>
  )
}

function TicketArt() {
  return (
    <svg viewBox="0 0 280 280" className="pixel-svg block h-full w-full">
      <rect width="280" height="280" fill="#E63946" />
      <g fill="#F4EDE0">
        <rect x="40" y="80" width="200" height="120" />
      </g>
      <g fill="#0A2540">
        <rect x="40" y="80" width="200" height="4" />
        <rect x="40" y="196" width="200" height="4" />
        <rect x="40" y="80" width="4" height="120" />
        <rect x="236" y="80" width="4" height="120" />
      </g>
      <g fill="#E63946">
        <rect x="60" y="78" width="6" height="6" />
        <rect x="80" y="78" width="6" height="6" />
        <rect x="100" y="78" width="6" height="6" />
        <rect x="120" y="78" width="6" height="6" />
        <rect x="140" y="78" width="6" height="6" />
        <rect x="160" y="78" width="6" height="6" />
        <rect x="180" y="78" width="6" height="6" />
        <rect x="200" y="78" width="6" height="6" />
        <rect x="220" y="78" width="6" height="6" />
      </g>
      <text x="140" y="125" textAnchor="middle" className="font-pixelify" fontSize="14" fill="#E63946">★ WINNER ★</text>
      <text x="140" y="165" textAnchor="middle" className="font-pixelify" fontSize="32" fill="#0A2540">04829</text>
      <text x="140" y="190" textAnchor="middle" className="font-pixelify" fontSize="11" fill="#0A2540">TH-04829-2569</text>
      <g fill="#F1C40F">
        <rect x="20" y="20" width="6" height="6" />
        <rect x="60" y="40" width="6" height="6" />
        <rect x="240" y="30" width="6" height="6" />
        <rect x="200" y="50" width="6" height="6" />
        <rect x="30" y="240" width="6" height="6" />
        <rect x="250" y="220" width="6" height="6" />
        <rect x="80" y="250" width="6" height="6" />
      </g>
    </svg>
  )
}

function FunnelArt() {
  return (
    <svg viewBox="0 0 600 280" className="pixel-svg block h-full w-full">
      <rect width="600" height="280" fill="#F1C40F" />
      <g fill="#0A2540">
        <rect x="60" y="40" width="480" height="40" />
        <rect x="120" y="80" width="360" height="40" />
        <rect x="180" y="120" width="240" height="40" />
        <rect x="240" y="160" width="120" height="40" />
      </g>
      <g className="font-pixelify" fontSize="14" fill="#F1C40F">
        <text x="80" y="66">VISIT  · 1.2M</text>
        <text x="140" y="106">SIGNUP · 184K</text>
        <text x="200" y="146">TRIAL  · 42K</text>
        <text x="260" y="186">PAID   · 9.4K</text>
      </g>
      <text x="60" y="232" className="font-pixelify" fontSize="13" fill="#0A2540">CONVERSION 0.78% → 1.94%</text>
      <text x="60" y="250" className="font-pixelify" fontSize="13" fill="#E63946">▲ +149% Q/Q</text>
    </svg>
  )
}

function PipelineArt() {
  return (
    <svg viewBox="0 0 280 280" className="pixel-svg block h-full w-full">
      <rect width="280" height="280" fill="#3498DB" />
      <rect x="20" y="40" width="240" height="200" fill="#0A2540" stroke="#F1C40F" strokeWidth="3" />
      <rect x="20" y="40" width="240" height="20" fill="#F1C40F" />
      <text x="32" y="56" className="font-pixelify" fontSize="11" fill="#0A2540">PIPELINE.TS</text>
      <g className="font-pixelify" fontSize="14" fill="#F4EDE0">
        <text x="32" y="86">$ npm run deploy</text>
        <text x="32" y="106">
          <tspan fill="#2ECC71">✔</tspan> build · 12.3s
        </text>
        <text x="32" y="126">
          <tspan fill="#2ECC71">✔</tspan> tests · 142/142
        </text>
        <text x="32" y="146">
          <tspan fill="#2ECC71">✔</tspan> deploy · prod
        </text>
        <text x="32" y="166">
          <tspan fill="#F1C40F">→</tspan> 99.97% uptime
        </text>
        <text x="32" y="186">
          <tspan fill="#E63946">●</tspan> p95: 142ms
        </text>
        <text x="32" y="220" fill="#F1C40F">
          _<tspan fill="#F1C40F">█</tspan>
        </text>
      </g>
    </svg>
  )
}

function HrArt() {
  return (
    <svg viewBox="0 0 600 280" className="pixel-svg block h-full w-full">
      <rect width="600" height="280" fill="#2ECC71" />
      <rect x="40" y="40" width="520" height="200" fill="#FFFFFF" stroke="#0A2540" strokeWidth="4" />
      <rect x="40" y="40" width="520" height="24" fill="#0A2540" />
      <text x="56" y="58" className="font-pixelify" fontSize="13" fill="#F1C40F">HR_OFFICE.EXE</text>
      <g>
        <rect x="60" y="84" width="40" height="40" fill="#F1C40F" />
        <rect x="68" y="92" width="24" height="24" fill="#0A2540" />
        <rect x="60" y="128" width="180" height="6" fill="#0A2540" />
        <rect x="60" y="140" width="120" height="4" fill="#0A2540" opacity=".4" />
        <rect x="260" y="84" width="40" height="40" fill="#E63946" />
        <rect x="268" y="92" width="24" height="24" fill="#0A2540" />
        <rect x="260" y="128" width="180" height="6" fill="#0A2540" />
        <rect x="260" y="140" width="120" height="4" fill="#0A2540" opacity=".4" />
      </g>
      <g>
        <rect x="60" y="170" width="480" height="50" fill="#F4EDE0" />
        <g fill="#2ECC71">
          <rect x="72" y="184" width="20" height="30" />
          <rect x="100" y="174" width="20" height="40" />
          <rect x="128" y="180" width="20" height="34" />
          <rect x="156" y="170" width="20" height="44" />
          <rect x="184" y="178" width="20" height="36" />
          <rect x="212" y="190" width="20" height="24" />
          <rect x="240" y="184" width="20" height="30" />
        </g>
        <g fill="#E63946">
          <rect x="280" y="180" width="20" height="34" />
          <rect x="308" y="170" width="20" height="44" />
          <rect x="336" y="174" width="20" height="40" />
          <rect x="364" y="180" width="20" height="34" />
        </g>
        <g fill="#F1C40F">
          <rect x="404" y="186" width="20" height="28" />
          <rect x="432" y="178" width="20" height="36" />
          <rect x="460" y="184" width="20" height="30" />
          <rect x="488" y="174" width="20" height="40" />
          <rect x="516" y="180" width="20" height="34" />
        </g>
      </g>
    </svg>
  )
}
