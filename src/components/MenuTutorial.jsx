import { useState, useLayoutEffect, useEffect } from 'react'

const SPOT_PAD = 10
const CARD_WIDTH = 320

export default function MenuTutorial({ steps, onFinish }) {
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState(null)

  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  // Measure the highlighted element on every step change + on resize
  useLayoutEffect(() => {
    const measure = () => {
      const el = step?.ref?.current
      setRect(el ? el.getBoundingClientRect() : null)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [step])

  const next = () => (isLast ? onFinish() : setIndex((i) => i + 1))
  const prev = () => setIndex((i) => Math.max(0, i - 1))

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onFinish()
      else if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
      else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (index >= steps.length - 1) onFinish()
        else setIndex((i) => i + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, steps.length, onFinish])

  // Spotlight box around the target
  const spot = rect && {
    top: rect.top - SPOT_PAD,
    left: rect.left - SPOT_PAD,
    width: rect.width + SPOT_PAD * 2,
    height: rect.height + SPOT_PAD * 2,
  }

  // Place tooltip below target if it sits in the top half, otherwise above
  const placeBelow = rect ? rect.top < window.innerHeight / 2 : true
  const cardLeft = rect
    ? Math.max(16, Math.min(rect.left + rect.width / 2 - CARD_WIDTH / 2, window.innerWidth - CARD_WIDTH - 16))
    : window.innerWidth / 2 - CARD_WIDTH / 2
  const cardTop = rect
    ? placeBelow
      ? rect.bottom + SPOT_PAD + 14
      : rect.top - SPOT_PAD - 14
    : window.innerHeight / 2

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Click blocker (transparent when a target exists; dims fully otherwise) */}
      <div
        className="absolute inset-0"
        style={{ background: rect ? 'transparent' : 'rgba(15,23,42,0.78)' }}
      />

      {/* Spotlight: a transparent hole with a huge surrounding shadow */}
      {spot && (
        <div
          className="absolute rounded-2xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            ...spot,
            boxShadow: '0 0 0 9999px rgba(15,23,42,0.78)',
            border: '3px solid #b9f61d',
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        className="absolute"
        style={{
          left: cardLeft,
          top: cardTop,
          width: CARD_WIDTH,
          transform: rect && !placeBelow ? 'translateY(-100%)' : 'none',
        }}
      >
        <div className="bg-surface rounded-2xl shadow-2xl border-2 border-surface-high p-5 animate-fade-up">
          {/* Header: icon + title + step counter */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0 border border-brand-100">
              <span className="material-symbols-outlined text-brand-500 text-xl">{step.icon}</span>
            </div>
            <h3 className="font-display font-bold text-ink-800 text-base flex-1 leading-tight">
              {step.title}
            </h3>
            <span className="text-xs font-bold text-ink-400 shrink-0">
              {index + 1}/{steps.length}
            </span>
          </div>

          <p className="text-sm text-ink-600 leading-relaxed mb-4">{step.description}</p>

          {/* Footer: dots + controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? 'bg-brand-500' : 'bg-surface-highest'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {isFirst ? (
                <button
                  onClick={onFinish}
                  className="text-xs font-semibold text-ink-400 hover:text-ink-600 transition-colors px-2 py-1"
                >
                  Lewati
                </button>
              ) : (
                <button
                  onClick={prev}
                  className="text-xs font-semibold text-ink-600 hover:text-ink-800 transition-colors px-2 py-1"
                >
                  Kembali
                </button>
              )}
              <button
                onClick={next}
                className="bg-brand-500 text-white text-sm font-bold rounded-full px-5 py-2 hover:bg-brand-600 active:scale-95 transition-all shadow-sm"
              >
                {isLast ? 'Selesai' : 'Lanjut'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
