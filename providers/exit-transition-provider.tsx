'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react'
import { LOADING_CONFIG } from '@/data/loading-config'

// ─────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────
export type ExitLinkType = 'line' | 'tel' | 'email' | 'maps' | 'external'

interface ExitTransitionState {
  visible: boolean
  fadingOut: boolean
  label: string
  sublabel: string
  emoji: string
}

interface ExitTransitionContextValue {
  /**
   * เรียกใช้เพื่อแสดง overlay แล้วเปิด URL
   * @param url      — URL ที่จะเปิด (https://, tel:, mailto:)
   * @param type     — ประเภทลิงก์ เพื่อแสดงข้อความ/ไอคอนที่ถูกต้อง
   */
  triggerTransition: (url: string, type?: ExitLinkType) => void
}

// ─────────────────────────────────────────────────────────────
//  Config ข้อความต่อประเภทลิงก์ (ปรับได้ตรงนี้)
// ─────────────────────────────────────────────────────────────
const EXIT_LABELS: Record<ExitLinkType, { label: string; sublabel: string; emoji: string }> = {
  line:     { label: 'กำลังเปิด LINE',        sublabel: '@rubkiancode',          emoji: '💬' },
  tel:      { label: 'กำลังโทรออก',           sublabel: '063-594-4429',          emoji: '📞' },
  email:    { label: 'กำลังเปิด Email',       sublabel: 'rubkiancode@gmail.com', emoji: '✉️' },
  maps:     { label: 'กำลังเปิด Google Maps', sublabel: 'กรุงเทพมหานคร',         emoji: '📍' },
  external: { label: 'กำลังเปิดลิงก์',        sublabel: 'โปรดรอสักครู่',          emoji: '🔗' },
}

// ─────────────────────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────────────────────
const ExitTransitionContext = createContext<ExitTransitionContextValue>({
  triggerTransition: () => {},
})

export function useExitTransition() {
  return useContext(ExitTransitionContext)
}

// ─────────────────────────────────────────────────────────────
//  Overlay UI
// ─────────────────────────────────────────────────────────────
function ExitOverlay({ state }: { state: ExitTransitionState }) {
  const cfg = LOADING_CONFIG

  return (
    <>
      <div
        role="status"
        aria-label={state.label}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: cfg.bgColor,
          opacity: state.fadingOut ? 0 : 1,
          transition: `opacity ${cfg.fadeOutDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents: state.fadingOut ? 'none' : 'all',
        }}
      >
        {/* Floating code symbols */}
        <FloatingCodeBg />

        {/* Corner brackets */}
        <CornerBrackets cfg={cfg} />

        {/* Center card */}
        <div
          className="relative z-10 flex flex-col items-center gap-5 px-10 py-9"
          style={{
            background: cfg.badgeBg,
            border: `3px solid ${cfg.accentColor}`,
            boxShadow: `6px 6px 0px ${cfg.shadowColor}, 12px 12px 0px rgba(122,80,16,0.2)`,
            borderRadius: '20px',
            minWidth: 'min(320px, 88vw)',
            animation: 'exit-card-appear 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* Emoji icon */}
          <div
            className="w-16 h-16 flex items-center justify-center text-3xl"
            style={{
              background: cfg.bgColor,
              border: `3px solid ${cfg.accentColor}`,
              boxShadow: `4px 4px 0px ${cfg.accentColor}`,
              borderRadius: '14px',
              animation: 'exit-icon-bounce 1.4s ease-in-out infinite',
            }}
          >
            {state.emoji}
          </div>

          {/* Label */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span
              className="font-black text-lg"
              style={{
                color: cfg.textColor,
                fontFamily: 'var(--font-prompt), Prompt, sans-serif',
              }}
            >
              {state.label}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: cfg.textDim }}
            >
              {state.sublabel}
            </span>
          </div>

          {/* Three dots loader */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: cfg.accentColor,
                  animation: `exit-dot-bounce 1.0s ease-in-out ${i * 0.18}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes exit-card-appear {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes exit-icon-bounce {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-6px); }
        }
        @keyframes exit-dot-bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.35; }
          50%       { transform: translateY(-5px); opacity: 1;    }
        }
        @keyframes exit-float {
          from { transform: translateY(0px)   rotate(-1deg); }
          to   { transform: translateY(-10px) rotate(1deg);  }
        }
      `}</style>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
//  Floating code symbols helper
// ─────────────────────────────────────────────────────────────
const CODE_SYMS = ['function', 'const', 'return', '=>', 'async', 'await', 'export', '{ }', '[ ]', 'var', 'let', '.tsx', 'new', 'this', 'null', 'type', 'useState', '.map()']

function FloatingCodeBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {CODE_SYMS.map((sym, i) => (
        <span
          key={i}
          className="absolute font-mono font-bold select-none"
          style={{
            left: `${((i * 137.5) % 100).toFixed(1)}%`,
            top: `${((i * 97.3 + 15) % 85).toFixed(1)}%`,
            fontSize: `${10 + (i % 5) * 2}px`,
            color: '#1a0e00',
            opacity: 0.06 + (i % 3) * 0.04,
            animation: `exit-float ${6 + (i % 4) * 2}s ease-in-out ${-((i * 1.3) % 8).toFixed(1)}s infinite alternate`,
          }}
        >
          {sym}
        </span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Corner brackets helper
// ─────────────────────────────────────────────────────────────
function CornerBrackets({ cfg }: { cfg: typeof LOADING_CONFIG }) {
  const base = 'absolute w-8 h-8 sm:w-10 sm:h-10'
  return (
    <>
      <div className={`${base} top-6 left-6 border-l-4 border-t-4 z-[3]`} style={{ borderColor: cfg.bracketColor, boxShadow: '-2px -2px 0 #959595aa' }} />
      <div className={`${base} top-6 right-6 border-r-4 border-t-4 z-[3]`} style={{ borderColor: cfg.bracketColor, boxShadow: '2px -2px 0 #959595aa' }} />
      <div className={`${base} bottom-6 left-6 border-l-4 border-b-4 z-[3]`} style={{ borderColor: cfg.bracketColor, boxShadow: '-2px 2px 0 #959595aa' }} />
      <div className={`${base} bottom-6 right-6 border-r-4 border-b-4 z-[3]`} style={{ borderColor: cfg.bracketColor, boxShadow: '2px 2px 0 #959595aa' }} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────────────────────
export function ExitTransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ExitTransitionState>({
    visible: false,
    fadingOut: false,
    label: '',
    sublabel: '',
    emoji: '',
  })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const triggerTransition = useCallback((url: string, type: ExitLinkType = 'external') => {
    // Clear any running timer
    if (timerRef.current) clearTimeout(timerRef.current)

    const info = EXIT_LABELS[type]
    setState({ visible: true, fadingOut: false, ...info })

    // Open URL after short delay, then fade out
    timerRef.current = setTimeout(() => {
      window.open(url, '_blank')

      setState(prev => ({ ...prev, fadingOut: true }))
      timerRef.current = setTimeout(() => {
        setState({ visible: false, fadingOut: false, label: '', sublabel: '', emoji: '' })
      }, LOADING_CONFIG.fadeOutDurationMs)
    }, 1400)
  }, [])

  return (
    <ExitTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {state.visible && <ExitOverlay state={state} />}
    </ExitTransitionContext.Provider>
  )
}
