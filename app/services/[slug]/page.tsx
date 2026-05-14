// ════════════════════════════════════════════════════════════════════════
// SERVICE DETAIL PAGE — template ที่ใช้ร่วมทุก service
// ════════════════════════════════════════════════════════════════════════
//
// URL: /services/{slug}
// ตัวอย่าง: /services/marketing-system, /services/photobooth
//
// SSG: generateStaticParams() build ทุก service ที่มีใน SERVICES ตอน build time
// ทำให้หน้าโหลดเร็วและ SEO ดี
// ════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

import { Navbar } from "@/components/rubkiancode/navbar"
import { ArrowIcon } from "@/components/rubkiancode/icons"
import { VideoLoopPreview } from "@/components/rubkiancode/video-loop-preview"
import { ScreenshotsGallery } from "@/components/rubkiancode/screenshots-gallery"
import { ImageSlideshow } from "@/components/rubkiancode/image-slideshow"
import {
  SERVICES,
  getService,
  getRelatedServices,
  getServiceHref,
} from "../_data/services"

// Below-the-fold sections — dynamic import เพื่อลด initial bundle
const CtaSection = dynamic(() =>
  import("@/components/rubkiancode/cta-section").then((m) => ({ default: m.CtaSection }))
)
const Footer = dynamic(() =>
  import("@/components/rubkiancode/footer").then((m) => ({ default: m.Footer }))
)

type RouteProps = {
  params: Promise<{ slug: string }>
}

// SSG — build static page ทุก slug ที่มีใน SERVICES
// ยกเว้น service ที่มี static folder ของตัวเอง (customPage: true)
// — Next.js ใช้ static segment ทับ dynamic อยู่แล้ว แต่ filter เพื่อป้องกัน build conflict
export function generateStaticParams() {
  return SERVICES.filter((s) => !s.customPage).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "ไม่พบบริการ — RubKianCode" }

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical: `/services/${service.slug}` },
    // Note: og:image และ twitter:image ถูก inject อัตโนมัติจาก
    // opengraph-image.tsx / twitter-image.tsx ใน route segment เดียวกัน
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `/services/${service.slug}`,
      siteName: "RubKianCode",
      locale: "th_TH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  }
}

