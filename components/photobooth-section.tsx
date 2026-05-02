"use client"

import { useEffect, useState } from "react"
import { Camera, Heart, Star, CheckCircle2, Zap } from "lucide-react"
import { CodeBg } from "@/components/code-bg"
import { useLanguage, useLangTypography } from "@/lib/language-context"
import { useTranslations } from "next-intl"
import {
  PHOTOBOOTH_PREVIEW_PHOTOS,
  PHOTOBOOTH_SLIDESHOW_DELAY_MS,
} from "@/data/photobooth-preview-photos"
import { useExitTransition } from "@/providers/exit-transition-provider"

// ─── Color Keys (เปลี่ยนสีได้ที่นี่) ──────────────────────────────────────────
const PHOTOBOOTH_COLORS = {
  heart: '#e3000f',              // สีหัวใจ (ปุ่มจองเช่า)
  heartGlow: 'rgba(227,0,15,0.6)', // สี glow ของหัวใจ
  zapIcon: '#f3f84a',            // สีไอคอนสายฟ้า
  zapBg: '#f3f84a',              // สีพื้นหลังวงกลมสายฟ้า
  zapBgInner: 'rgba(255,255,255,0.25)', // สีวงกลมด้านในสายฟ้า
  ctaBookText: '#d60000',        // สีข้อความ "จองเช่า PHOTOBOOTH"
  ctaBookTextShadow: 'rgba(214,0,0,0.35)', // สี glow ข้อความ
  // ─── คำว่า "พิเศษ" ───────────────────────────────────────────────────
  specialText: '#f3f84a',        // สี fill ตัวอักษร "พิเศษ"
  specialStroke: '#d60000',      // สี stroke โดยรอบตัวอักษร
  specialGlow: 'rgba(214,0,0,0.7)', // สี glow สีแดงเปล่งออก
} as const
// ──────────────────────────────────────────────────────────────────────────────

