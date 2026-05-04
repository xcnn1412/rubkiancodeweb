// Footer แบบ 4 คอลัมน์ + แถวล่างมีลิขสิทธิ์ + ลิงก์นโยบาย

import { BrandLogo } from "./icons"

const SERVICE_LINKS = [
  { href: "#services", label: "ระบบการตลาด" },
  { href: "#services", label: "Office ERP" },
  { href: "#services", label: "Lucky Draw System" },
  { href: "#services", label: "Custom Software" },
  { href: "#services", label: "Web & E-commerce" },
  { href: "#services", label: "IT Consulting" },
] as const

const ABOUT_LINKS = [
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#process", label: "วิธีการทำงาน" },
  { href: "#why", label: "ทำไมต้องเรา" },
  { href: "#contact", label: "ติดต่อ" },
] as const

const CONTACT_LINKS = [
  { href: "mailto:rubkiancode@gmail.com", label: "rubkiancode@gmail.com" },
  { href: "tel:0635944429", label: "063-594-4429" },
  { href: "https://lin.ee/py7hRoKC", label: "@rubkiancode" },
  { href: "#", label: "กรุงเทพมหานคร" },
] as const

export function Footer() {
  return (
    <footer className="border-t-[3px] border-[#0A2540] bg-[#0A2540] text-[#F4EDE0]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + tagline */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <a
              href="#top"
              aria-label="RubKianCode หน้าแรก"
              className="flex items-center gap-3 text-[#F1C40F]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center bg-[#F1C40F] text-[#0A2540]"
                style={{ border: "2px solid #F1C40F", boxShadow: "3px 3px 0 #E63946" }}
              >
                <BrandLogo className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-tight">
                <b className="text-lg font-black text-[#F4EDE0]">
                  rubkian<span className="text-[#E63946]">code</span>
                </b>
                <small className="font-pixelify text-[11px] text-[#F4EDE0]/60">
                  &gt; software_studio.exe
                </small>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-[#F4EDE0]/70">
              บริษัทรับเขียนโปรแกรมครบวงจร สำหรับผู้ประกอบการไทย — ผลิต จำหน่าย
              ให้คำปรึกษา การเช่าซอฟต์แวร์ที่ขึ้นชื่อจากเรา
            </p>
            <span
              className="font-pixel inline-flex items-center gap-2 bg-[#2ECC71] px-3 py-1.5 text-[10px] uppercase text-[#0A2540]"
            >
              <i className="block h-2 w-2 animate-pulse rounded-full bg-[#0A2540]" />
              ระบบออนไลน์ 24/7
            </span>
          </div>

          {/* Services */}
          <FooterCol title="บริการ">
            {SERVICE_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* About */}
          <FooterCol title="เกี่ยวกับเรา">
            {ABOUT_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Contact */}
          <FooterCol title="ติดต่อ">
            {CONTACT_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#F4EDE0]/15 pt-6 text-xs text-[#F4EDE0]/60 sm:flex-row sm:items-center">
          <span>© 2026 RubKianCode Co., Ltd. — รับเขียนโปรแกรมครบวงจร · สงวนลิขสิทธิ์</span>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-[#F1C40F]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#F1C40F]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#F1C40F]">
              PDPA
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="font-pixel mb-4 text-[10px] uppercase tracking-widest text-[#F1C40F]">
        {title}
      </h6>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-[#F4EDE0]/75 transition-colors hover:text-[#F1C40F]"
      >
        {children}
      </a>
    </li>
  )
}
