// บริการเสริม (Extra Services) — service ที่ featured: false ใน SERVICES data
//
// ⚠️ ข้อมูลทั้งหมดอยู่ที่ app/services/_data/services.tsx (single source of truth)
//    เพิ่ม service ใหม่ → set featured: false จะมาขึ้นที่นี่อัตโนมัติ
//    + ได้หน้า detail ที่ /services/{slug} ฟรี ๆ

"use client"

import Link from "next/link"
import { getExtraServices, getServiceHref } from "@/app/services/_data/services"
import { SectionHead } from "./key-services-section"
import { trackServiceCardClick } from "@/lib/analytics"

export function ExtraServicesSection() {
  const services = getExtraServices()

  if (services.length === 0) return null

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={`FULL CATALOG · ${String(services.length).padStart(2, "0")}`}
          heading="บริการเสริมอื่น ๆ"
          description="นอกจาก 4 ระบบหลัก เรายังรับงานพัฒนาแบบ End-to-End สำหรับธุรกิจที่ต้องการระบบเฉพาะทาง — ทำงานคู่กับทีม IT ของลูกค้าหรือทำให้ทั้งหมดก็ได้"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={getServiceHref(s)}
              aria-label={`ดูรายละเอียด ${s.title}`}
              onClick={() => trackServiceCardClick(s.slug, "extra_services")}
              className="group relative flex flex-col bg-[#F4EDE0] p-6 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
            >
              <span className="font-pixel absolute right-3 top-3 text-[10px] uppercase text-[#0A2540]/40">
                / {s.num}
              </span>
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-[#0A2540]"
                style={{ border: "2px solid #0A2540", boxShadow: `3px 3px 0 ${s.accent}` }}
              >
                {s.icon}
              </span>
              <h4 className="mb-2 text-base font-black uppercase text-[#0A2540]">{s.title}</h4>
              <p className="flex-1 text-sm leading-relaxed text-[#0A2540]/75">{s.description}</p>
              <span
                className="font-pixel mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-wider transition-transform group-hover:translate-x-1"
                style={{ color: s.accent }}
              >
                ดูรายละเอียด ▶
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
