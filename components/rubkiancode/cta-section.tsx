// แถบ CTA แดงเข้ม คั่นก่อนถึงฟอร์ม Contact

import { ArrowIcon } from "./icons"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A2540] py-14 sm:py-20 lg:py-28">
      {/* ตารางพิกเซลเป็น background */}
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
        <span
          className="font-pixel inline-block bg-[#F1C40F] px-3 py-2 text-[10px] uppercase tracking-widest text-[#0A2540]"
          style={{ boxShadow: "4px 4px 0 #E63946" }}
        >
          PRESS START
        </span>

        <h2 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
          พร้อมเริ่มโปรเจกต์ของคุณ?
          <br />
          คุยฟรี 30 นาที <span className="text-[#F1C40F]">ไม่มีค่าใช้จ่าย</span>
        </h2>

        <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
          เล่าโจทย์ของคุณให้ฟัง เราจะตอบกลับด้วย Scope, ราคาเบื้องต้น
          และไอเดียสถาปัตยกรรม — เป็นลายลักษณ์อักษร ภายใน 1 วันทำการ
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#E63946] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ border: "3px solid #F1C40F", boxShadow: "5px 5px 0 #F1C40F" }}
          >
            ขอใบเสนอราคา
            <ArrowIcon className="h-4 w-4" />
          </a>
          <a
            href="https://lin.ee/py7hRoKC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2ECC71] px-6 py-3 font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ border: "3px solid #F1C40F", boxShadow: "5px 5px 0 #F1C40F" }}
          >
            คุยผ่าน LINE @rubkiancode
          </a>
        </div>
      </div>
    </section>
  )
}