export default async function ServiceDetailPage({ params }: RouteProps) {
  const { slug } = await params
  const service = getService(slug)
  // ถ้า slug ไม่มีในระบบ หรือ service มี static page ของตัวเอง
  // (กรณีหลังเป็น defensive — ปกติ static segment จะ match ก่อนถึงดี)
  if (!service || service.customPage) notFound()

  const related = getRelatedServices(service.slug, 3)
  // สีตกแต่ง pixel — yellow คือสี signature แต่ถ้า accent ของ service เป็น yellow อยู่แล้ว
  // (เช่น lucky-draw) ให้ fallback เป็น red เพื่อกัน yellow-on-yellow มองไม่เห็น
  const decorAccent = service.accent === "#F1C40F" ? "#E63946" : "#F1C40F"
  // Hero text สี — bg เข้ม (red/blue) ใช้ตัวอักษรขาว, bg เหลืองสว่าง (lucky-draw) ใช้ navy
  const isLightAccent = service.accent === "#F1C40F"
  const heroTitleClass = isLightAccent ? "text-[#0A2540]" : "text-white"
  const heroBodyClass = isLightAccent ? "text-[#0A2540]" : "text-[#FFF8F0]"
  const heroMutedClass = isLightAccent ? "text-[#0A2540]/85" : "text-[#FFF8F0]/90"
  const heroCornerClass = isLightAccent ? "text-[#0A2540]/35" : "text-[#FFF8F0]/40"
  // Title pixel shadow — เฉพาะ accent เข้มที่ใช้ตัวอักษรขาว เพื่อให้ดูเป็น 8-bit arcade
  const heroTitleShadow = isLightAccent ? undefined : "3px 3px 0 #0A2540"

  return (
    <main className="min-h-screen bg-[#F4EDE0] text-[#0A2540]">
      <Navbar />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b-[3px] border-[#0A2540] bg-[#0A2540] py-3"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 text-xs text-[#F4EDE0]/70 sm:px-6 lg:px-8">
          <Link href="/" className="font-pixel uppercase hover:text-[#F1C40F]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#services" className="font-pixel uppercase hover:text-[#F1C40F]">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-pixel uppercase text-[#F1C40F]">{service.subtitle}</span>
        </div>
      </nav>

      {/* Hero — สี theme ของ service + CRT scanline overlay */}
      <header
        className="retro-scanlines relative overflow-hidden border-b-[3px] border-[#0A2540]"
        style={{ background: service.accent }}
      >
        {/* Pixel ★ corners — ตกแต่งมุมทั้ง 4 ให้ดูเป็น arcade frame */}
        <span aria-hidden className={`font-pixel pointer-events-none absolute left-3 top-3 select-none text-base ${heroCornerClass} sm:left-4 sm:top-4 sm:text-lg`}>★</span>
        <span aria-hidden className={`font-pixel pointer-events-none absolute right-3 top-3 select-none text-base ${heroCornerClass} sm:right-4 sm:top-4 sm:text-lg`}>★</span>
        <span aria-hidden className={`font-pixel pointer-events-none absolute bottom-3 left-3 select-none text-base ${heroCornerClass} sm:bottom-4 sm:left-4 sm:text-lg`}>★</span>
        <span aria-hidden className={`font-pixel pointer-events-none absolute bottom-3 right-3 select-none text-base ${heroCornerClass} sm:bottom-4 sm:right-4 sm:text-lg`}>★</span>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            {/* Badge — เพิ่ม shadow สี accent ตรงข้ามให้ pop */}
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: `4px 4px 0 ${decorAccent}` }}
            >
              ★ CORE SERVICE · {service.num}
            </span>

            <h1
              className={`mt-6 text-balance text-3xl font-black uppercase leading-[1.1] sm:text-5xl sm:leading-[1.05] lg:text-6xl ${heroTitleClass}`}
              style={heroTitleShadow ? { textShadow: heroTitleShadow } : undefined}
            >
              {service.title}
            </h1>

            {/* Pixel underline accent — signature ของ pixel theme */}
            <span
              aria-hidden
              className="mt-3 block h-1.5 w-28"
              style={{ background: decorAccent, boxShadow: "0 3px 0 #0A2540" }}
            />

            {/* Subtitle — pixel-styled tag พร้อม ▸ prefix */}
            <p className={`font-pixel mt-5 text-sm uppercase tracking-[0.3em] sm:text-base ${heroMutedClass}`}>
              ▸ {service.subtitle}
            </p>

            {/* Description — เต็ม opacity + leading กว้างขึ้น เพื่ออ่านง่าย */}
            <p className={`mt-6 max-w-xl text-base font-medium leading-relaxed sm:text-lg ${heroBodyClass}`}>
              {service.description}
            </p>

            {/* CTAs — primary (navy) + secondary (yellow → ดูฟีเจอร์)
                mobile: full-width stack, tablet+: inline flex-wrap */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: `5px 5px 0 ${decorAccent}` }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                ดูฟีเจอร์
              </a>
            </div>
          </div>

          {/* Illustration / Preview
              — heroDetailVideo : โชว์ video เปลือย ๆ ไม่มี frame/chrome (โทนคลีนสำหรับ live preview)
                                  ขนาดเท่า mobile phone preview → max-w-[16rem] (~256px)
              — heroImage / art : ใช้ window chrome + aspect frame + corner accents (arcade theme) */}
          <div
            className={`relative mx-auto w-full ${
              service.heroDetailVideo ? "max-w-[16rem]" : "max-w-md"
            }`}
          >
            {service.heroDetailVideo ? (
              <VideoLoopPreview
                sources={service.heroDetailVideo}
                ariaLabel={`Preview ${service.title}`}
                className="block w-full"
              />
            ) : (
              <>
                {/* Window chrome — arcade style title bar */}
                <div
                  className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2"
                  style={{ border: "3px solid #0A2540" }}
                >
                  <span className="flex gap-1.5">
                    <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                    <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                    <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
                  </span>
                  <span className="font-pixel text-[9px] uppercase text-[#F1C40F]">
                    PREVIEW · {service.subtitle.toUpperCase()}
                  </span>
                  <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                    </span>
                    LIVE
                  </span>
                </div>

                {/* Preview frame — 16:10 aspect ratio (matches dashboard ratio) */}
                <div
                  className={`relative aspect-16/10 overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] ${
                    service.heroImage ? "bg-[#0F1419]" : "bg-[#F4EDE0]"
                  }`}
                  style={{ boxShadow: "8px 8px 0 #0A2540" }}
                >
                  {service.heroImage ? (
                    <>
                      <Image
                        src={service.heroImage.src}
                        alt={service.heroImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover object-top"
                        priority
                      />
                      {/* Pixel corner accents — รักษา arcade theme บนภาพจริง */}
                      <span aria-hidden className="absolute left-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute right-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 bg-[#F1C40F]" />
                      <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 bg-[#F1C40F]" />
                    </>
                  ) : (
                    service.art
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Stats strip — duration / pricing */}
      <section className="border-b-[3px] border-[#0A2540] bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#0A2540]/15 px-4 sm:px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3 lg:px-8">
          <StatBox label="ระยะเวลาส่งมอบ" value={service.duration} />
          {service.startingPrice && (
            <StatBox label="ราคาเริ่มต้น" value={service.startingPrice} accent={service.accent} />
          )}
          <StatBox label="การดูแลหลังส่งมอบ" value={service.postSupport ?? "30 วัน Hypercare ฟรี"} />
        </div>
      </section>

      {/* Rental versions — Software ที่ให้บริการเช่ารายปี
          design pattern: cards 5 ใบเหมือน partnerCta.versions แต่ standalone section */}
      {service.rentalVersions && service.rentalVersions.versions.length > 0 && (
        <section className="border-t-[3px] border-[#0A2540] bg-white py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Header — centered */}
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
              <span
                className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                style={{ boxShadow: "4px 4px 0 " + service.accent }}
              >
                {service.rentalVersions.badge}
              </span>
              <h2 className="mt-6 text-balance text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
                {service.rentalVersions.title}
                <br />
                <span style={{ color: service.accent }}>
                  {service.rentalVersions.highlightedTitle}
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">
                {service.rentalVersions.description}
              </p>
            </div>

            {/* Version cards — grid 5 cols บน desktop, 2-3 บน tablet, 1 บน mobile */}
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {service.rentalVersions.versions.map((v, i) => (
                <li
                  key={v}
                  className="flex flex-col items-center bg-[#F4EDE0] p-4 text-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:p-5"
                  style={{
                    border: "3px solid #0A2540",
                    boxShadow: "5px 5px 0 " + service.accent,
                  }}
                >
                  <span
                    className="font-pixel flex h-9 w-9 items-center justify-center text-[10px]"
                    style={{
                      background: service.accent,
                      border: "2px solid #0A2540",
                      color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-pixel mt-3 text-[11px] font-black uppercase leading-tight tracking-wider text-[#0A2540] sm:text-xs">
                    {v}
                  </h3>
                </li>
              ))}
            </ul>

            {/* CTA — ขอใบเสนอราคา */}
            <div className="mt-10 flex justify-center sm:mt-12">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 " + service.accent }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Note — disclaimer ราคา/เงื่อนไข */}
            {service.rentalVersions.note && (
              <p className="font-pixel mx-auto mt-6 max-w-2xl text-center text-[10px] uppercase tracking-widest text-[#0A2540]/60 sm:text-xs">
                {service.rentalVersions.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ★ MOVED HERE: Features "สิ่งที่คุณได้" — ย้ายจาก position เดิมมาต่อหลัง Rental */}
      <section id="features" className="scroll-mt-20 border-t-[3px] border-[#0A2540] bg-[#F4EDE0] py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 " + service.accent }}
            >
              FEATURES · {String(service.features.length).padStart(2, "0")}
            </span>
            <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
              สิ่งที่คุณได้
              <br />
              จากระบบนี้
            </h2>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => {
              const anchor = service.featureAnchors?.[i]
              const cardClasses =
                "relative flex items-start gap-4 bg-white p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              // ใช้ CSS var --card-accent สำหรับ drop-shadow glow ของ clickable card
              const cardStyle: React.CSSProperties = anchor
                ? ({
                    border: "3px solid #0A2540",
                    boxShadow: "5px 5px 0 " + service.accent,
                    "--card-accent": service.accent,
                  } as React.CSSProperties)
                : {
                    border: "3px solid #0A2540",
                    boxShadow: "5px 5px 0 #0A2540",
                  }
              // Card content reusable
              const cardInner = (
                <>
                  <span
                    className="font-pixel flex h-10 w-10 shrink-0 items-center justify-center text-[10px]"
                    style={{
                      background: service.accent,
                      border: "2px solid #0A2540",
                      boxShadow: "2px 2px 0 #0A2540",
                      color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base text-[#0A2540]">{f}</span>
                  {anchor && (
                    <span
                      aria-hidden
                      className="rk-feature-chevron font-pixel ml-auto self-center text-xs"
                      style={{ color: service.accent }}
                    >
                      ▶
                    </span>
                  )}
                  {/* Hover-only hint badge — bouncing "GO →" tag */}
                  {anchor && (
                    <span
                      aria-hidden
                      className="rk-feature-hint font-pixel bg-[#0A2540] px-2 py-1 text-[9px] uppercase tracking-widest text-[#F1C40F]"
                      style={{ border: "2px solid " + service.accent, boxShadow: "2px 2px 0 " + service.accent }}
                    >
                      GO →
                    </span>
                  )}
                </>
              )
              return (
                <li key={f}>
                  {anchor ? (
                    <a
                      href={anchor}
                      aria-label={`${f} — ไปยัง section ที่อธิบายรายละเอียด`}
                      className={`group rk-feature-card-link cursor-pointer ${cardClasses}`}
                      style={cardStyle}
                    >
                      {cardInner}
                    </a>
                  ) : (
                    <div className={cardClasses} style={cardStyle}>
                      {cardInner}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ★ MOVED HERE: Recap section "ปรับ Filter & Beauty" — ขึ้นมาหลัง Rental */}
      {(() => {
        const recapShots = service.screenshotsRecap ?? service.screenshots
        if (!recapShots || recapShots.length === 0 || !service.screenshotsHeaderRecap) return null
        return (
          <section
            id="filter-beauty"
            className="scroll-mt-20 border-t-[3px] border-[#0A2540] bg-[#0A2540] py-14 sm:py-20 lg:py-28"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
                <div>
                  <span
                    className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
                    style={{ boxShadow: "4px 4px 0 " + service.accent }}
                  >
                    {service.screenshotsHeaderRecap.badge ?? "★ REAL DEPLOYMENTS"}
                  </span>
                  <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
                    {service.screenshotsHeaderRecap.title}
                    <br />
                    <span style={{ color: service.accent }}>
                      {service.screenshotsHeaderRecap.highlightedTitle}
                    </span>
                  </h2>
                  <span
                    aria-hidden
                    className="mt-4 block h-1.5 w-24"
                    style={{ background: service.accent, boxShadow: "0 3px 0 #0A2540" }}
                  />
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F4EDE0]/85 sm:text-lg">
                    {service.screenshotsHeaderRecap.description}
                  </p>
                </div>
                <div className="relative">
                  <ImageSlideshow
                    screenshots={recapShots}
                    accent={service.accent}
                    subtitle={service.subtitle}
                  />
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ★ MOVED HERE: Slideshow sections "ปรับ Performance" — ต่อหลัง Filter & Beauty */}
      {service.slideshowSections?.map((sec, idx) => {
        const isLightBg = idx % 2 === 0
        const sectionBg = isLightBg ? "bg-[#F4EDE0]" : "bg-[#0A2540]"
        const titleColor = isLightBg ? "text-[#0A2540]" : "text-white"
        const descColor = isLightBg ? "text-[#0A2540]/80" : "text-[#F4EDE0]/85"
        const badgeBg = isLightBg ? "bg-[#0A2540] text-[#F1C40F]" : "bg-[#F1C40F] text-[#0A2540]"
        return (
          <section
            key={sec.badge}
            id={sec.slug}
            className={`scroll-mt-20 border-t-[3px] border-[#0A2540] ${sectionBg} py-14 sm:py-20 lg:py-28`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
                <div>
                  <span
                    className={`font-pixel inline-block px-3 py-2 text-[10px] uppercase tracking-widest ${badgeBg}`}
                    style={{ boxShadow: "4px 4px 0 " + service.accent }}
                  >
                    {sec.badge}
                  </span>
                  <h2 className={`mt-5 text-2xl font-black uppercase leading-tight ${titleColor} sm:text-3xl lg:text-4xl`}>
                    {sec.title}
                    <br />
                    <span style={{ color: service.accent }}>{sec.highlightedTitle}</span>
                  </h2>
                  <span
                    aria-hidden
                    className="mt-4 block h-1.5 w-24"
                    style={{ background: service.accent, boxShadow: "0 3px 0 #0A2540" }}
                  />
                  <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${descColor}`}>
                    {sec.description}
                  </p>
                </div>
                <div className="relative">
                  <ImageSlideshow
                    screenshots={sec.screenshots}
                    accent={service.accent}
                    subtitle={service.subtitle}
                  />
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Realtime Dashboard — Web Dashboard ปรับแต่ง Sync ตู้ realtime + uptime metrics
          2-col top (text + slideshow) + 3 metric cards ล่าง + overall uptime banner */}
      {service.realtimeDashboard && (
        <section
          id="realtime-dashboard"
          className="scroll-mt-20 border-t-[3px] border-[#0A2540] bg-[#0A2540] py-14 sm:py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* ── Top row: text + slideshow ── */}
            <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
              <div>
                <span
                  className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
                  style={{ boxShadow: "4px 4px 0 " + service.accent }}
                >
                  {service.realtimeDashboard.badge}
                </span>
                <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-3xl lg:text-4xl">
                  {service.realtimeDashboard.title}
                  <br />
                  <span style={{ color: service.accent }}>
                    {service.realtimeDashboard.highlightedTitle}
                  </span>
                </h2>
                <span
                  aria-hidden
                  className="mt-4 block h-1.5 w-24"
                  style={{ background: service.accent, boxShadow: "0 3px 0 #0A2540" }}
                />
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F4EDE0]/85 sm:text-lg">
                  {service.realtimeDashboard.description}
                </p>
              </div>
              <div className="relative">
                <ImageSlideshow
                  screenshots={service.realtimeDashboard.screenshots}
                  accent={service.accent}
                  subtitle={service.subtitle}
                />
              </div>
            </div>

            {/* ── Uptime metric cards · 3 cols on sm+ ── */}
            <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
              {service.realtimeDashboard.metrics.map((m) => (
                <div
                  key={m.label}
                  className="relative bg-white p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 " + service.accent }}
                >
                  {/* Top row: live dot + label */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-pixel inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#0A2540]/70">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                      </span>
                      LIVE
                    </span>
                    <span className="font-pixel bg-[#0A2540] px-2 py-1 text-[9px] uppercase text-[#F1C40F]">
                      {m.label}
                    </span>
                  </div>

                  {/* Big value */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span
                      className="font-pixelify text-5xl font-black leading-none sm:text-6xl"
                      style={{ color: "#2ECC71" }}
                    >
                      {m.value}
                    </span>
                  </div>

                  {/* Progress bar — 5 animations stacked:
                      1) fill-in (mount once)         · width 0 → target %
                      2) pulse glow (loop)             · green halo เด้ง
                      3) loading stripes (loop)        · diagonal ไหล "charging power"
                      4) shimmer sweep (loop)          · highlight ขาวกวาดผ่าน "live data"
                      5) energy spark (loop)           · จุดขาวที่ปลายขวา "energy injection" */}
                  <div
                    className="mt-4 h-3 w-full overflow-hidden bg-[#F4EDE0]"
                    style={{ border: "2px solid #0A2540" }}
                  >
                    <div
                      className="rk-bar-fill rk-bar-pulse"
                      style={{ "--bar-w": `${m.percent}%` } as React.CSSProperties}
                    >
                      <span aria-hidden className="rk-bar-loading-stripes" />
                      <span aria-hidden className="rk-bar-shimmer" />
                      <span aria-hidden className="rk-bar-energy-spark" />
                    </div>
                  </div>

                  {/* Optional subtitle */}
                  {m.sub && (
                    <p className="mt-3 text-xs leading-relaxed text-[#0A2540]/70 sm:text-sm">
                      {m.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* ── Overall uptime banner ── */}
            <div
              className="mt-8 flex flex-col items-center justify-between gap-3 bg-[#F1C40F] p-5 sm:flex-row"
              style={{ border: "3px solid #0A2540", boxShadow: "6px 6px 0 " + service.accent }}
            >
              <span className="font-pixel inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0A2540] sm:text-xs">
                <span className="text-base">★</span> OVERALL · CLOUD HA UPTIME
              </span>
              <span className="font-pixelify text-3xl font-black text-[#0A2540] sm:text-4xl">
                {service.realtimeDashboard.uptimeOverall}
              </span>
              {service.realtimeDashboard.uptimeNote && (
                <span className="font-pixel text-center text-[9px] uppercase tracking-widest text-[#0A2540]/70 sm:text-right sm:text-[10px]">
                  {service.realtimeDashboard.uptimeNote}
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Key Features Deep Dive — สลับ layout image ซ้าย/ขวา + bg ต่างกัน */}
      {service.keyFeatures?.map((kf, idx) => {
        const imageOnRight = idx % 2 === 1
        const sectionBg = idx % 2 === 0 ? "bg-white" : "bg-[#F4EDE0]"
        const cardBg = idx % 2 === 0 ? "bg-[#F4EDE0]" : "bg-white"
        // เลือก aspect ratio ของ image frame ตามแนวภาพจริง
        // — กัน letterbox กว้างเกินไปบน desktop เมื่อภาพไม่ใช่ landscape
        const imageAspectClass = (() => {
          switch (kf.imageAspect) {
            case "portrait":  return "aspect-3/4 sm:aspect-3/4"
            case "square":    return "aspect-square"
            case "landscape": return "aspect-4/3"
            // phone — 9:16 mobile UI shape สำหรับ payment screen / mobile app preview
            case "phone":     return "aspect-9/16"
            // video — 16:9 standard video สำหรับ screen recording / promo clip
            case "video":     return "aspect-video"
            default:          return "aspect-4/5 sm:aspect-5/4"
          }
        })()
        // phone → render บริสุทธิ์ ไม่มี window chrome (clean frameless display)
        // video → kiosk-style frame ของตัวเอง (มี border + shadow แต่ไม่มี internal padding)
        const isPhone = kf.imageAspect === "phone"
        const isVideo = kf.imageAspect === "video"
        const isCleanFrame = isPhone
        // ขนาด wrapper ต่างกันตาม aspect:
        //   phone — narrow column สำหรับ mobile preview
        //   video — กว้างเต็มคอลัมน์ ให้เห็นรายละเอียดบน desktop
        const imageWrapperClass = (() => {
          if (kf.imageAspect === "phone") return "mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem]"
          // video — min-w-0 กัน grid cell ขยายตาม rk-marquee-track (width: max-content)
          // ไม่งั้น aspect-video ของ video frame เพี้ยนตามความกว้าง caption ที่วิ่ง
          if (kf.imageAspect === "video") return "mx-auto w-full min-w-0"
          return ""
        })()
        // Filename ใน window chrome — ปรับตาม eyebrow
        const fileName = kf.eyebrow
          .replace(/[★·\s]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .toLowerCase() + ".json"
        return (
          <section
            key={kf.eyebrow}
            id={kf.slug}
            className={`scroll-mt-20 border-t-[3px] border-[#0A2540] ${sectionBg} py-14 sm:py-20 lg:py-28`}
          >
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isPhone ? "max-w-6xl" : "max-w-7xl"}`}>
              <div
                className={`grid gap-10 lg:items-center lg:gap-14 ${
                  isPhone
                    ? "lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16"
                    : "lg:grid-cols-[5fr_6fr]"
                }`}
              >
                {/* Image block
                    — phone/video: render บริสุทธิ์ ไม่มี window chrome / frame / corner accents
                    — aspects อื่น: ใช้ arcade window frame ครบ */}
                <div className={`relative ${imageOnRight ? "lg:order-2" : ""} ${imageWrapperClass}`}>
                  {isCleanFrame ? (
                    <>
                      <div className={`relative ${imageAspectClass} overflow-hidden`}>
                        {kf.video ? (
                          <VideoLoopPreview
                            sources={kf.video}
                            loopsPerVideo={kf.videoLoopCount}
                            ariaLabel={kf.image.alt}
                            className="absolute inset-0 block h-full w-full object-contain"
                          />
                        ) : (
                          <Image
                            src={kf.image.src}
                            alt={kf.image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 480px"
                            quality={90}
                            className="object-contain"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="font-pixel mt-4 text-center text-[10px] uppercase tracking-widest text-[#0A2540]/55">
                        ★ {kf.image.caption}
                      </p>
                    </>
                  ) : isVideo ? (
                    <>
                      {/* Kiosk display chrome — minimal top bar เน้น "ON AIR" indicator
                          เข้ากับ context "Self-service Vending" ของ Payment Channel */}
                      <div
                        className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2"
                        style={{ border: "3px solid #0A2540" }}
                      >
                        <span className="flex gap-1.5">
                          <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                          <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                          <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
                        </span>
                        <span className="font-pixel hidden truncate text-[9px] uppercase text-[#F1C40F] sm:inline">
                          ★ KIOSK DISPLAY · LIVE PREVIEW
                        </span>
                        <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                          </span>
                          ON AIR
                        </span>
                      </div>
                      {/* Video เต็มกรอบ ไม่มี padding ภายใน — ให้ kiosk screen ดูเต็มจอ */}
                      <div
                        className={`relative ${imageAspectClass} overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] bg-black`}
                        style={{ boxShadow: "10px 10px 0 " + service.accent }}
                      >
                        <VideoLoopPreview
                          sources={kf.video!}
                          loopsPerVideo={kf.videoLoopCount}
                          ariaLabel={kf.image.alt}
                          className="absolute inset-0 block h-full w-full object-cover"
                        />
                        {/* Pixel corner accents */}
                        <span aria-hidden className="absolute left-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute right-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute bottom-0 left-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute bottom-0 right-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                      </div>
                      {/* Caption marquee — ข้อความวิ่ง loop ใต้ kiosk frame
                          ใช้ pattern เดียวกับ MarqueeSection: ทำซ้ำ caption เพื่อให้ -50% animation loop เนียน */}
                      <div
                        className="rk-marquee-viewport mt-6 bg-[#0A2540] py-3"
                        style={{ border: "3px solid #0A2540", boxShadow: "3px 3px 0 " + service.accent }}
                        aria-label={kf.image.caption}
                      >
                        <div className="rk-marquee-track">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <span
                              key={i}
                              className="font-pixel text-[10px] uppercase tracking-widest text-[#F1C40F]"
                            >
                              ★ {kf.image.caption}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Window chrome */}
                      <div
                        className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2"
                        style={{ border: "3px solid #0A2540" }}
                      >
                        <span className="flex gap-1.5">
                          <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                          <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                          <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
                        </span>
                        <span className="font-pixel hidden truncate text-[9px] uppercase text-[#F1C40F] sm:inline">
                          {fileName}
                        </span>
                        <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                          </span>
                          LIVE
                        </span>
                      </div>
                      {/* Media frame — render video ถ้ามี kf.video, ไม่งั้น fallback ไป image
                          — bg-[#0F1419] เลียนสีพื้น dashboard ในภาพ → letterbox เนียนไร้รอยต่อ
                          — padding บนสื่อ ทำให้มีพื้นที่หายใจ ไม่ติดขอบ window chrome */}
                      <div
                        className={`relative ${imageAspectClass} overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] bg-[#0F1419]`}
                        style={{ boxShadow: "10px 10px 0 " + service.accent }}
                      >
                        {kf.video ? (
                          <VideoLoopPreview
                            sources={kf.video}
                            loopsPerVideo={kf.videoLoopCount}
                            ariaLabel={kf.image.alt}
                            className="absolute inset-0 block h-full w-full object-contain p-3 sm:p-4"
                          />
                        ) : (
                          <Image
                            src={kf.image.src}
                            alt={kf.image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 720px"
                            quality={90}
                            className="object-contain p-3 sm:p-4"
                            loading="lazy"
                          />
                        )}
                        {/* Pixel corner accents */}
                        <span aria-hidden className="absolute left-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute right-0 top-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute bottom-0 left-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                        <span aria-hidden className="absolute bottom-0 right-0 z-10 h-3 w-3 bg-[#F1C40F]" />
                      </div>
                      <p className="font-pixel mt-4 text-center text-[10px] uppercase tracking-widest text-[#0A2540]/55">
                        ★ {kf.image.caption}
                      </p>
                    </>
                  )}
                </div>

                {/* Content block — phone aspect: จำกัด max-width ให้อ่านง่าย + ลดขนาด heading */}
                <div
                  className={`${imageOnRight ? "lg:order-1" : ""} ${
                    isPhone ? "lg:max-w-2xl" : ""
                  }`}
                >
                  <span
                    className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                    style={{ boxShadow: "4px 4px 0 " + service.accent }}
                  >
                    {kf.eyebrow}
                  </span>
                  <h2
                    className={`mt-5 text-balance font-black uppercase leading-tight text-[#0A2540] ${
                      isPhone
                        ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                        : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    }`}
                  >
                    {kf.title}
                    <br />
                    <span style={{ color: service.accent }}>{kf.highlightedTitle}</span>
                  </h2>
                  {/* Description — รองรับหลาย paragraphs ผ่าน \n\n
                      paragraph แรก = mt-5, paragraphs ถัดไป = mt-4 (เว้นห่างกันสวยๆ) */}
                  {kf.description.split(/\n\n+/).map((para, i) => (
                    <p
                      key={i}
                      className={`${i === 0 ? "mt-5" : "mt-4"} text-base leading-relaxed text-[#0A2540]/80 sm:text-lg`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Benefit cards */}
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {kf.benefits.map((b, i) => (
                      <li
                        key={b.title}
                        className={`${cardBg} p-4 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5`}
                        style={{
                          border: "2px solid #0A2540",
                          boxShadow: "4px 4px 0 " + service.accent,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="font-pixel flex h-7 w-7 shrink-0 items-center justify-center text-[10px]"
                            style={{
                              background: service.accent,
                              border: "2px solid #0A2540",
                              color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-sm font-black uppercase leading-tight text-[#0A2540] sm:text-base">
                            {b.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#0A2540]/75">
                          {b.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Payment CTA — Transaction T+2 + Dashboard Realtime
          UI pattern: bg navy + pixel grid + centered, อ้างอิงจาก <CtaSection> */}
      {service.ctaPayment && (
        <section
          id="payment-settlement"
          className="relative scroll-mt-20 overflow-hidden border-t-[3px] border-[#0A2540] bg-[#0A2540] py-14 sm:py-20 lg:py-28"
        >
          {/* Pixel grid background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#F1C40F 1px, transparent 1px), linear-gradient(90deg, #F1C40F 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            {/* Badge */}
            <span
              className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
              style={{ boxShadow: "4px 4px 0 " + service.accent }}
            >
              {service.ctaPayment.badge}
            </span>

            {/* Highlight chip — T + 2 เด่นๆ ให้คนเห็นทันที */}
            <div className="mt-8 flex justify-center">
              <span
                className="font-pixel inline-flex items-center bg-[#F1C40F] px-6 py-4 text-3xl font-black uppercase tracking-wider text-[#0A2540] sm:text-4xl lg:text-5xl"
                style={{ border: "3px solid #0A2540", boxShadow: "6px 6px 0 " + service.accent }}
              >
                {service.ctaPayment.highlight}
              </span>
            </div>

            {/* Heading — split \n แล้ว render ด้วย <br/> เพื่อรับประกัน line break ทุก viewport
                + text-balance ป้องกัน orphan word ตกบรรทัดเดี่ยว */}
            <h2 className="mt-8 text-balance text-2xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
              {service.ctaPayment.title.split(/\n+/).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>

            {/* Description — split paragraphs ด้วย \n\n */}
            <div className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {service.ctaPayment.description.split(/\n\n+/).map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {para}
                </p>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #F1C40F", boxShadow: "5px 5px 0 #F1C40F" }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://lin.ee/ZDaqVzd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2ECC71] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #F1C40F", boxShadow: "5px 5px 0 #F1C40F" }}
              >
                คุยผ่าน LINE @rubkiancode
              </a>
            </div>

            {/* Note pixel เล็กข้างล่าง */}
            {service.ctaPayment.note && (
              <p className="font-pixel mt-8 text-[10px] uppercase tracking-widest text-[#F1C40F]/70 sm:text-xs">
                {service.ctaPayment.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ★ MOVED HERE: Primary Screenshots Gallery "ภาพตัวอย่าง ระบบของเรา" — ต่อท้าย T+2 */}
      {service.screenshots && service.screenshots.length > 0 && (
        <section
          id="partner-booths"
          className="scroll-mt-20 border-t-[3px] border-[#0A2540] bg-[#0A2540] py-14 sm:py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <span
                className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
                style={{ boxShadow: "4px 4px 0 " + service.accent }}
              >
                {service.screenshotsHeader?.badge ?? "★ PRODUCT SCREENSHOTS"}
              </span>
              <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                {service.screenshotsHeader?.title ?? "ดูภาพจริง"}
                <br />
                <span style={{ color: service.accent }}>
                  {service.screenshotsHeader?.highlightedTitle ?? "เข้าใจระบบใน 30 วินาที"}
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F4EDE0]/80 sm:text-lg">
                {service.screenshotsHeader?.description ?? (
                  <>
                    ระบบที่ลูกค้าใช้งานจริงทุกวัน — Dashboard ดูภาพรวม,
                    Marketing Automation ส่งให้ลูกค้ากลับมาซ้ำ,
                    และ Multi-touch Attribution บอกว่าแต่ละบาทที่ลงโฆษณา <b className="text-white">คืนกำไรกลับมาเท่าไหร่</b>
                  </>
                )}
              </p>
            </div>
            <ScreenshotsGallery
              screenshots={service.screenshots}
              accent={service.accent}
              subtitle={service.subtitle}
            />
          </div>
        </section>
      )}

      {/* Partner Program section — ชวนสมัครเป็น Partner + เน้น "Update Program" + "Online Support 12/7"
          friendly tone, มี benefit cards + dual CTA (สมัคร + LINE) */}
      {service.partnerCta && (
        <section
          id="partner-program"
          className="scroll-mt-20 border-t-[3px] border-[#0A2540] bg-[#F4EDE0] py-14 sm:py-20 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Header — centered */}
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span
                className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                style={{ boxShadow: "4px 4px 0 " + service.accent }}
              >
                {service.partnerCta.badge}
              </span>
              <h2 className="mt-6 text-balance text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
                {service.partnerCta.title}
                <br />
                <span style={{ color: service.accent }}>
                  {service.partnerCta.highlightedTitle}
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">
                {service.partnerCta.description}
              </p>
            </div>

            {/* Version cards — โชว์ Software/Product ที่ Partner ได้รับ
                grid 5 cols บน desktop, 2-3 บน tablet, 1 บน mobile */}
            {service.partnerCta.versions && service.partnerCta.versions.length > 0 && (
              <div className="mb-12">
                <p className="font-pixel mb-6 text-center text-xs uppercase tracking-widest text-[#0A2540]/70 sm:text-sm">
                  ★ Software ที่ Partner ได้รับ
                </p>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
                  {service.partnerCta.versions.map((v, i) => (
                    <li
                      key={v}
                      className="flex flex-col items-center bg-white p-4 text-center transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:p-5"
                      style={{
                        border: "3px solid #0A2540",
                        boxShadow: "5px 5px 0 " + service.accent,
                      }}
                    >
                      <span
                        className="font-pixel flex h-9 w-9 items-center justify-center text-[10px]"
                        style={{
                          background: service.accent,
                          border: "2px solid #0A2540",
                          color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-pixel mt-3 text-[11px] font-black uppercase leading-tight tracking-wider text-[#0A2540] sm:text-xs">
                        {v}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefit cards — grid 2 col on tablet+, 1 col on mobile */}
            <ul className="mx-auto grid max-w-4xl gap-6 sm:gap-8 md:grid-cols-2">
              {service.partnerCta.benefits.map((b, i) => (
                <li
                  key={b.title}
                  className="flex flex-col bg-white p-6 transition-transform hover:-translate-x-1 hover:-translate-y-1 sm:p-8"
                  style={{
                    border: "3px solid #0A2540",
                    boxShadow: "8px 8px 0 " + service.accent,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon chip — emoji/symbol จาก data หรือ fallback number */}
                    <span
                      className="font-pixel flex h-12 w-12 shrink-0 items-center justify-center text-2xl"
                      style={{
                        background: service.accent,
                        border: "3px solid #0A2540",
                        color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                      }}
                    >
                      {b.icon ?? String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-black uppercase leading-tight text-[#0A2540] sm:text-xl">
                      {b.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-[#0A2540]/80">
                    {b.description}
                  </p>
                </li>
              ))}
            </ul>

            {/* CTA buttons — สมัคร Partner (primary) + LINE (secondary) */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 " + service.accent }}
              >
                สมัครเป็น Partner
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://lin.ee/ZDaqVzd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2ECC71] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                คุยผ่าน LINE @rubkiancode
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t-[3px] border-[#0A2540] bg-white py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span
                className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                style={{ boxShadow: "4px 4px 0 #E63946" }}
              >
                MORE · CORE SERVICES
              </span>
              <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl">
                บริการอื่นที่อาจสนใจ
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={getServiceHref(r)}
                  className="group flex flex-col bg-[#F4EDE0] transition-transform hover:-translate-x-1 hover:-translate-y-1"
                  style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 " + r.accent }}
                >
                  <div
                    className="flex items-start gap-3 border-b-[3px] border-[#0A2540] p-4"
                    style={{ background: r.accent }}
                  >
                    <span className="font-pixel bg-[#0A2540] px-2 py-1.5 text-[10px] text-[#F1C40F]">
                      {r.num}
                    </span>
                    <h3 className="text-base font-black uppercase leading-tight text-white">
                      {r.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-4 text-sm text-[#0A2540]">
                    <span>{r.subtitle}</span>
                    <span className="font-pixel" style={{ color: r.accent }}>
                      ▶
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <Footer />
    </main>
  )
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="px-6 py-6 sm:py-8">
      <span className="font-pixel block text-[10px] uppercase tracking-widest text-[#0A2540]/60">
        {label}
      </span>
      <span
        className="mt-2 block text-lg font-black text-[#0A2540] sm:text-xl"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </span>
    </div>
  )
}
