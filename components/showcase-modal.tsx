"use client"

import { useEffect, useRef } from "react"
import { X, ExternalLink, Calendar, User, Activity, Cpu, Layers, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useLangTypography } from "@/lib/language-context"
import { ShowcaseMediaPlayer } from "@/components/showcase-media-player"
import { SHOWCASE_MEDIA } from "@/data/showcase-media"

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
export interface ShowcaseProject {
  /** translation key prefix, e.g. "project0" → t("project0_title") */
  key: string
  /** TV channel label, e.g. "CH.1" */
  ch: string
  /** accent color for the preview area (same as card) */
  previewColor: string
}

interface ShowcaseModalProps {
  project: ShowcaseProject | null
  onClose: () => void
}

// ─────────────────────────────────────────────
//  Helper: single info row
// ─────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
        style={{ background: "rgba(243,248,74,0.15)", border: "2px solid rgba(243,248,74,0.4)" }}
      >
        {icon}
      </span>
      <div>
        <p
          className="text-xs font-bold uppercase"
          style={{ color: "rgba(130,69,0,0.7)", letterSpacing: "0.08em" }}
        >
          {label}
        </p>
        <p className="font-semibold mt-0.5" style={{ color: "#1a0e00" }}>
          {value}
        </p>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
//  Main Modal Component
// ─────────────────────────────────────────────
export function ShowcaseModal({ project, onClose }: ShowcaseModalProps) {
  const t = useTranslations("showcase")
  const typo = useLangTypography()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Close on Escape key + lock body scroll
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [project, onClose])

  if (!project) return null

  const k = project.key

  const techTags = t(`${k}_tech`)
    .split(",")
    .map((s) => s.trim())

  const featureList = t(`${k}_features`)
    .split(",")
    .map((s) => s.trim())

  const scrollToDetails = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.clientHeight, behavior: "smooth" })
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(`${k}_title`)}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-5"
        onClick={onClose}
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(26,14,0,0.6)",
        }}
      >
        {/* ── Modal Panel ── */}
        <div
          role="presentation"
          ref={scrollRef}
          className="relative flex flex-col"
          style={{
            width: "min(96vw, 1200px)",
            height: "95dvh",
            background: "rgba(255, 236, 213, 0.98)",
            border: "3px solid #824500",
            boxShadow: "10px 10px 0px #7a5010, 0 32px 80px rgba(0,0,0,0.5)",
            borderRadius: "20px",
            overflowY: "auto",
            overflowX: "hidden",
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
            animation: "modalSlideUp 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ══════════════════════════════════════
              SECTION 1 — Media player, snap to viewport
          ══════════════════════════════════════ */}
          <div
            className="relative flex-shrink-0"
            style={{
              height: "calc(95dvh - 6px)",
              scrollSnapAlign: "start",
            }}
          >
            <ShowcaseMediaPlayer
              items={SHOWCASE_MEDIA[k] ?? []}
              bgColor={project.previewColor}
              fillContainer
            >
              {/* Channel badge */}
              <div
                className="absolute top-4 left-4 z-20 font-mono font-black text-xs px-2 py-0.5"
                style={{ background: "#f3f84a", color: "#1a0e00", border: "2px solid #1a0e00" }}
              >
                {project.ch}
              </div>

              {/* Category badge */}
              <div
                className="absolute top-4 z-20 text-xs font-black uppercase px-3 py-1 hidden sm:block"
                style={{
                  right: "3.5rem",
                  background: "rgba(255,236,213,0.92)",
                  color: "#1a0e00",
                  border: "2px solid #1a0e00",
                  boxShadow: "2px 2px 0 #1a0e00",
                  borderRadius: "999px",
                }}
              >
                {t(`${k}_category`)}
              </div>

              {/* Close button */}
              <button
                id="showcase-modal-close"
                aria-label={t("modal_close")}
                onClick={onClose}
                className="absolute top-4 right-4 z-[50] w-9 h-9 flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 duration-200"
                style={{
                  background: "#1a0e00",
                  color: "#f3f84a",
                  border: "2px solid #f3f84a",
                  borderRadius: "999px",
                }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title overlay at bottom-left */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-16 pt-10"
                style={{ background: "linear-gradient(to top, rgba(26,14,0,0.75) 0%, transparent 100%)" }}
              >
                <h2
                  className="font-black uppercase leading-tight"
                  style={{
                    fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
                    color: "#ffc720",
                    textShadow: "3px 3px 0px #7a5010",
                    fontFamily: typo.fontFamily,
                    letterSpacing: typo.trackingSectionH2,
                  }}
                >
                  {t(`${k}_title`)}
                </h2>
              </div>

              {/* Scroll-down chevron hint */}
              <button
                aria-label="Scroll to details"
                onClick={(e) => { e.stopPropagation(); scrollToDetails() }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 group"
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                >
                  Details
                </span>
                <ChevronDown
                  className="w-5 h-5 animate-bounce"
                  style={{ color: "#f3f84a", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                />
              </button>
            </ShowcaseMediaPlayer>
          </div>

          {/* ══════════════════════════════════════
              SECTION 2 — Scrollable details
          ══════════════════════════════════════ */}
          <div
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              borderTop: "3px solid #824500",
            }}
          >
            <div className="p-6 space-y-6">

              {/* Detail paragraph */}
              <p
                className="leading-relaxed font-medium"
                style={{
                  fontSize: typo.sectionCardBody,
                  lineHeight: typo.sectionLineHeight,
                  letterSpacing: typo.trackingBody,
                  color: "rgba(26,14,0,0.78)",
                }}
              >
                {t(`${k}_detail`)}
              </p>

              {/* ── Info rows: Client / Year / Status ── */}
              <div
                className="grid gap-4 py-4 px-5 rounded-2xl"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  background: "rgba(243,248,74,0.1)",
                  border: "2px solid rgba(130,69,0,0.2)",
                }}
              >
                <InfoRow
                  icon={<User className="w-4 h-4" style={{ color: "#f3a700" }} />}
                  label={t("modal_client_label")}
                  value={t(`${k}_client`)}
                />
                <InfoRow
                  icon={<Calendar className="w-4 h-4" style={{ color: "#f3a700" }} />}
                  label={t("modal_year_label")}
                  value={t(`${k}_year`)}
                />
                <InfoRow
                  icon={<Activity className="w-4 h-4" style={{ color: "#f3a700" }} />}
                  label={t("modal_status_label")}
                  value={t(`${k}_status`)}
                />
              </div>

              {/* ── Tech stack ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4" style={{ color: "#824500" }} />
                  <span
                    className="text-xs font-black uppercase"
                    style={{ color: "#824500", letterSpacing: "0.1em" }}
                  >
                    {t("modal_tech_label")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-bold px-3 py-1"
                      style={{
                        border: "2px solid #824500",
                        color: "#824500",
                        background: "rgba(243,248,74,0.14)",
                        borderRadius: "999px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Key Features ── */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4" style={{ color: "#824500" }} />
                  <span
                    className="text-xs font-black uppercase"
                    style={{ color: "#824500", letterSpacing: "0.1em" }}
                  >
                    {t("modal_features_label")}
                  </span>
                </div>
                <ul className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  {featureList.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm font-medium"
                      style={{ color: "rgba(26,14,0,0.82)" }}
                    >
                      <span
                        className="flex-shrink-0 w-2 h-2 rounded-full"
                        style={{ background: "#f3f84a", border: "2px solid #824500", marginTop: "5px" }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── CTA ── */}
              <a
                href="#contact"
                onClick={onClose}
                id="showcase-modal-contact-cta"
                className="flex items-center justify-center gap-2 w-full py-3.5 font-black uppercase transition-transform hover:translate-y-[-2px]"
                style={{
                  background: "#f3f84a",
                  color: "#1a0e00",
                  border: "3px solid #1a0e00",
                  boxShadow: "4px 4px 0px #1a0e00",
                  borderRadius: "12px",
                  letterSpacing: typo.trackingButton,
                  fontSize: typo.sectionBadge,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                {t("modal_contact_cta")}
              </a>

              {/* bottom breathing room */}
              <div className="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe ── */}
      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </>
  )
}
