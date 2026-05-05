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
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `/services/${service.slug}`,
      type: "website",
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

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            {/* Badge — เพิ่ม shadow สี accent ตรงข้ามให้ pop */}
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: `4px 4px 0 ${decorAccent}` }}
            >
              ★ CORE SERVICE · {service.num}
            </span>

            <h1
              className={`mt-6 text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl ${heroTitleClass}`}
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

            {/* CTAs — primary (navy) + secondary (yellow → ดูฟีเจอร์) */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: `5px 5px 0 ${decorAccent}` }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-[#F1C40F] px-6 py-3 font-black uppercase tracking-wider text-[#0A2540] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                ดูฟีเจอร์
              </a>
            </div>
          </div>

          {/* Illustration / Preview — aspect-ratio กำหนดเพื่อกัน height collapse */}
          <div className="relative mx-auto w-full max-w-md">
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

            {/* Preview frame — 16:10 aspect ratio (matches dashboard ratio)
                — heroImage = real screenshot (dark bg + pixel corners)
                — fallback = pixel art (cream bg) */}
            <div
              className={`relative aspect-16/10 overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] ${service.heroImage ? "bg-[#0F1419]" : "bg-[#F4EDE0]"}`}
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
          <StatBox label="การดูแลหลังส่งมอบ" value="30 วัน Hypercare ฟรี" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 bg-[#F4EDE0] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 " + service.accent }}
            >
              FEATURES · {String(service.features.length).padStart(2, "0")}
            </span>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
              สิ่งที่คุณได้
              <br />
              จากระบบนี้
            </h2>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <li
                key={f}
                className="flex items-start gap-4 bg-white p-5 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
              >
                <span
                  className="font-pixel flex h-10 w-10 flex-shrink-0 items-center justify-center text-[10px]"
                  style={{
                    background: service.accent,
                    border: "2px solid #0A2540",
                    boxShadow: "2px 2px 0 #0A2540",
                    color: service.accent === "#F1C40F" ? "#0A2540" : "white",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-[#0A2540]">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Screenshots gallery — โชว์ภาพจริงของ product/dashboard */}
      {service.screenshots && service.screenshots.length > 0 && (
        <section className="border-t-[3px] border-[#0A2540] bg-[#0A2540] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section head */}
            <div className="mb-12 max-w-3xl">
              <span
                className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
                style={{ boxShadow: "4px 4px 0 " + service.accent }}
              >
                ★ PRODUCT SCREENSHOTS
              </span>
              <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                ดูภาพจริง
                <br />
                <span style={{ color: service.accent }}>เข้าใจระบบใน 30 วินาที</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F4EDE0]/80 sm:text-lg">
                ระบบที่ลูกค้าใช้งานจริงทุกวัน — Dashboard ดูภาพรวม,
                Marketing Automation ส่งให้ลูกค้ากลับมาซ้ำ,
                และ Multi-touch Attribution บอกว่าแต่ละบาทที่ลงโฆษณา <b className="text-white">คืนกำไรกลับมาเท่าไหร่</b>
              </p>
            </div>

            {/* Gallery — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.screenshots.map((shot, i) => (
                <figure
                  key={shot.src}
                  className="group flex flex-col bg-[#F4EDE0] transition-transform hover:-translate-x-1 hover:-translate-y-1"
                  style={{ border: "3px solid " + service.accent, boxShadow: "8px 8px 0 " + service.accent }}
                >
                  {/* Browser chrome — arcade window style */}
                  <div className="flex items-center justify-between gap-3 bg-[#0A2540] px-3 py-2 sm:px-4">
                    <span className="flex gap-1.5">
                      <i className="block h-3 w-3 rounded-full bg-[#E63946]" />
                      <i className="block h-3 w-3 rounded-full bg-[#F39C12]" />
                      <i className="block h-3 w-3 rounded-full bg-[#2ECC71]" />
                    </span>
                    <span className="font-pixel hidden text-[9px] uppercase text-[#F1C40F] sm:inline">
                      SCREEN · {String(i + 1).padStart(2, "0")} · {service.subtitle.toUpperCase()}
                    </span>
                    <span className="font-pixel inline-flex items-center gap-1 text-[9px] uppercase text-[#F1C40F]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2ECC71] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2ECC71]" />
                      </span>
                      LIVE
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden border-y-[3px] border-[#0A2540] bg-[#0A2540]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    {/* Pixel corner accents */}
                    <span aria-hidden className="absolute left-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute right-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 bg-[#F1C40F]" />
                  </div>

                  {/* Caption */}
                  <figcaption className="flex items-center justify-between gap-3 p-4 sm:p-5">
                    <span
                      className="font-pixel bg-[#0A2540] px-2 py-1.5 text-[10px] uppercase text-[#F1C40F]"
                      style={{ boxShadow: "2px 2px 0 " + service.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-bold text-[#0A2540] sm:text-base">
                      {shot.caption}
                    </span>
                    <span className="font-pixel hidden text-xs sm:inline" style={{ color: service.accent }}>
                      ▶
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Note */}
            <p className="mt-8 text-center text-sm text-[#F4EDE0]/55">
              ★ ภาพตัวอย่างจาก Pulse Marketing OS · ระบบที่พัฒนาส่งมอบลูกค้าจริง
            </p>
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
            default:          return "aspect-4/5 sm:aspect-5/4"
          }
        })()
        // Filename ใน window chrome — ปรับตาม eyebrow
        const fileName = kf.eyebrow
          .replace(/[★·\s]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .toLowerCase() + ".json"
        return (
          <section
            key={kf.eyebrow}
            className={`border-t-[3px] border-[#0A2540] ${sectionBg} py-14 sm:py-20 lg:py-28`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-14">
                {/* Image block */}
                <div className={`relative ${imageOnRight ? "lg:order-2" : ""}`}>
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
                  {/* Image frame
                      — bg-[#0F1419] เลียนสีพื้น dashboard ในภาพ → letterbox เนียนไร้รอยต่อ
                      — padding บน <Image> ทำให้ภาพมีพื้นที่หายใจ ไม่ติดขอบ window chrome */}
                  <div
                    className={`relative ${imageAspectClass} overflow-hidden border-x-[3px] border-b-[3px] border-[#0A2540] bg-[#0F1419]`}
                    style={{ boxShadow: "10px 10px 0 " + service.accent }}
                  >
                    <Image
                      src={kf.image.src}
                      alt={kf.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-contain p-3 sm:p-4"
                      loading="lazy"
                    />
                    {/* Pixel corner accents */}
                    <span aria-hidden className="absolute left-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute right-0 top-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 bg-[#F1C40F]" />
                    <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 bg-[#F1C40F]" />
                  </div>
                  <p className="font-pixel mt-4 text-center text-[10px] uppercase tracking-widest text-[#0A2540]/55">
                    ★ {kf.image.caption}
                  </p>
                </div>

                {/* Content block */}
                <div className={imageOnRight ? "lg:order-1" : ""}>
                  <span
                    className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                    style={{ boxShadow: "4px 4px 0 " + service.accent }}
                  >
                    {kf.eyebrow}
                  </span>
                  <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl lg:text-5xl">
                    {kf.title}
                    <br />
                    <span style={{ color: service.accent }}>{kf.highlightedTitle}</span>
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#0A2540]/80 sm:text-lg">
                    {kf.description}
                  </p>

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

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t-[3px] border-[#0A2540] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span
                className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
                style={{ boxShadow: "4px 4px 0 #E63946" }}
              >
                MORE · CORE SERVICES
              </span>
              <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-[#0A2540] sm:text-4xl">
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
