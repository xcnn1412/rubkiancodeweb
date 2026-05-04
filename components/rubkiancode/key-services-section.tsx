// 4 บริการหลักของ RubKianCode
//
// ⚠️ ข้อมูล service ทั้งหมดอยู่ที่ app/services/_data/services.tsx (single source of truth)
//    ที่นี่อ่านมาแสดงเป็น card บน homepage และลิงก์ไป detail page /services/{slug}
//    เพิ่ม service ใหม่ → แก้แค่ไฟล์ data ที่เดียว ไม่ต้องแตะที่นี่

import Link from "next/link"
import { getFeaturedServices, getServiceHref } from "@/app/services/_data/services"

export function KeyServicesSection() {
  const services = getFeaturedServices()

  return (
    <section id="services" className="bg-[#F4EDE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={`CORE SERVICES · ${String(services.length).padStart(2, "0")}`}
          heading={
            <>
              {services.length} ระบบหลัก
              <br />
              ที่เราชำนาญที่สุด
            </>
          }
          description="ชูจุดแข็งด้านที่ผู้ประกอบการต้องการมากที่สุด พร้อมเทมเพลตที่ติดตั้งได้ใน 2 สัปดาห์ และปรับแต่งได้ตามขนาดธุรกิจ — ไม่ว่าจะเริ่มจาก 0 หรือต่อยอดของเดิม"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={getServiceHref(s)}
              aria-label={`ดูรายละเอียด ${s.title}`}
              className="group flex flex-col bg-white transition-transform hover:-translate-x-1 hover:-translate-y-1"
              style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 " + s.accent }}
            >
              <div
                className="flex items-start gap-3 border-b-[3px] border-[#0A2540] p-5"
                style={{ background: s.accent }}
              >
                <span className="font-pixel bg-[#0A2540] px-2 py-1.5 text-xs text-[#F1C40F]">
                  {s.num}
                </span>
                <h3 className="text-lg font-black uppercase leading-tight text-white sm:text-xl">
                  {s.title}
                  <br />
                  <span className="text-sm normal-case opacity-90">{s.subtitle}</span>
                </h3>
              </div>

              <div className="border-b-[3px] border-[#0A2540] bg-[#F4EDE0]">
                <div className="h-44 w-full">{s.art}</div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="text-sm leading-relaxed text-[#0A2540]/80">{s.description}</p>
                <ul className="space-y-2">
                  {s.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0A2540]">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-2 w-2 shrink-0"
                        style={{ background: s.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t-[3px] border-[#0A2540] bg-[#0A2540] px-5 py-3 text-xs uppercase text-[#F1C40F]">
                <span className="font-pixel">{s.duration}</span>
                <span
                  className="font-pixel transition-transform group-hover:translate-x-1"
                  style={{ color: s.accent }}
                >
                  ▶
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============== ส่วนย่อย: หัวเรื่องของ section (ใช้ซ้ำทั้งหน้า) ============== */
export function SectionHead({
  eyebrow,
  heading,
  description,
}: {
  eyebrow: string
  heading: React.ReactNode
  description: string
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-12">
      <div>
        <span
          className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
          style={{ boxShadow: "4px 4px 0 #E63946" }}
        >
          {eyebrow}
        </span>
        <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
      </div>
      <p className="text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">{description}</p>
    </div>
  )
}
