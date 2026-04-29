'use client'

import { useLoading } from '@/hooks/use-loading'
import { LOADING_CONFIG } from '@/data/loading-config'

// ──────────────────────────────────────────────────────────
//  Floating code symbols — เหมือน CodeBg ใน Hero Section
// ──────────────────────────────────────────────────────────
const CODE_SYMBOLS = [
  'function', 'const', 'return', '=>', 'async', 'await',
  'export', 'import', '{ }', '[ ]', 'var', 'let',
  'class', 'new', 'this', 'true', 'null', 'type',
  'useEffect', 'useState', '.map()', '.tsx', 'default',
]

function FloatingCode() {
  // สุ่มค่าตำแหน่งและ animation แบบ deterministic
  const items = CODE_SYMBOLS.map((sym, i) => ({
    sym,
    x: ((i * 137.5) % 100).toFixed(1),         // golden ratio spread
    y: ((i * 97.3 + 15) % 85).toFixed(1),
    size: (10 + (i % 5) * 2).toFixed(0),
    dur: (6 + (i % 4) * 2).toFixed(1),
    delay: -((i * 1.3) % 8).toFixed(1),
    opacity: (0.06 + (i % 3) * 0.04).toFixed(2),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {items.map((item, i) => (
        <span
          key={i}
          className="absolute font-mono font-bold select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            color: '#1a0e00',
            opacity: Number(item.opacity),
            animation: `loading-float ${item.dur}s ease-in-out ${item.delay}s infinite alternate`,
          }}
        >
          {item.sym}
        </span>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
//  Corner brackets — เหมือน Hero Section
// ──────────────────────────────────────────────────────────
function CornerBrackets() {
  const cfg = LOADING_CONFIG
  const base = 'absolute w-8 h-8 sm:w-10 sm:h-10'
  const bStyle = { borderColor: cfg.bracketColor, boxShadow: '0 0 0 0' }

  return (
    <>
      <div className={`${base} top-6 left-6 border-l-4 border-t-4 z-[3]`} style={{ ...bStyle, boxShadow: '-2px -2px 0 #959595aa' }} />
      <div className={`${base} top-6 right-6 border-r-4 border-t-4 z-[3]`} style={{ ...bStyle, boxShadow: '2px -2px 0 #959595aa' }} />
      <div className={`${base} bottom-6 left-6 border-l-4 border-b-4 z-[3]`} style={{ ...bStyle, boxShadow: '-2px 2px 0 #959595aa' }} />
      <div className={`${base} bottom-6 right-6 border-r-4 border-b-4 z-[3]`} style={{ ...bStyle, boxShadow: '2px 2px 0 #959595aa' }} />
    </>
  )
}

// ──────────────────────────────────────────────────────────
//  Main Loading Screen Component
// ──────────────────────────────────────────────────────────
export function LoadingScreen() {
  const { isVisible, isFadingOut, progress, statusIndex } = useLoading()
  const cfg = LOADING_CONFIG

  if (!isVisible) return null

  return (
    <>
      <div
        aria-label="Loading"
        role="status"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
        style={{
          background: cfg.bgColor,
          opacity: isFadingOut ? 0 : 1,
          transition: `opacity ${cfg.fadeOutDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents: isFadingOut ? 'none' : 'all',
        }}
      >

        {/* ── Floating code symbols (like CodeBg in Hero) ── */}
        {cfg.showCodeBg && <FloatingCode />}

        {/* ── Corner brackets (like Hero Section) ── */}
        {cfg.showCorners && <CornerBrackets />}

        {/* ── Center card ── */}
        <div
          className="relative z-[10] flex flex-col items-center gap-6 px-8 py-10"
          style={{
            background: cfg.badgeBg,
            border: `3px solid ${cfg.accentColor}`,
            boxShadow: `6px 6px 0px ${cfg.shadowColor}, 12px 12px 0px rgba(122,80,16,0.2)`,
            borderRadius: '20px',
            minWidth: 'min(340px, 88vw)',
            maxWidth: 'min(400px, 92vw)',
            animation: 'loading-card-appear 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >

          {/* ── Logo badge ── */}
          <div
            className="flex items-center justify-center w-16 h-16 font-mono font-black"
            style={{
              background: cfg.bgColor,
              border: `3px solid ${cfg.accentColor}`,
              boxShadow: `4px 4px 0px ${cfg.accentColor}`,
              borderRadius: '12px',
              fontSize: '1.75rem',
              color: cfg.accentColor,
              animation: 'loading-logo-bounce 1.8s ease-in-out infinite',
            }}
          >
            R
          </div>

          {/* ── Brand name row ── */}
          <div
            className="flex items-center gap-0.5 font-black"
            style={{
              animation: 'loading-text-appear 0.45s ease-out both',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            <span
              className="font-mono text-2xl"
              style={{ color: cfg.bracketColor }}
            >
              {cfg.bracketLeft}
            </span>
            <span
              style={{
                color: cfg.textColor,
                fontSize: 'clamp(1rem, 5vw, 1.375rem)',
                fontFamily: 'var(--font-prompt), Prompt, sans-serif',
                letterSpacing: '0.06em',
              }}
            >
              {cfg.brandName}
            </span>
            {cfg.showCursor && (
              <span
                className="font-mono text-2xl"
                style={{
                  color: cfg.accentColor,
                  animation: 'loading-cursor-blink 0.75s step-end infinite',
                }}
              >
                _
              </span>
            )}
            <span
              className="font-mono text-2xl"
              style={{ color: cfg.bracketColor }}
            >
              {cfg.bracketRight}
            </span>
          </div>

          {/* ── Subtitle badge ── */}
          <div
            className="px-4 py-1 font-mono font-black text-xs tracking-[0.3em] uppercase"
            style={{
              background: cfg.bgColor,
              border: `2px solid ${cfg.accentDim}`,
              borderRadius: '999px',
              color: cfg.textDim,
              animation: 'loading-text-appear 0.45s ease-out both',
              animationDelay: '0.35s',
              opacity: 0,
            }}
          >
            {cfg.subtitle}
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-[2px]"
            style={{ background: cfg.accentDim }}
          />

          {/* ── Progress bar area ── */}
          {cfg.showProgressBar && (
            <div
              className="w-full flex flex-col gap-2"
              style={{
                animation: 'loading-text-appear 0.45s ease-out both',
                animationDelay: '0.5s',
                opacity: 0,
              }}
            >
              {/* Track */}
              <div
                className="relative w-full h-2 overflow-hidden"
                style={{
                  background: cfg.progressTrack,
                  border: `1.5px solid ${cfg.accentDim}`,
                  borderRadius: '999px',
                }}
              >
                {/* Fill */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${progress}%`,
                    background: cfg.progressColor,
                    borderRadius: '999px',
                    transition: 'width 0.25s ease-out',
                  }}
                />
              </div>

              {/* Status + percentage */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: cfg.textDim }}
                >
                  {cfg.statusMessages[statusIndex]}
                </span>
                <span
                  className="font-mono text-[10px] font-black ml-3 flex-shrink-0"
                  style={{ color: cfg.accentColor }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          )}

          {/* ── Three dots indicator ── */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: cfg.accentColor,
                  animation: `loading-dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>

        </div>

        {/* ── Copyright ── */}
        <div
          className="absolute bottom-5 left-0 right-0 flex justify-center z-[10]"
          style={{
            animation: 'loading-text-appear 0.45s ease-out both',
            animationDelay: '0.7s',
            opacity: 0,
          }}
        >
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: cfg.textDim }}
          >
            {cfg.copyright}
          </span>
        </div>

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes loading-card-appear {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes loading-logo-bounce {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-5px); }
        }
        @keyframes loading-text-appear {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes loading-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes loading-dot-bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.4; }
          50%       { transform: translateY(-5px); opacity: 1;   }
        }
        @keyframes loading-float {
          from { transform: translateY(0px)   rotate(-1deg); }
          to   { transform: translateY(-12px) rotate(1deg);  }
        }
      `}</style>
    </>
  )
}
