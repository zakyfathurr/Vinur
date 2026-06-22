import { useState, useEffect } from 'react'
import { STAGES } from '../data/stages'

const PuzzleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 11h-2V9a2 2 0 0 0-2-2h-2V5.5a2.5 2.5 0 0 0-5 0V7H7a2 2 0 0 0-2 2v2H3.5a2.5 2.5 0 0 0 0 5H5v2a2 2 0 0 0 2 2h2v1.5a2.5 2.5 0 0 0 5 0V20h2a2 2 0 0 0 2-2v-2h1.5a2.5 2.5 0 0 0 0-5Z"/>
  </svg>
)

const NUM_TO_TEXT = {
  0: 'NOL', 1: 'SATU', 2: 'DUA', 3: 'TIGA', 4: 'EMPAT', 
  5: 'LIMA', 6: 'ENAM', 7: 'TUJUH', 8: 'DELAPAN', 9: 'SEMBILAN', 10: 'SEPULUH'
}

export default function GameScreen({ activeStageId, stageProgress, setStageProgress, go }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(
    STAGES.findIndex(s => s.id === activeStageId)
  )
  
  const stage = STAGES[currentStageIdx]

  useEffect(() => {
    const timer = setInterval(() => {
      setStageProgress(prev => {
        const currentProgress = prev[stage.id] || { timeSpent: 0 };
        return {
          ...prev,
          [stage.id]: {
            ...currentProgress,
            timeSpent: (currentProgress.timeSpent || 0) + 1
          }
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stage.id, setStageProgress]);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [wrongShake, setWrongShake] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  
  const level = stage.levels[currentLevelIdx]
  
  const handleAnswer = (val) => {
    if (selected !== null) return
    
    if (val === level.answer) {
      setSelected(val)
      setStageProgress(prev => ({
        ...prev,
        [stage.id]: {
          ...prev[stage.id],
          solved: prev[stage.id].solved + 1,
          attempts: prev[stage.id].attempts + 1,
          maxLevel: Math.max(prev[stage.id].maxLevel, currentLevelIdx + 1)
        }
      }))

      setTimeout(() => {
        setSelected(null)
        if (currentLevelIdx < stage.levels.length - 1) {
          setCurrentLevelIdx(prev => prev + 1)
        } else {
          // Stage complete
          setShowComplete(true)
          setStageProgress(prev => ({
            ...prev,
            [stage.id]: {
              ...prev[stage.id],
              completedAt: new Date().toISOString()
            }
          }))
        }
      }, 1000)
    } else {
      setWrongShake(true)
      setStageProgress(prev => ({
        ...prev,
        [stage.id]: {
          ...prev[stage.id],
          attempts: prev[stage.id].attempts + 1
        }
      }))
      setTimeout(() => setWrongShake(false), 500)
    }
  }

  const handleNextStage = () => {
    if (currentStageIdx < STAGES.length - 1) {
      setCurrentStageIdx(prev => prev + 1)
      setCurrentLevelIdx(0)
      setShowComplete(false)
    } else {
      go('dashboard')
    }
  }

  // --- Renderers for game types ---
  
  const renderCompare = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-lime text-lime-on font-bold px-4 py-1.5 rounded-full text-xs mb-6 inline-flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">lightbulb</span>
          KONSEP PERBANDINGAN
        </div>
        
        <h2 className="text-4xl font-display font-black text-brand-700 mb-2 whitespace-pre-line text-center">
          {level.prompt.replace('BESAR', '').replace('KECIL', '')}
          <span className="underline decoration-4 underline-offset-4">
            {level.prompt.includes('BESAR') ? 'BESAR' : 'KECIL'}
          </span>?
        </h2>
        
        <p className="text-ink-600 text-sm mb-10 text-center max-w-md">
          Sentuh kartu yang memiliki jumlah bulatan lebih {level.prompt.includes('BESAR') ? 'banyak' : 'sedikit'} untuk membantu Lumina menemukan jalan pulang.
        </p>

        <div className="flex gap-6 mb-12 w-full justify-center">
          {level.options.map((opt, i) => (
            <button 
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-64 h-64 rounded-[2rem] flex flex-col items-center justify-center gap-6 bg-white relative border-l-8 ${
                i === 0 ? 'border-ink-600 shadow-sm' : 'border-brand-700 shadow-card'
              } ${wrongShake ? 'animate-shake' : ''} ${selected === opt ? 'ring-4 ring-brand-500 scale-105' : 'hover:-translate-y-2'} transition-all duration-300`}
            >
              <span className="text-8xl font-display text-ink-800 leading-none">{opt}</span>
              <div className="flex flex-wrap justify-center gap-2 max-w-[120px]">
                {Array.from({length: opt}).map((_, j) => (
                  <div key={j} className={`w-6 h-6 rounded-full ${i === 0 ? 'bg-ink-600' : 'bg-brand-700'} ring-4 ${i === 0 ? 'ring-ink-200' : 'ring-brand-100'}`} />
                ))}
              </div>
              <span className={`text-xs font-bold tracking-widest mt-2 ${i === 0 ? 'text-ink-600' : 'text-brand-700'}`}>
                {NUM_TO_TEXT[opt]}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-ink-100 px-6 py-2 rounded-full flex items-center gap-2 text-ink-600 text-sm font-bold">
          <span className="material-symbols-outlined text-brand-500">lightbulb</span>
          KONSEPKAN PERBANDINGAN!
        </div>
      </div>
    )
  }

  const renderTapNumber = () => {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-display font-black text-brand-700 mb-3 text-center">
          {level.prompt}
        </h2>
        <p className="text-ink-600 text-sm mb-12 text-center">
          Bisakah kamu menemukan angka {NUM_TO_TEXT[level.answer]?.toLowerCase()}?
        </p>

        <div className="flex justify-center gap-6 mb-16">
          {Array.from({length: level.answer}).map((_, i) => (
            <div key={i} className="w-[120px] h-[120px] bg-lime rounded-3xl flex items-center justify-center text-forest-600 shadow-[0_8px_0_#4b6700] rotate-[-2deg] hover:rotate-[2deg] transition-transform">
              <PuzzleIcon />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-20 h-20 rounded-full border border-ink-200 flex items-center justify-center text-3xl font-display font-black text-ink-800 bg-white transition-all ${
                wrongShake ? 'animate-shake' : ''
              } ${selected === opt || opt === level.answer && selected ? 'bg-brand-50 border-brand-700 border-2' : 'hover:border-brand-300'}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="bg-ink-100 px-6 py-2 rounded-full flex items-center gap-2 text-ink-600 text-sm font-bold">
          <span className="material-symbols-outlined text-brand-500">lightbulb</span>
          HITUNG BALOK DI LAYAR!
        </div>
      </div>
    )
  }

  const renderSequence = () => {
    // Assuming prompt is like "1 , _ , 3"
    const parts = level.prompt.split(',')
    
    return (
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-3xl p-10 w-full max-w-2xl border-l-8 border-brand-700 shadow-card mb-12">
          <h2 className="text-2xl font-display font-bold text-ink-800 mb-2 text-center">
            Apa Angka Selanjutnya?
          </h2>
          <p className="text-ink-500 text-sm text-center mb-10">
            Identifikasi angka yang hilang dari urutan
          </p>
          
          <div className="flex items-center justify-center gap-6">
            {parts.map((p, i) => {
              const isMissing = p.trim() === '_'
              return (
                <div key={i} className="flex items-center gap-6">
                  <div className={`w-28 h-36 rounded-3xl flex items-center justify-center text-5xl font-display font-black ${
                    isMissing 
                      ? (selected !== null ? 'bg-brand-50 text-brand-700 border-[3px] border-brand-700 border-dashed' : 'bg-brand-50 border-[3px] border-brand-700 border-dashed text-brand-700')
                      : 'bg-surface text-brand-700 border border-ink-200'
                  }`}>
                    {isMissing ? (selected !== null ? level.answer : '?') : p.trim()}
                  </div>
                  {i < parts.length - 1 && (
                    <span className="text-ink-300 font-bold text-3xl material-symbols-outlined">arrow_right_alt</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-ink-100 px-6 py-2 rounded-full flex items-center gap-2 text-ink-600 text-sm font-bold mb-12">
          <span className="material-symbols-outlined text-brand-500">lightbulb</span>
          LENGKAPI URUTAN ANGKA!
        </div>

        <div className="flex justify-center gap-4 w-full max-w-2xl">
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`flex-1 bg-white h-24 rounded-[2rem] flex items-center justify-center text-4xl font-display font-black text-ink-800 shadow-sm border border-ink-100 transition-transform ${
                wrongShake ? 'animate-shake' : ''
              } hover:-translate-y-1 hover:shadow-md ${selected === opt ? 'bg-brand-50 border-brand-300' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderCountDots = () => {
    const dotColors = ['bg-brand-700', 'bg-forest-600', 'bg-ink-600', 'bg-brand-600', 'bg-lime']
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-display font-black text-brand-700 mb-3 text-center">
          {level.prompt}
        </h2>
        <p className="text-ink-600 text-sm mb-8 text-center">
          Berapa banyak titik yang ada di bawah?
        </p>

        <div className="bg-white rounded-[3rem] p-12 mb-10 border-l-8 border-brand-700 shadow-card flex flex-wrap justify-center content-center gap-4 max-w-sm min-h-[250px]">
          {Array.from({length: level.count}).map((_, i) => (
            <div key={i} className={`w-[72px] h-[72px] rounded-full shadow-inner ${dotColors[i % dotColors.length]}`}>
              <div className="w-full h-full rounded-full bg-white/20 ml-[-4px] mt-[-4px]" />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-24 h-[4.5rem] rounded-[1.5rem] border flex items-center justify-center text-2xl font-display font-black text-ink-800 bg-white transition-all ${
                wrongShake ? 'animate-shake' : ''
              } ${selected === opt || (opt === level.answer && selected) ? 'border-brand-700 border-2 text-brand-700' : 'border-ink-100 hover:border-brand-300'}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="bg-ink-100 px-6 py-2 rounded-full flex items-center gap-2 text-ink-600 text-sm font-bold">
          <span className="material-symbols-outlined text-brand-500">lightbulb</span>
          HITUNG TITIK DI LAYAR!
        </div>
      </div>
    )
  }

  const renderGameContent = () => {
    switch (level.type) {
      case 'compare': return renderCompare()
      case 'tap-number': return renderTapNumber()
      case 'sequence': return renderSequence()
      case 'count-dots': return renderCountDots()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf5] flex flex-col absolute inset-0 z-50">
      {/* Top Header */}
      <header className="flex items-center justify-between p-6 w-full max-w-5xl mx-auto">
        <button 
          onClick={() => go('game')}
          className="flex items-center gap-2 px-4 py-2 bg-ink-100 rounded-full text-ink-600 text-sm font-bold hover:bg-ink-200 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Dashboard
        </button>

        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-1">
            {stage.levels.map((_, i) => (
              <div 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full ${i <= currentLevelIdx ? 'bg-brand-700' : 'bg-ink-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-ink-500 tracking-wider">
            LEVEL {currentLevelIdx + 1} / {stage.levels.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-lime px-3 py-1.5 rounded-full shadow-sm text-forest-600 font-bold text-sm">
            <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
            120 XP
          </div>
          <button className="w-10 h-10 rounded-full bg-ink-100 flex items-center justify-center text-ink-600 hover:bg-ink-200 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative w-full">
        {renderGameContent()}

        {/* Stage Complete Modal */}
        {showComplete && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center animate-fade-up">
              <div className="w-20 h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-forest-600" style={{fontVariationSettings: "'FILL' 1"}}>emoji_events</span>
              </div>
              <h2 className="text-3xl font-display font-black text-ink-800 mb-2">Stage Selesai!</h2>
              <p className="text-ink-600 mb-8">Luar biasa! Kamu telah menyelesaikan tahap {stage.name}.</p>
              
              <button 
                onClick={handleNextStage}
                className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-600 transition-all hover:-translate-y-1"
              >
                {currentStageIdx < STAGES.length - 1 ? 'Lanjut ke Stage Berikutnya' : 'Kembali ke Peta'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
