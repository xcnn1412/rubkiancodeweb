"use client"

import { ArrowRight, Camera, Shield, Zap, Clock } from "lucide-react"
import { CodeBg } from "@/components/effects/code-bg"
import { useLanguage, useLangTypography } from "@/lib/language-context"
import { useTranslations } from "next-intl"
import { useExitTransition } from "@/providers/exit-transition-provider"

export function HeroSection({ namespace = "hero" }: { namespace?: string } = {}) {
  const { lang } = useLanguage()
  const typo = useLangTypography()
  const t = useTranslations(namespace)
  const { triggerTransition } = useExitTransition()

  const stats = [
    { number: "1500+", label: t("stat_events"), icon: Camera },
    { number: "100%", label: t("stat_stability"), icon: Shield },
    { number: "8+", label: t("stat_experience"), icon: Zap },
    { number: "24/7", label: t("stat_support"), icon: Clock },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Solid egg-yolk yellow background */}
      <div className="absolute inset-0 z-[1]" style={{ background: '#f2efdb' }} />

      {/* Bouncing Code Symbols */}
      <CodeBg opacity={1} particleCount={60} className="z-[3]" />

      {/* Corner brackets */}
      <div className="absolute top-25 left-6 w-10 h-10 border-l-4 border-t-4 border-[#93c8cf] z-[5]" style={{ boxShadow: '-2px -2px 0 #959595ff' }} />
      <div className="absolute top-25 right-6 w-10 h-10 border-r-4 border-t-4 border-[#93c8cf] z-[5]" style={{ boxShadow: '2px -2px 0 #959595ff' }} />
      <div className="absolute bottom-8 left-6 w-10 h-10 border-l-4 border-b-4 border-[#93c8cf] z-[5]" style={{ boxShadow: '-2px 2px 0 #959595ff' }} />
      <div className="absolute bottom-8 right-6 w-10 h-10 border-r-4 border-b-4 border-[#93c8cf] z-[5]" style={{ boxShadow: '2px 2px 0 #959595ff' }} />

      {/* Main Content */}
      <div className="relative z-[6] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">

        {/* Channel badge */}
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-2"
          style={{
            background: '#f4e6af',
            border: '3px solid #7e7f7f',
            boxShadow: '4px 4px 0px #5f5f5fff',
            borderRadius: '999px',
          }}>
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

        {/* Main Heading */}
        <h1
          className="font-black uppercase mb-5"
          style={{
            fontSize: typo.heroH1,
            lineHeight: typo.heroLineHeight,
            color: '#555856',
            /*textShadow: '5px 5px 0px #7a5010, 10px 10px 0px rgba(122, 80, 16, 0.4)',*/
            fontFamily: typo.fontFamily,
            letterSpacing: typo.trackingHeroH1,
          }}
        >
          {t("heading1")}
          <br />
          {t("heading2")}
        </h1>

        <h2
          className="font-black uppercase mb-5"
          style={{
            fontSize: typo.heroH2,
            color: '#959595ff',
            /*textShadow: '3px 3px 0px #3d2000, 0 0 30px rgba(255,255,255,0.3)',*/
            fontFamily: typo.fontFamily,
            letterSpacing: typo.trackingHeroH1,
          }}
        >
          <span>
            {t("rank_prefix")}&nbsp;
            <span style={{ color: '#d60000ff' }}>1</span>
            &nbsp;{t("rank_suffix")}
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="max-w-xl mx-auto mb-6 font-medium"
          style={{
            fontSize: typo.heroSubtitle,
            lineHeight: typo.sectionLineHeight,
            color: '#959595ff',
            /*textShadow: '1px 1px 0px rgba(0,0,0,0.3)',*/
            letterSpacing: typo.trackingBody,
          }}
        >
          {t("subtitle1")}
          <br className="hidden sm:block" />
          {t("subtitle2")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            className="btn-shimmer group font-black uppercase transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px]"
            style={{
              padding: typo.heroBtnPadding,
              background: '#72b386',
              color: '#ffffff',
              border: '3px solid #1a0e00',
              boxShadow: '5px 5px 0px #1a0e00',
              borderRadius: '999px',
              letterSpacing: typo.trackingButton,
              fontSize: typo.sectionBadge,
              animation: 'heartbeat 0.8s ease-in-out infinite',
            }}
            onClick={() => triggerTransition('https://lin.ee/py7hRoKC', 'line')}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px #1a0e00' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px #1a0e00' }}
          >
            <span className="shimmer-light" />
            {t("cta_primary")}
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          {stats.map((stat, i) => (
            <div key={i}
              className="text-center transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px]"
              style={{
                padding: typo.heroStatPadding,
                background: '#cddce9',
                border: '2px solid #555856',
                boxShadow: '3px 3px 0px #7a5010',
                borderRadius: '16px',
              }}>
              <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: '#555856' }} />
              <div className="font-black" style={{ fontSize: typo.heroStatNumber, color: '#8e6f4e', lineHeight: '1.2' }}>
                {stat.number}
              </div>
              <div className="font-bold uppercase text-black/70" style={{ fontSize: typo.heroStatLabel, letterSpacing: typo.trackingLabel, lineHeight: typo.sectionLineHeight }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
