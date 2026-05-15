"use client"

// Services Grid — ใช้ทั้ง homepage (4 featured) และ /services (6 main products)
//
// ⚠️ ข้อมูล service ทั้งหมดอยู่ที่ app/services/_data/services.tsx (single source of truth)
//    ที่นี่อ่านมาแสดงเป็น card + ลิงก์ไป detail page /services/{slug}
//    เพิ่ม service ใหม่ → แก้แค่ไฟล์ data ที่เดียว ไม่ต้องแตะที่นี่

import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { getFeaturedServices, getServiceHref, type Service } from "@/app/services/_data/services"
import { VideoLoopPreview } from "./video-loop-preview"
import { trackCTAClick, trackServiceCardClick } from "@/lib/analytics"

type KeyServicesSectionProps = {
  // ซ่อนปุ่ม "สินค้าทั้งหมด" เมื่อ render บนหน้า /services เอง — กัน loop
  showAllProductsCta?: boolean
  // override list — ถ้าไม่ส่ง ใช้ getFeaturedServices() (4 ตัวบน homepage)
  services?: Service[]
  // override section header copy
  eyebrow?: string
  heading?: ReactNode
  description?: string
}

export function KeyServicesSection({
  showAllProductsCta = true,
  services: servicesProp,
  eyebrow,
  heading,
  description,
}: KeyServicesSectionProps = {}) {
  const services = servicesProp ?? getFeaturedServices()
  // ปรับ grid ตามจำนวน — 4 ตัว = 4 cols, > 4 = 3 cols (เลย่อมเหมาะกว่า)
  const gridCols =
    services.length <= 4
      ? "md:grid-cols-2 xl:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <section id="services" className="bg-[#F4EDE0] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={eyebrow ?? `CORE SERVICES · ${String(services.length).padStart(2, "0")}`}
          heading={
            heading ?? (
              <>
                {services.length} ระบบหลัก
                <br />
                ที่เราชำนาญที่สุด
              </>
            )
          }
          description={
            description ??
            "ชูจุดแข็งด้านที่ผู้ประกอบการต้องการมากที่สุด พร้อมเทมเพลตที่ติดตั้งได้ใน 2 สัปดาห์ และปรับแต่งได้ตามขนาดธุรกิจ — ไม่ว่าจะเริ่มจาก 0 หรือต่อยอดของเดิม"
          }
        />

        <div className={`mt-14 grid gap-6 ${gridCols}`}>

          {services.map((s) => (
            <Link
              key={s.slug}
              href={getServiceHref(s)}
              aria-label={`ดูรายละเอียด ${s.title}`}
              onClick={() => trackServiceCardClick(s.slug, showAllProductsCta ? "key_services" : "services_list")}
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

              {/* Preview — priority: heroVideo > heroImage > pixel art (fallback)
                  - video: autoplay/muted/loop · พื้นครีมกลืนกับ web bg ตอนเป็น letterbox
                  - image: dark bg + pixel corners ครบ (screenshot ของจริงพื้นเข้ม)
                  - art: pixel illustration บน cream bg (default) */}
              <div
                className={`relative border-b-[3px] border-[#0A2540] ${s.heroImage ? "bg-[#0F1419]" : "bg-[#F4EDE0]"}`}
              >
                <div className="relative h-44 w-full">
                  {s.heroVideo ? (
                    <>
                      <VideoLoopPreview
                        sources={s.heroVideo}
                        ariaLabel={`Preview ${s.title}`}
                        className="absolute inset-0 block h-full w-full object-contain"
                      />
                      <span aria-hidden className="absolute left-0 top-0 z-10 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute right-0 top-0 z-10 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 left-0 z-10 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 bg-[#F1C40F]" />
                    </>
                  ) : s.heroImage ? (
                    <>
                      <Image
                        src={s.heroImage.src}
                        alt={s.heroImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                      <span aria-hidden className="absolute left-0 top-0 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute right-0 top-0 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 left-0 h-2.5 w-2.5 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#F1C40F]" />
                    </>
                  ) : (
                    s.art
                  )}
                </div>
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

        {/* CTA — ดูสินค้า/บริการทั้งหมด (รวม Extra Services อีก 6 ตัว) */}
        {showAllProductsCta && (
          <div className="mt-12 flex justify-center sm:mt-14">
            <Link
              href="/services"
              onClick={() => trackCTAClick("all_products", "cta_section")}
              className="font-pixel inline-flex items-center gap-3 bg-[#0A2540] px-8 py-4 text-xs uppercase tracking-widest text-[#F1C40F] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:text-sm"
              style={{ border: "3px solid #0A2540", boxShadow: "6px 6px 0 #E63946" }}
            >
              <span className="text-[10px]">★</span>
              สินค้าทั้งหมด
              <span className="text-[10px]">▶</span>
            </Link>
          </div>
        )}
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
