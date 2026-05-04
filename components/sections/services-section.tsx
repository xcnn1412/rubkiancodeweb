"use client"

import { Code, Cloud, MessageSquare, Smartphone, Globe, Database, CheckCircle2 } from "lucide-react"
import { CodeBg } from "@/components/effects/code-bg"
import { useLanguage, useLangTypography } from "@/lib/language-context"
import { useTranslations } from "next-intl"

export function ServicesSection({ namespace = "services" }: { namespace?: string } = {}) {
  const { lang } = useLanguage()
  const typo = useLangTypography()
  const t = useTranslations(namespace)

  const services = [
    {
      icon: Code,
      title: t("dev_title"),
      description: t("dev_desc"),
      features: [t("dev_f0"), t("dev_f1"), t("dev_f2")],
      tag: "01",
    },
    {
      icon: Cloud,
      title: t("rental_title"),
      description: t("rental_desc"),
      features: [t("rental_f0"), t("rental_f1"), t("rental_f2")],
      tag: "02",
    },
    {
      icon: MessageSquare,
      title: t("consult_title"),
      description: t("consult_desc"),
      features: [t("consult_f0"), t("consult_f1"), t("consult_f2")],
      tag: "03",
    },
    {
      icon: Smartphone,
      title: t("mobile_title"),
      description: t("mobile_desc"),
      features: [t("mobile_f0"), t("mobile_f1"), t("mobile_f2")],
      tag: "04",
    },
    {
      icon: Globe,
      title: t("web_title"),
      description: t("web_desc"),
      features: [t("web_f0"), t("web_f1"), t("web_f2")],
      tag: "05",
    },
    {
      icon: Database,
      title: t("db_title"),
      description: t("db_desc"),
      features: [t("db_f0"), t("db_f1"), t("db_f2")],
      tag: "06",
    },
  ]

  return (
    <section id="services" className="relative py-24 overflow-hidden">

      {/* Solid egg-yolk yellow background */}
      <div className="absolute inset-0 z-[1]" style={{ background: '#f2efdb' }} />

      {/* Bouncing Code Symbols */}
      <CodeBg opacity={1} particleCount={45} className="z-[3]" />


      <div className="relative z-[6] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2"
            style={{ background: '#f4e6af', border: '3px solid #1a0e00', boxShadow: '4px 4px 0px #1a0e00', borderRadius: '999px' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className="font-black text-[#1a0e00] uppercase"
              style={{ letterSpacing: typo.trackingLabel, fontSize: typo.sectionBadge }}
            >
              {t("badge")}
            </span>
          </div>

          <h2
            className="font-black uppercase mb-6"
            style={{
              fontSize: typo.sectionH2,
              color: '#555856',
              /*textShadow: '5px 5px 0px #7a5010, 10px 10px 0px rgba(122,80,16,0.3)',*/
              fontFamily: typo.fontFamily,
              /*WebkitTextStroke: '1px #c8900a',*/
              letterSpacing: typo.trackingSectionH2,
            }}
          >
            {t("heading")}
          </h2>
          <p
            className="font-bold max-w-2xl mx-auto"
            style={{ fontSize: typo.sectionDesc, lineHeight: typo.sectionLineHeight, letterSpacing: typo.trackingBody, color: 'rgba(85, 88, 86, 0.7)' }}
          >
            {t("description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 transition-all duration-150 cursor-default hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{
                background: '#e5d9b8',
                border: '2px solid #555856',
                boxShadow: '4px 4px 0px #555856',
                borderRadius: '20px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #555856' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #555856' }}
            >
              {/* Tag number top-right */}
              <div className="absolute top-3 right-4 font-mono font-black text-xs"
                style={{ color: '#f3f84a', opacity: 0.5 }}>
                {service.tag}
              </div>

              {/* Icon box */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{
                  background: '#cddce9',
                  border: '2px solid #555856',
                  boxShadow: '3px 3px 0px #555856',
                  borderRadius: '14px',
                }}
              >
                <service.icon className="w-6 h-6" style={{ color: '#1a0e00' }} />
              </div>

              <h3
                className="font-black uppercase mb-2 group-hover:text-[#f3f84a] transition-colors"
                style={{ fontSize: typo.sectionCardTitle, color: '#555856', letterSpacing: typo.trackingLabel }}
              >
                {service.title}
              </h3>
              <p
                className="text-[#555856] mb-5 leading-relaxed font-medium"
                style={{ fontSize: typo.sectionCardBody, lineHeight: typo.sectionLineHeight, letterSpacing: typo.trackingBody }}
              >
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#7a5010' }} />
                    <span className="font-mono font-bold text-black/60" style={{ fontSize: typo.sectionCardBody }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}
