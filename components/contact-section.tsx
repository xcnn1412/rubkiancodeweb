"use client"

import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight } from "lucide-react"
import { CodeBg } from "@/components/code-bg"
import { useLanguage, useLangTypography } from "@/lib/language-context"
import { useTranslations } from "next-intl"
import { useExitTransition } from "@/providers/exit-transition-provider"

export function ContactSection() {
  const { lang } = useLanguage()
  const typo = useLangTypography()
  const t = useTranslations("contact")
  const { triggerTransition } = useExitTransition()

  const contactInfo = [
    {
      icon: MessageCircle,
      label: t("line_label"),
      value: "@rubkiancode",
      sub: t("line_sub"),
      href: "https://lin.ee/py7hRoKC",
      highlight: true,
    },
    {
      icon: Phone,
      label: t("phone_label"),
      value: "063-594-4429",
      sub: t("phone_sub"),
      href: "tel:0635944429",
      highlight: false,
    },
    {
      icon: Mail,
      label: t("email_label"),
      value: "rubkiancode@gmail.com",
      sub: t("email_sub"),
      href: "mailto:rubkiancode@gmail.com",
      highlight: false,
    },
    {
      icon: MapPin,
      label: t("address_label"),
      value: t("address_value"),
      sub: t("address_sub"),
      href: "https://maps.app.goo.gl/CunTwgBaAkmhZ3Gg9",
      highlight: false,
    },
  ]

  return (
    <section id="contact" className="relative py-28 overflow-hidden">

      {/* Solid egg-yolk yellow background */}
      <div className="absolute inset-0 z-0" style={{ background: '#f2efdb' }} />

      {/* Bouncing Code Symbols */}
      <CodeBg opacity={1} particleCount={35} className="z-[3]" />


      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <div
            className="inline-flex items-center gap-2.5 mb-7 px-5 py-2"
            style={{ background: '#f4e6af', border: '3px solid #1a0e00', boxShadow: '4px 4px 0px #7a5010', borderRadius: '999px' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span
              className="text-xs font-black uppercase text-[#1a0e00]"
              style={{ letterSpacing: typo.trackingLabel }}
            >
              {t("badge")}
            </span>
          </div>

          <h2
            className="font-black uppercase mb-5 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5.5rem)',
              color: '#555856',
              fontFamily: 'var(--font-prompt), Prompt, sans-serif',
              letterSpacing: typo.trackingSectionH2,
            }}
          >
            {t("heading1")}
            <br />
            <span style={{ color: '#555856' }}>
              {t("heading2")}
            </span>
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium" style={{ color: 'rgba(85, 88, 86, 0.7)', letterSpacing: typo.trackingBody }}>
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* LEFT — Contact Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item, index) => {
              // tel: links dial directly — no overlay needed
              const isTel = item.href.startsWith('tel:')
              const isLine = item.href.includes('lin.ee')
              const isEmail = item.href.startsWith('mailto:')
              const isMaps = item.href.includes('maps.app')

              const handleClick = (e: React.MouseEvent) => {
                if (isTel || item.href === '#') return // dial directly or no-op
                e.preventDefault()
                if (isLine) triggerTransition(item.href, 'line')
                else if (isEmail) triggerTransition(item.href, 'email')
                else if (isMaps) triggerTransition(item.href, 'maps')
                else triggerTransition(item.href, 'external')
              }

              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={handleClick}
                  className="group flex items-center gap-5 p-5 transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  style={{
                    background: 'rgba(255, 236, 213, 0.84)',
                    border: '2px solid #555856',
                    boxShadow: '4px 4px 0px #555856',
                    borderRadius: '16px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.border = '2px solid #555856'
                      ; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #555856'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.border = '2px solid #555856'
                      ; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #555856'
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: item.highlight ? '#cddce9' : '#cddce9',
                      border: '2px solid #555856',
                      boxShadow: '3px 3px 0 #555856',
                      borderRadius: '12px',
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.highlight ? '#1a0e00' : '#1a0e00' }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono font-bold mb-0.5 uppercase tracking-wider" style={{ color: '#555856' }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-black truncate" style={{ color: '#2D1400' }}>{item.value}</div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: '#555856' }}>{item.sub}</div>
                  </div>

                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" style={{ color: '#f3f84a' }} />
                </a>
              )
            })
            }

            {/* CTA Banner */}
            <div
              className="btn-shimmer mt-6 p-6 cursor-pointer group transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{
                background: '#72b386',
                border: '3px solid #555856',
                boxShadow: '5px 5px 0px #555856',
                borderRadius: '20px',
                animation: 'heartbeat 0.8s ease-in-out infinite',
              }}
              onClick={() => triggerTransition('https://lin.ee/py7hRoKC', 'line')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0px #555856' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #555856' }}
            >
              {/* แสงวิ้งวับ */}
              <span className="shimmer-light" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold mb-1 uppercase tracking-wider text-[#ffffff]/80">// {t("cta_channel")}</div>
                  <div className="font-black text-xl uppercase text-[#ffffff]">{t("cta_line")}</div>
                  <div className="text-sm mt-1 font-bold text-[#3d2000]">{t("cta_tagline")}</div>
                </div>
                <div
                  className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: '#1a0e00', border: '2px solid #1a0e00', borderRadius: '14px' }}
                >
                  <MessageCircle className="w-7 h-7 text-[#f3f84a]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Retro Form */}
          <div className="lg:col-span-3">
            <div
              className="overflow-hidden"
              style={{
                background: 'rgba(255, 236, 213, 0.84)',
                border: '3px solid #555856',
                boxShadow: '6px 6px 0px #555856',
                borderRadius: '24px',
              }}
            >
              {/* Form Header Bar */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: '#cddce9', borderBottom: '3px solid #47490dff' }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" style={{ border: '1px solid #1a0e00' }} />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" style={{ border: '1px solid #1a0e00' }} />
                    <div className="w-3 h-3 rounded-full bg-green-400" style={{ border: '1px solid #1a0e00' }} />
                  </div>
                  <span className="text-xs font-mono font-black text-[#1a0e00]">contact_form.exe</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#1a0e00]">{t("status_online")}</span>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-8">
                <h3
                  className="text-2xl font-black uppercase mb-2"
                  style={{ color: '#555856', letterSpacing: typo.trackingLabel }}
                >
                  {t("form_title")}
                </h3>
                <p className="text-sm mb-8 font-medium" style={{ color: 'rgba(0, 0, 0, 0.6)', letterSpacing: typo.trackingBody }}>
                  {t("form_subtitle")}
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") || "";
                    const email = formData.get("email") || "";
                    const subject = formData.get("subject") || "Contact from Website";
                    const message = formData.get("message") || "";

                    const body = `ผู้ติดต่อ: ${name}\nอีเมล: ${email}\n\nรายละเอียด:\n${message}`;
                    const mailtoLink = `mailto:rubkiancode@gmail.com?subject=${encodeURIComponent(subject.toString())}&body=${encodeURIComponent(body)}`;

                    window.location.href = mailtoLink;
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "name", label: t("label_name"), placeholder: t("placeholder_name"), type: "text" },
                      { name: "email", label: t("label_email"), placeholder: "email@example.com", type: "email" },
                    ].map((field, i) => (
                      <div key={i} className="space-y-2">
                        <label
                          className="block text-xs font-black uppercase"
                          style={{ color: '#555856', letterSpacing: typo.trackingLabel }}
                        >
                          {field.label}
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3.5 text-sm font-medium outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(130,69,0,0.06)',
                            border: '2px solid #555856',
                            color: '#2D1400',
                            caretColor: '#824500',
                            borderRadius: '12px',
                          }}
                          onFocus={e => {
                            e.currentTarget.style.borderColor = '#5C2E00'
                            e.currentTarget.style.background = 'rgba(130,69,0,0.12)'
                            e.currentTarget.style.boxShadow = '3px 3px 0 #5C2E00'
                          }}
                          onBlur={e => {
                            e.currentTarget.style.borderColor = '#824500'
                            e.currentTarget.style.background = 'rgba(130,69,0,0.06)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-xs font-black uppercase"
                      style={{ color: '#555856', letterSpacing: typo.trackingLabel }}
                    >
                      {t("label_subject")}
                    </label>
                    <input
                      name="subject"
                      required
                      placeholder={t("placeholder_subject")}
                      className="w-full px-4 py-3.5 text-sm font-medium outline-none transition-all duration-200"
                      style={{ background: 'rgba(130,69,0,0.06)', border: '2px solid #555856', color: '#2D1400', caretColor: '#824500', borderRadius: '12px' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#5C2E00'; e.currentTarget.style.background = 'rgba(130,69,0,0.12)'; e.currentTarget.style.boxShadow = '3px 3px 0 #5C2E00' }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#824500'; e.currentTarget.style.background = 'rgba(130,69,0,0.06)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-xs font-black uppercase"
                      style={{ color: '#555856', letterSpacing: typo.trackingLabel }}
                    >
                      {t("label_details")}
                    </label>
                    <textarea
                      name="message"
                      required
                      placeholder={t("placeholder_details")}
                      rows={5}
                      className="w-full px-4 py-3.5 text-sm font-medium outline-none transition-all duration-200 resize-none"
                      style={{ background: 'rgba(130,69,0,0.06)', border: '2px solid #555856', color: '#2D1400', caretColor: '#824500', borderRadius: '12px' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#5C2E00'; e.currentTarget.style.background = 'rgba(130,69,0,0.12)'; e.currentTarget.style.boxShadow = '3px 3px 0 #5C2E00' }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#824500'; e.currentTarget.style.background = 'rgba(130,69,0,0.06)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-shimmer w-full h-14 font-black text-lg flex items-center justify-center gap-3 uppercase transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px]"
                    style={{
                      background: '#f4e6af',
                      color: '#1a0e00',
                      border: '3px solid #1a0e00',
                      boxShadow: '5px 5px 0px #555856',
                      borderRadius: '999px',
                      letterSpacing: typo.trackingButton,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px #555856' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #555856' }}
                  >
                    <span className="shimmer-light" />
                    <Send className="w-5 h-5" />
                    {t("submit")}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}
