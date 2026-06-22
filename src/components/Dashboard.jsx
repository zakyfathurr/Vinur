import { STAGES, getSuccessRate, formatTime } from '../data/stages'

export default function Dashboard({ formData, stageProgress = {}, go }) {
  // Calculate overall progress
  let totalLevelsCompleted = 0
  let totalLevelsAvailable = 0
  let totalMilestones = 0

  STAGES.forEach(stage => {
    const p = stageProgress[stage.id] || {}
    totalLevelsCompleted += (p.maxLevel || 0)
    totalLevelsAvailable += stage.levels.length
    if (p.completedAt) totalMilestones++
  })

  const totalPercentage = totalLevelsAvailable === 0 ? 0 : Math.round((totalLevelsCompleted / totalLevelsAvailable) * 100)

  return (
    <div className="min-h-screen bg-surface-low font-sans">
      {/* Top nav */}
      <nav className="bg-surface-low px-6 lg:px-10 py-6 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={() => go('game')}
          className="flex items-center gap-2 text-ink-600 font-bold text-sm tracking-widest hover:text-ink-800 transition-colors uppercase"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Dashboard
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-brand-700 text-xl tracking-widest leading-none">VINUR</span>
          <span className="text-[10px] font-bold text-ink-500 tracking-[0.2em] mt-1">VINUR PROGRESS</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-ink-600">notifications</button>
          <div className="w-10 h-10 bg-brand-200 rounded-full flex items-center justify-center overflow-hidden border border-ink-200">
            <span className="material-symbols-outlined text-brand-700">person</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 lg:px-10 py-6">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-black text-ink-900 mb-2">Progress Overview</h1>
          <p className="text-ink-500 text-sm max-w-lg leading-relaxed">
            Track your child's developmental journey through the VINUR sensory modules. Data is updated in real-time based on session performance.
          </p>
        </div>

        {/* Total Progress Card */}
        <div className="bg-white rounded-[2rem] p-8 lg:p-10 mb-6 flex flex-col md:flex-row items-center gap-10 shadow-sm border border-white">
          <div className="flex-shrink-0 relative w-48 h-48 flex items-center justify-center">
            {/* SVG Donut Chart */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="16" 
              />
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                fill="none" 
                stroke="#4b6700" 
                strokeWidth="16" 
                strokeDasharray="439.8" 
                strokeDashoffset={439.8 - (totalPercentage / 100) * 439.8} 
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col items-center justify-center relative z-10">
              <div className="text-5xl font-display font-black text-ink-900 leading-none mb-1">{totalPercentage}%</div>
              <div className="text-xs font-bold text-ink-600 tracking-widest">TOTAL</div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-lime px-3 py-1.5 rounded-full text-forest-600 text-xs font-bold mb-4">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              Steady Growth Detected
            </div>
            <h2 className="text-2xl font-display font-bold text-ink-900 mb-3">You're making great progress!</h2>
            <p className="text-ink-600 text-sm mb-6 leading-relaxed max-w-lg">
              {formData.childName || 'Child'}'s focus levels have increased by 15% this week compared to last. Keep going to unlock the Advanced Tactile module.
            </p>
            <div className="flex gap-10">
              <div>
                <div className="text-[10px] font-bold text-ink-500 tracking-wider mb-1 uppercase">Days Active</div>
                <div className="text-xl font-display font-bold text-brand-700">1 Days</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-ink-500 tracking-wider mb-1 uppercase">Milestones</div>
                <div className="text-xl font-display font-bold text-forest-600">{totalMilestones} Won</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stages */}
        {STAGES.map((stage, idx) => {
          const p = stageProgress[stage.id] || {}
          const solved = p.solved || 0
          const maxLevel = p.maxLevel || 0
          const timeSpent = p.timeSpent || 0
          const completedAt = p.completedAt || null
          const totalLevels = stage.levels.length
          const progressPercent = Math.round((maxLevel / totalLevels) * 100)
          
          const successRate = getSuccessRate(p)
          
          let statusLabel = 'NOT STARTED'
          let statusIcon = 'lock'
          let opacityClass = 'opacity-60'
          let isNext = maxLevel === 0 && !completedAt
          
          if (completedAt) {
            statusLabel = 'COMPLETED'
            statusIcon = 'check_circle'
            opacityClass = 'opacity-100'
          } else if (maxLevel > 0) {
            statusLabel = 'IN PROGRESS'
            statusIcon = 'visibility'
            opacityClass = 'opacity-100'
          } else if (idx === 0 || stageProgress[STAGES[idx-1]?.id]?.completedAt) {
            statusLabel = 'ACTIVE STAGE'
            statusIcon = 'volume_up'
            opacityClass = 'opacity-100'
            isNext = false
          }

          return (
            <div key={stage.id} className={`bg-white rounded-[2rem] p-6 lg:p-8 mb-4 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${opacityClass}`}>
              <div className="absolute left-0 top-0 bottom-0 w-3" style={{ backgroundColor: isNext ? '#e5e7eb' : stage.color }}></div>
              
              <div className="ml-6 flex-1 min-w-[240px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-lg"
                       style={{ backgroundColor: isNext ? '#e5e7eb' : stage.bgColor, color: isNext ? '#6b7280' : stage.color }}>
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-ink-800">{stage.name}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-sm" style={{color: isNext ? '#9ca3af' : stage.color, fontVariationSettings: "'FILL' 1"}}>{statusIcon}</span>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{color: isNext ? '#9ca3af' : stage.color}}>
                    {statusLabel}
                  </span>
                </div>

                <div>
                  <div className="h-4 bg-ink-100 rounded-full overflow-hidden mb-2 flex">
                    <div className="h-full rounded-full transition-all duration-500" style={{width: `${progressPercent}%`, backgroundColor: isNext ? '#d1d5db' : stage.color}}></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-ink-500">
                    <span style={{color: isNext ? '#9ca3af' : undefined}}>{progressPercent}% COMPLETED</span>
                    <span style={{color: isNext ? '#9ca3af' : undefined}}>LEVEL {maxLevel}/{totalLevels}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:flex md:gap-12 gap-y-6 w-full md:w-auto mt-4 md:mt-0">
                <div>
                  <div className="text-[10px] font-bold text-ink-400 tracking-wider mb-2 uppercase">Problems Solved</div>
                  <div className={`text-2xl font-display font-medium ${isNext ? 'text-ink-600' : 'text-ink-900'}`}>{isNext ? '-' : solved}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-ink-400 tracking-wider mb-2 uppercase">Success Rate</div>
                  <div className={`text-2xl font-display font-medium ${isNext ? 'text-ink-600' : 'text-ink-900'}`}>{isNext ? '-' : `${successRate}%`}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-ink-400 tracking-wider mb-2 uppercase">Waktu Dihabiskan</div>
                  <div className={`text-2xl font-display font-medium ${isNext ? 'text-ink-600' : 'text-ink-900'}`}>{isNext ? '0m' : formatTime(timeSpent)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-ink-400 tracking-wider mb-2 uppercase">Max Level</div>
                  <div className={`text-2xl font-display font-medium ${isNext ? 'text-ink-600' : 'text-ink-900'}`}>{isNext ? '-' : `Lv. ${maxLevel}`}</div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Streak */}
        <div className="bg-brand-700 rounded-[2rem] p-6 lg:p-8 flex items-center justify-center gap-6 shadow-xl mt-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-display font-bold text-white mb-1">Streak 1 Days</div>
            <div className="text-[10px] font-bold text-brand-200 tracking-[0.2em] uppercase">Consistency is key!</div>
          </div>
        </div>

      </main>
    </div>
  )
}
