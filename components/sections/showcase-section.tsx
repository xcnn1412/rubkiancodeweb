"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

import { CodeBg } from "@/components/code-bg"
import { ShowcaseModal, type ShowcaseProject } from "@/components/showcase-modal"
import { useLangTypography } from "@/lib/language-context"
import { SHOWCASE_MEDIA, SHOWCASE_CARD_DISPLAY } from "@/data/showcase-media"

// ─────────────────────────────────────────────
//  Static project metadata
//  (translatable content lives in messages/*.json)
// ─────────────────────────────────────────────
const PROJECTS: ShowcaseProject[] = [
  { key: "project0", ch: "CH.1", previewColor: "#000000" },
  { key: "project1", ch: "CH.2", previewColor: "#000000" },
  { key: "project3", ch: "CH.3", previewColor: "#000000" },
]

// ─────────────────────────────────────────────
//  Section
// ─────────────────────────────────────────────
export function ShowcaseSection({ namespace = "showcase" }: { namespace?: string } = {}) {
  const t = useTranslations(namespace)
  const typo = useLangTypography()

  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null)

  return (
    <section id="showcase" className="relative py-24 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-[1]" style={{ background: "#f2efdb" }} />
      <CodeBg opacity={1} particleCount={40} className="z-[3]" />

      {/* ── Content ── */}
      <div className="relative z-[6] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionHeader t={t} typo={typo} />

        {/* Project Cards Grid: CH.1 ซ้าย (สูงเต็ม) | CH.2+CH.3 ขวา (เรียงเท่ากัน) */}
        <div
          className="flex flex-col md:flex-row gap-4 md:gap-6"
          style={{ minHeight: 'min(85vh, 820px)' }}
        >

          {/* Left: CH.1 — Featured hero, full height */}
          <div className="md:w-1/2 flex min-h-[480px] md:min-h-0">
            <ProjectCard
              project={PROJECTS[0]}
              t={t}
              typo={typo}
              onOpen={() => setActiveProject(PROJECTS[0])}
              variant="featured"
            />
          </div>

          {/* Right: CH.2, CH.3 — Stacked equally, ยืดเต็มความสูง */}
          <div className="md:w-1/2 flex flex-col gap-4" style={{ minHeight: 0, minWidth: 0 }}>
            {PROJECTS.slice(1).map((project) => (
              <ProjectCard
                key={project.key}
                project={project}
                t={t}
                typo={typo}
                onOpen={() => setActiveProject(project)}
                variant="side"
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── Modal ── */}
      <ShowcaseModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}

// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────

function SectionHeader({
  t,
  typo,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typo: any
}) {
  return (
    <div className="text-center mb-16">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 mb-6 px-5 py-2"
        style={{
          background: "#f4e6af",
          border: "3px solid #7e7f7f",
          boxShadow: "4px 4px 0px #5f5f5fff",
          borderRadius: "999px",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span
          className="font-black text-[#1a0e00] uppercase"
          style={{ letterSpacing: typo.trackingLabel, fontSize: typo.sectionBadge }}
        >
          {t("badge")}
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-black uppercase mb-6"
        style={{
          fontSize: typo.sectionH2,
          color: "#555856",
          /*textShadow: "5px 5px 0px #7a5010, 10px 10px 0px rgba(122,80,16,0.3)",*/
          fontFamily: typo.fontFamily,
          letterSpacing: typo.trackingSectionH2,
        }}
      >
        {t("heading")}
      </h2>

      {/* Description */}
      <p
        className="font-bold max-w-2xl mx-auto"
        style={{
          fontSize: typo.sectionDesc,
          lineHeight: typo.sectionLineHeight,
          letterSpacing: typo.trackingBody,
          color: "#555856",
          /*textShadow: "1px 1px 0px rgba(0,0,0,0.3)",*/
        }}
      >
        {t("description")}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
//  Card Thumbnail — video / image / color
//  Uses IntersectionObserver so videos only play when visible
// ─────────────────────────────────────────────
function CardThumbnail({ project }: { project: ShowcaseProject }) {
  const k = project.key
  const mode = SHOWCASE_CARD_DISPLAY[k] ?? "color"
  const media = SHOWCASE_MEDIA[k] ?? []
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Start loading + playing video only when card enters viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (isInView) {
      vid.load()
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [isInView])

  // Helper เพื่อลดความซ้ำซ้อนการตั้งค่า style
  const renderMedia = (item: { type: string; src: string }) => {
    if (item.type === "video") {
      return (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />
      )
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover" }}
      />
    )
  }

  // ── direct file mode: แสดงสื่อเฉพาะหน้าปก
  const content = (() => {
    if (typeof mode === "object" && mode !== null && "src" in mode) return renderMedia(mode)
    // ── index mode: แสดง media ตาม index ที่ระบุ
    if (typeof mode === "number" && media[mode]) return renderMedia(media[mode])
    // ── video mode: แสดงวิดีโอแรก
    if (mode === "video") {
      const firstVideo = media.find((m) => m.type === "video")
      if (firstVideo) return renderMedia(firstVideo)
    }
    // ── image mode: แสดงรูปแรก
    if (mode === "image") {
      const firstImage = media.find((m) => m.type === "image")
      if (firstImage) return renderMedia(firstImage)
    }
    return null
  })()

  return <div ref={containerRef} className="absolute inset-0">{content}</div>
}

// ─────────────────────────────────────────────
//  Project Card
// ─────────────────────────────────────────────
type CardVariant = "featured" | "side" | "normal" | "compact"

function ProjectCard({
  project,
  t,
  typo,
  onOpen,
  variant = "normal",
}: {
  project: ShowcaseProject
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typo: any
  onOpen: () => void
  variant?: CardVariant
}) {
  const k = project.key
  const techTags = t(`${k}_tech`)
    .split(",")
    .map((tag: string) => tag.trim())

  const cardIndex = parseInt(k.replace("project", ""), 10)

  // Variant-driven styles
  // featured: flex col เต็มความสูง (thumbnail ยืดตาม)
  // side: ไม่ใช้ flex → thumbnail ใช้ aspectRatio คงที่ ให้ preview แสดงออกมา
  const isFlex = variant === "featured"
  const infoPadding = variant === "side" ? "10px 14px" : "12px 16px"
  const titleSize =
    variant === "featured" ? typo.sectionCardBody
      : variant === "side" ? typo.sectionCardBody
        : typo.sectionCardTitle
  // ทั้ง featured และ side แสดง description
  const showDesc = variant === "featured" || variant === "side"
  const descSize = variant === "featured" ? typo.sectionDesc : "0.75rem"
  const iconSize = variant === "featured" ? "w-7 h-7" : "w-5 h-5"

  return (
    <article
      id={`showcase-card-${k}`}
      role="button"
      tabIndex={0}
      aria-label={t(`${k}_title`)}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className={`group relative transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer${isFlex ? ' flex flex-col w-full h-full' : ' flex flex-col flex-1'}`}
      style={{
        background: "#e5d9b8",
        border: "3px solid #555856",
        boxShadow: "5px 5px 0px #555856",
        borderRadius: "20px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        ; (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0px #555856"
      }}
      onMouseLeave={(e) => {
        ; (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0px #555856"
      }}
    >
      {/* ── Thumbnail Area ── */}
      <div
        className="relative overflow-hidden"
        style={{
          // featured บน desktop → flex ยืดเต็ม
          // featured บน mobile (stack) → aspectRatio แทน flex grow
          // side → minHeight 200px เพื่อให้วิดีโอมีพื้นที่แสดง
          ...(isFlex
            ? { flex: 1, minHeight: '240px' }
            : { flex: 1, minHeight: '200px' }
          ),
          background: project.previewColor || '#1a0e00',
          borderBottom: "3px solid #555856",
        }}
      >
        {/* Media preview (video / image / color) */}
        <CardThumbnail project={project} />

        {/* Channel badge */}
        <div
          className="absolute top-3 left-3 z-20 px-2 py-0.5 font-mono font-black text-xs"
          style={{ background: "#93c8cf", color: "#1a0e00", border: "2px solid #1a0e00" }}
        >
          {project.ch}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(219, 220, 216, 0.5)" }}
        >
          <div
            className="flex items-center gap-2 font-black uppercase text-[#1a0e00]"
            style={{ letterSpacing: typo.trackingButton }}
          >
            <ExternalLink className={iconSize} />
            <span>{t("view_details")}</span>
          </div>
        </div>
      </div>

      {/* ── Project Info ── */}
      <div style={{ padding: infoPadding }}>
        {/* Category + index */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-black uppercase px-3 py-1"
            style={{
              fontSize: variant === "compact" ? "0.65rem" : "0.75rem",
              background: "#dbdcd8",
              color: "#1a0e00",
              border: "2px solid #1a0e00",
              boxShadow: "2px 2px 0 #1a0e00",
              borderRadius: "999px",
              letterSpacing: "0.05em",
            }}
          >
            {t(`${k}_category`)}
          </span>
          <span className="font-mono font-bold text-xs" style={{ color: "rgba(243,248,74,0.5)" }}>
            #{String(cardIndex + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-black uppercase mb-2 group-hover:text-[#f3f84a] transition-colors"
          style={{
            fontSize: titleSize,
            color: "#555856",
            letterSpacing: typo.trackingSectionH2,
          }}
        >
          {t(`${k}_title`)}
        </h3>

        {/* Short description — hidden on compact */}
        {showDesc && (
          <p
            className="text-[#555856] leading-relaxed font-medium"
            style={{
              fontSize: descSize,
              lineHeight: variant === "side" ? "1.4" : typo.sectionLineHeight,
              letterSpacing: typo.trackingBody,
              marginBottom: variant === "side" ? "6px" : "12px",
              display: variant === "side" ? "-webkit-box" : undefined,
              WebkitLineClamp: variant === "side" ? 2 : undefined,
              WebkitBoxOrient: variant === "side" ? "vertical" : undefined,
              overflow: variant === "side" ? "hidden" : undefined,
            }}
          >
            {t(`${k}_desc`)}
          </p>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {techTags.map((tech: string, ti: number) => (
            <span
              key={ti}
              className="font-mono font-bold px-2.5 py-1"
              style={{
                fontSize: variant === "compact" ? "0.65rem" : "0.75rem",
                border: "2px solid #1a0e00",
                color: "#1a0e00",
                borderRadius: "999px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
