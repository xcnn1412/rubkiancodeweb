"use client"

// ════════════════════════════════════════════════════════════════════════
// SCREENSHOTS GALLERY — grid + "ดูรูปเพิ่มเติม" toggle + optional "ติดต่อผลิตตู้" CTA
// ════════════════════════════════════════════════════════════════════════
// แสดง screenshot 9 รูปแรก ถ้ามีมากกว่านั้นโชว์ปุ่มขยาย/ย่อ
// ถ้า productionCta=true จะมีปุ่มเพิ่ม "ติดต่อผลิตตู้" + popup ใช้ <ContactPopup>
// ════════════════════════════════════════════════════════════════════════

import { useState } from "react"
import Image from "next/image"
import type { Screenshot } from "@/app/services/_data/services"
import { ContactPopup } from "./contact-popup"

const INITIAL_COUNT = 9

// Config สำหรับปุ่ม + popup ของ "ติดต่อผลิตตู้" — ทุก field optional, fallback ไป default
// ใช้ตัวอย่าง:
//   productionCta={{}}                                           // ใช้ default ทั้งหมด
//   productionCta={{ title: "ติดต่อทีมขาย", description: "..." }} // override บาง field
export type ProductionCtaConfig = {
  buttonLabel?: string          // ปุ่ม trigger (default "★ ติดต่อผลิตตู้")
  badge?: string                // eyebrow ใน popup (default "★ PARTNER MANUFACTURING")
  title?: string                // line 1 ของ heading (default "ติดต่อ Partner")
  highlightedTitle?: string     // line 2 สี accent (default "เพื่อผลิตตู้")
  description?: string          // body text ใน popup (default รายละเอียดผลิตตู้)
}

type Props = {
  screenshots: Screenshot[]
  accent: string                // hex สี theme ของ service (border, shadow)
  subtitle: string              // โชว์ใน window chrome: SCREEN · NN · {subtitle}
  productionCta?: ProductionCtaConfig  // (optional) ถ้ากำหนด — โชว์ปุ่ม + popup
}

const DEFAULT_PRODUCTION_CTA: Required<ProductionCtaConfig> = {
  buttonLabel: "★ ติดต่อผลิตตู้",
  badge: "★ PARTNER MANUFACTURING",
  title: "ติดต่อ Partner",
  highlightedTitle: "เพื่อผลิตตู้",
  description:
    "โปรดติดต่อผ่านช่องทางด้านล่าง เพื่อให้ทีมงานแจ้งข้อมูลกลับ — สเปคตู้, ราคา, ระยะเวลาผลิต และ option ตามแบรนด์ของคุณ",
}

export function ScreenshotsGallery({ screenshots, accent, subtitle, productionCta }: Props) {
  // merge config ที่ user ส่งมา กับ default — undefined = ไม่โชว์ปุ่ม
  const cta = productionCta ? { ...DEFAULT_PRODUCTION_CTA, ...productionCta } : null
  const [showAll, setShowAll] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const hasMore = screenshots.length > INITIAL_COUNT
  const visible = showAll || !hasMore ? screenshots : screenshots.slice(0, INITIAL_COUNT)
  const remaining = screenshots.length - INITIAL_COUNT

  return (
    <>
      {/* Gallery — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((shot, i) => (
          <figure
            key={shot.src}
            className="group flex flex-col bg-[#F4EDE0] transition-transform hover:-translate-x-1 hover:-translate-y-1"
            style={{ border: "3px solid " + accent, boxShadow: "8px 8px 0 " + accent }}
          >
            {/* Browser chrome — arcade window style */}
            <div className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2 sm:px-4">
              <span className="flex gap-1.5">
                <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
              </span>
              <span className="font-pixel hidden text-[9px] uppercase text-[#F1C40F] sm:inline">
                SCREEN · {String(i + 1).padStart(2, "0")} · {subtitle.toUpperCase()}
              </span>
              <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                </span>
                LIVE
              </span>
            </div>

            {/* Image
                — aspect-[4/3] รองรับทั้ง portrait และ landscape ได้สมดุล
                — object-contain โชว์ภาพเต็มไม่ครอป (ภาพจริงจาก event/photobooth ที่มีหลาย aspect)
                — bg #0F1419 ให้ letterbox/pillarbox ดูเป็น cinematic black bar กลืนเนียน */}
            <div className="relative aspect-[4/3] overflow-hidden border-y-[3px] border-[#0A2540] bg-[#0F1419]">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Pixel corner accents */}
              <span aria-hidden className="absolute left-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
              <span aria-hidden className="absolute right-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
              <span aria-hidden className="absolute bottom-0 left-0 z-10 h-3 w-3 bg-[#F1C40F]" />
              <span aria-hidden className="absolute bottom-0 right-0 z-10 h-3 w-3 bg-[#F1C40F]" />
            </div>

            {/* Caption */}
            <figcaption className="flex items-center justify-between gap-3 p-4 sm:p-5">
              <span
                className="font-pixel bg-[#0A2540] px-2 py-1.5 text-[10px] uppercase text-[#F1C40F]"
                style={{ boxShadow: "2px 2px 0 " + accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-bold text-[#0A2540] sm:text-base">
                {shot.caption}
              </span>
              <span className="font-pixel hidden text-xs sm:inline" style={{ color: accent }}>
                ▶
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Action buttons — show-more (ถ้ามี) + production CTA (ถ้ามี config) */}
      {(hasMore || cta) && (
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="font-pixel inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 text-xs uppercase tracking-widest text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #0A2540", boxShadow: `5px 5px 0 ${accent}` }}
            >
              {showAll ? "▲ ย่อรูป" : `▼ ดูรูปเพิ่มเติม (+${remaining})`}
            </button>
          )}
          {cta && (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="font-pixel inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 text-xs uppercase tracking-widest text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #F1C40F", boxShadow: `5px 5px 0 #F1C40F` }}
            >
              {cta.buttonLabel}
            </button>
          )}
        </div>
      )}

      {/* Production-contact popup — ใช้ component กลาง <ContactPopup> */}
      {cta && (
        <ContactPopup
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          accent={accent}
          badge={cta.badge}
          title={cta.title}
          highlightedTitle={cta.highlightedTitle}
          description={cta.description}
        />
      )}
    </>
  )
}
