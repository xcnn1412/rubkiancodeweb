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

      {/* Hero — สี theme ของ service */}
      <header
        className="relative overflow-hidden border-b-[3px] border-[#0A2540]"
        style={{ background: service.accent }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span
              className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
              style={{ boxShadow: "4px 4px 0 #0A2540" }}
            >
              CORE SERVICE · {service.num}
            </span>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] text-[#0A2540] sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-3 text-xl font-bold uppercase tracking-wide text-[#0A2540]/80 sm:text-2xl">
              {service.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#0A2540]/85 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#0A2540] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 white" }}
              >
                ขอใบเสนอราคา
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div
            className="relative mx-auto w-full max-w-md bg-[#F4EDE0]"
            style={{ border: "3px solid #0A2540", boxShadow: "8px 8px 0 #0A2540" }}
          >
            {service.art}
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
      <section className="bg-[#F4EDE0] py-20 sm:py-28">
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
