// 404 page เฉพาะของ /services/[slug] — ใช้เมื่อ slug ไม่มีใน SERVICES

import Link from "next/link"
import { Navbar } from "@/components/rubkiancode/navbar"
import { ArrowIcon } from "@/components/rubkiancode/icons"
import { SERVICES, getServiceHref } from "../_data/services"

export default function ServiceNotFound() {
  return (
    <main className="min-h-screen bg-[#F4EDE0] text-[#0A2540]">
      <Navbar />

      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span
          className="font-pixel inline-block bg-[#0A2540] px-3 py-2 text-[10px] uppercase tracking-widest text-[#F1C40F]"
          style={{ boxShadow: "4px 4px 0 #E63946" }}
        >
          ERROR · 404
        </span>

        <h1 className="font-pixel mt-8 text-6xl text-[#E63946] sm:text-7xl lg:text-8xl">404</h1>
        <h2 className="mt-4 text-2xl font-black uppercase text-[#0A2540] sm:text-3xl">
          ไม่พบบริการที่คุณหา
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#0A2540]/75 sm:text-lg">
          URL อาจสะกดผิด หรือบริการนี้ยังไม่เปิดให้บริการ — ลองดูบริการที่เรามีด้านล่างนี้
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={getServiceHref(s)}
              className="font-pixel inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              style={{
                background: s.accent,
                color: s.accent === "#F1C40F" ? "#0A2540" : "white",
                border: "2px solid #0A2540",
                boxShadow: "3px 3px 0 #0A2540",
              }}
            >
              {s.subtitle}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          style={{ border: "3px solid #0A2540", boxShadow: "5px 5px 0 #0A2540" }}
        >
          กลับหน้าแรก
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </section>
    </main>
  )
}