export function PhotoboothSection() {
  const { lang } = useLanguage()
  const typo = useLangTypography()
  const t = useTranslations("photobooth")
  const { triggerTransition } = useExitTransition()

  const features = [
    t("feature0"),
    t("feature1"),
    t("feature2"),
    t("feature3"),
    t("feature4"),
    t("feature5"),
  ]

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (PHOTOBOOTH_PREVIEW_PHOTOS.length <= 1) return
    const id = setInterval(() => {
      setSlideIndex(i => (i + 1) % PHOTOBOOTH_PREVIEW_PHOTOS.length)
    }, PHOTOBOOTH_SLIDESHOW_DELAY_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="photobooth" className="relative py-16 sm:py-24 overflow-hidden">

      {/* Solid egg-yolk yellow background */}
      <div className="absolute inset-0 z-[1]" style={{ background: '#f2efdb' }} />

      {/* Bouncing Code Symbols */}
      <CodeBg opacity={1} particleCount={40} className="z-[3]" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[6]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-3 mb-8 px-5 py-2.5"
              style={{ background: '#f4e6af', border: '3px solid #1a0e00', boxShadow: '4px 4px 0px #1a0e00', borderRadius: '999px' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <Camera className="w-4 h-4 text-[#1a0e00]" />
              <span
                className="font-black text-[#1a0e00] uppercase"
                style={{ letterSpacing: typo.trackingLabel, fontSize: typo.sectionBadge }}
              >
                {t("badge")}
              </span>
            </div>

            <h2
              className="font-black uppercase mb-6 leading-tight"
              style={{
                fontSize: typo.sectionH2,
                color: '#d60000ff',
                /*textShadow: '5px 5px 0px #7a5010, 10px 10px 0px rgba(122,80,16,0.3)',*/
                fontFamily: typo.fontFamily,
                /*WebkitTextStroke: '1px #c8900a',*/
                letterSpacing: typo.trackingSectionH2,
              }}
            >
              {t("heading_rent")}
              <br />
              <span style={{ color: '#d60000ff', WebkitTextStroke: '0px' }}>{t("photobooth_wordmark")}</span>
              <br />
              <span style={{ color: '#555856', WebkitTextStroke: '0px transparent' }}>
                {t("heading_style")}
              </span>
              {" "}
              <span
                className="badge-special"
                style={{
                  color: PHOTOBOOTH_COLORS.specialText,
                  WebkitTextStroke: `2px ${PHOTOBOOTH_COLORS.specialStroke}`,
                  fontSize: `calc(${typo.sectionH2} * 0.9)`,
                  verticalAlign: 'middle',
                }}
              >
                {t("heading_special")}
              </span>
            </h2>

            <p
              className="text-black/50 mb-10 leading-relaxed max-w-lg font-medium"
              style={{ fontSize: typo.sectionDesc, lineHeight: typo.sectionLineHeight, textShadow: '1px 1px 0 rgba(60, 60, 60, 0.8)', letterSpacing: typo.trackingBody }}
            >
              {t("description")}
            </p>

            {/* Features */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    style={{ background: '#93c8cf', border: '2px solid #1a0e00', boxShadow: '2px 2px 0 #1a0e00', borderRadius: '6px' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1a0e00]" />
                  </div>
                  <span
                    className="text-black/80 font-bold text-sm"
                    style={{ letterSpacing: typo.trackingBody }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex justify-start">
              <button
                className="btn-shimmer flex items-center justify-center font-black uppercase transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px]"
                style={{
                  padding: '14px 32px',
                  background: '#f4e6af',
                  color: '#d60000ff',
                  border: '3px solid #1a0e00',
                  boxShadow: '5px 5px 0px #1a0e00',
                  borderRadius: '999px',
                  fontSize: `calc(${typo.sectionBadge} * 1.2)`,
                  letterSpacing: typo.trackingButton,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px #1a0e00' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #1a0e00' }}
                onClick={() => triggerTransition('https://lin.ee/py7hRoKC', 'line')}
              >
                {/* แสงวิ้งวับ — อย่าลบ span นี้ */}
                <span className="shimmer-light" />
                {/* Animated heartbeat icon */}
                <span className="inline-flex items-center mr-2 relative">
                  {/* Glow layer */}
                  <Heart
                    className="absolute w-6 h-6 animate-ping"
                    style={{ color: PHOTOBOOTH_COLORS.heartGlow, opacity: 0.7 }}
                  />
                  {/* Main heart */}
                  <Heart
                    className="w-6 h-6 relative"
                    style={{
                      color: PHOTOBOOTH_COLORS.heart,
                      fill: PHOTOBOOTH_COLORS.heart,
                      filter: `drop-shadow(0 0 6px ${PHOTOBOOTH_COLORS.heartGlow}) drop-shadow(0 0 12px ${PHOTOBOOTH_COLORS.heartGlow})`,
                      animation: 'heartbeat 0.8s ease-in-out infinite',
                    }}
                  />
                </span>
                {/* Text with heartbeat animation */}
                <span
                  style={{
                    color: PHOTOBOOTH_COLORS.ctaBookText,
                    textShadow: `0 0 8px ${PHOTOBOOTH_COLORS.ctaBookTextShadow}`,
                    animation: 'heartbeat 0.8s ease-in-out infinite',
                    display: 'inline-block',
                  }}
                >
                  {t("cta_book")}
                </span>
              </button>
            </div>
          </div>

          {/* Visual — Retro Photobooth TV Mockup */}
          <div className="relative flex justify-center mt-8 lg:mt-0">

            {/* Outer glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full opacity-20 blur-[80px]"
                style={{ background: 'radial-gradient(circle, #f3f84a, transparent)' }} />
            </div>

            {/* Main TV frame */}
            <div
              className="relative w-full max-w-[500px] z-10"
              style={{
                background: 'linear-gradient(145deg, #dbdcd8 0%, #8a99b1 50%, #8a99b1 100%)',
                border: '4px solid #1a0e00',
                boxShadow: '8px 8px 0px #1a0e00, 16px 16px 0px rgba(26,14,0,0.3)',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              {/* TV Screen bezel */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: '#cddce9',
                  border: '4px solid #1a0e00',
                  borderRadius: '4px',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Scanlines on screen */}
                <div className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
                  }} />

                {/* Header bar */}
                <div
                  className="px-3 py-2 flex items-center justify-between border-b-2 border-[#1a0e00]"
                  style={{ background: 'rgba(26,14,0,0.15)' }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" style={{ border: '1px solid #1a0e00' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" style={{ border: '1px solid #1a0e00' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" style={{ border: '1px solid #1a0e00' }} />
                  </div>
                  <span className="font-mono font-bold text-[10px] text-[#1a0e00]">photobooth.exe</span>
                </div>

                {/* Photo slideshow — แก้รูปและเวลาสลับได้ที่ data/photobooth-preview-photos.ts */}
                <div className="p-3">
                  <div
                    className="relative aspect-square overflow-hidden"
                    style={{ background: 'rgba(26,14,0,0.2)', border: '2px solid rgba(26,14,0,0.3)' }}
                  >
                    {PHOTOBOOTH_PREVIEW_PHOTOS.length === 0 || PHOTOBOOTH_PREVIEW_PHOTOS.every(p => !p.src) ? (
                      // placeholder — แสดงเมื่อยังไม่ได้ใส่รูป
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-10 h-10" style={{ color: 'rgba(26,14,0,0.25)' }} />
                      </div>
                    ) : (
                      PHOTOBOOTH_PREVIEW_PHOTOS.map((photo, i) => (
                        photo.src ? (
                          <div
                            key={i}
                            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                            style={{ opacity: i === slideIndex ? 1 : 0 }}
                            aria-hidden={i !== slideIndex}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              loading={i === 0 ? "eager" : "lazy"}
                              className="w-full h-full object-cover"
                            />
                            {photo.label && (
                              <span
                                className="absolute top-3 left-3 px-3 py-1 font-black uppercase z-10"
                                style={{
                                  background: '#f4e6af',
                                  color: '#1a0e00',
                                  border: '2px solid #1a0e00',
                                  boxShadow: '3px 3px 0px #1a0e00',
                                  borderRadius: '999px',
                                  fontSize: '11px',
                                  letterSpacing: '0.1em',
                                }}
                              >
                                {photo.label}
                              </span>
                            )}
                          </div>
                        ) : null
                      ))
                    )}

                    {/* Dots indicator */}
                    {PHOTOBOOTH_PREVIEW_PHOTOS.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {PHOTOBOOTH_PREVIEW_PHOTOS.map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              background: i === slideIndex ? '#1a0e00' : 'rgba(26,14,0,0.25)',
                              border: '1px solid #1a0e00',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom strip */}
                <div
                  className="flex items-center justify-center gap-2 py-2 border-t-2 border-[#1a0e00]"
                  style={{ background: 'rgba(26,14,0,0.15)' }}
                >
                  <Star className="w-3 h-3 text-[#1a0e00]" />
                  <span className="text-[10px] font-mono font-black text-[#1a0e00] tracking-wider uppercase">Photobooth System</span>
                  <Star className="w-3 h-3 text-[#1a0e00]" />
                </div>
              </div>

              {/* TV base knobs */}
              <div className="flex justify-between mt-2 px-2">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: '#1a0e00', opacity: 0.5 }} />
                  ))}
                </div>
                <div className="w-6 h-3 rounded" style={{ background: '#1a0e00', opacity: 0.4 }} />
              </div>

              {/* Floating Zap badge — inside TV frame so position is relative to frame corner */}
              <div
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center z-30 rotate-12 hover:rotate-0 transition-all duration-500"
                style={{
                  background: '#dbdcd8',
                  border: '3px solid #1a0e00',
                  boxShadow: '4px 4px 0px #1a0e00',
                  borderRadius: '999px',
                }}
              >
                {/* Inner yellow circle background for Zap icon */}
                <div
                  className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${PHOTOBOOTH_COLORS.zapBg} 60%, ${PHOTOBOOTH_COLORS.zapBgInner} 100%)`,
                    borderRadius: '999px',
                    border: '2px solid #1a0e00',
                    boxShadow: `0 0 8px ${PHOTOBOOTH_COLORS.zapBg}`,
                  }}
                >
                  <Zap
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{
                      color: '#1a0e00',
                      fill: PHOTOBOOTH_COLORS.zapIcon,
                      stroke: '#1a0e00',
                      strokeWidth: 2.5,
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </section>
  )
}
