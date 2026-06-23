import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterStep1 from './components/RegisterStep1'
import RegisterStep2 from './components/RegisterStep2'
import ConfirmationScreen from './components/ConfirmationScreen'
import Dashboard from './components/Dashboard'
import MenuScreen from './components/MenuScreen'
import GameScreen from './components/GameScreen'
import { STAGES, initProgress } from './data/stages'

const FEATURES = [
  { icon: '🧠', title: 'Berbasis ABA', desc: 'Prompt → Response → Reinforcement' },
  { icon: '🎨', title: 'Sensory-Friendly', desc: 'Warna tenang, minim overstimulasi' },
  { icon: '📊', title: 'Track Progress', desc: 'Pantau perkembangan anak' },
]

const BrandPanel = () => (
  <div
    className="hidden lg:flex flex-col justify-between w-[440px] xl:w-[500px] shrink-0 p-10 xl:p-12"
    style={{ background: 'linear-gradient(135deg, #900038 0%, #b80049 55%, #e2165f 100%)' }}
  >
    <div>
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <span className="font-display text-white text-xl font-black select-none">V²</span>
        </div>
        <div>
          <p className="font-display text-white font-bold text-lg leading-tight">VINUR</p>
          <p className="text-white/60 text-xs">Belajar Angka untuk Semua</p>
        </div>
      </div>

      <h1 className="font-display text-white font-black text-4xl leading-[1.15] mb-4">
        Teknologi Inklusi<br />untuk Anak<br />Istimewa
      </h1>
      <p className="text-white/75 text-sm leading-relaxed mb-8">
        Dirancang untuk anak autisme (ASD) menggunakan prinsip ABA dan Visual Statistical Learning.
      </p>

      <div className="space-y-4">
        {FEATURES.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-base">{icon}</span>
            </div>
            <div>
              <p className="font-display text-white font-semibold text-sm">{title}</p>
              <p className="text-white/60 text-xs">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-5 gap-2 select-none" aria-hidden="true">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
        <div key={n} className="aspect-square bg-white/10 rounded-xl flex items-center justify-center">
          <span className="font-display text-2xl font-black text-white/30">{n}</span>
        </div>
      ))}
    </div>
  </div>
)

export default function App() {
  const [screen, setScreen] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    childName: '',
    birthYear: '2020',
    birthMonth: '1',
  })
  const [activeStageId, setActiveStageId] = useState(STAGES[0].id)
  const [stageProgress, setStageProgress] = useState(() =>
    Object.fromEntries(STAGES.map((s) => [s.id, initProgress()]))
  )

  const update = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  const handleGo = (targetScreen, payload) => {
    setScreen(targetScreen)
    if (targetScreen === 'game-play' && payload) {
      setActiveStageId(payload)
    }
  }

  const content = {
    login:     <LoginForm     formData={formData} update={update} go={handleGo} />,
    register1: <RegisterStep1 formData={formData} update={update} go={handleGo} />,
    register2: <RegisterStep2 formData={formData} update={update} go={handleGo} />,
  }

  if (screen === 'confirm') {
    return <ConfirmationScreen formData={formData} go={handleGo} />
  }

  if (screen === 'menu') {
    return <MenuScreen activeStageId={activeStageId} stageProgress={stageProgress} go={handleGo} />
  }

  if (screen === 'game-play') {
    return (
      <GameScreen 
        activeStageId={activeStageId} 
        stageProgress={stageProgress} 
        setStageProgress={setStageProgress} 
        go={handleGo} 
      />
    )
  }

  if (screen === 'dashboard' || screen === 'progress') {
    return <Dashboard formData={formData} stageProgress={stageProgress} go={handleGo} />
  }

  return (
    <div className="min-h-screen flex">
      <BrandPanel />

      <div className="flex-1 flex items-center justify-center bg-surface-low p-6 lg:p-12 overflow-y-auto">
        <div key={screen} className={screen === 'dashboard' || screen === 'game-play' ? 'w-full animate-fade-up' : 'w-full max-w-[420px] animate-fade-up'}>
          <div className="flex items-center gap-2.5 mb-6 lg:hidden">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-display text-white font-black text-sm select-none">M²</span>
            </div>
            <span className="font-display font-bold text-ink-800">VINUR</span>
          </div>
          {content[screen]}
        </div>
      </div>
    </div>
  )
}
