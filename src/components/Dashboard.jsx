import { MONTHS, calculateAge, formatAge } from '../utils'

export default function Dashboard({ formData, go }) {
  const birthYear = parseInt(formData.birthYear) || 2020
  const birthMonth = parseInt(formData.birthMonth) || 1
  const { years, months } = calculateAge(birthYear, birthMonth)
  const ageDisplay = formatAge(years, months)
  const birthMonthName = MONTHS[birthMonth - 1]

  return (
    <div className="min-h-screen bg-[#F2F6FF]">
      {/* Top Nav */}
      <nav className="bg-white border-b border-ink-100 px-6 lg:px-10 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm select-none">M²</span>
          </div>
          <span className="font-bold text-ink-800" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>VINUR</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-600 hidden sm:block">{formData.email}</span>
          <button
            aria-label="Profil"
            className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center border border-brand-100 hover:border-brand-300 transition-colors"
          >
            <span role="img" aria-label="profil">👤</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
        {/* Welcome heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-ink-800 mb-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Halo! 👋
          </h1>
          <p className="text-sm text-ink-600">Selamat datang di VINUR</p>
        </div>

        {/* Child info card */}
        {formData.childName && (
          <div className="card mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">
              👶
            </div>
            <div>
              <p className="font-bold text-ink-800" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                {formData.childName}
              </p>
              <p className="text-xs text-ink-400">
                Lahir {birthMonthName} {birthYear}
              </p>
              <p className="text-xs text-brand-500 font-medium mt-0.5">
                Child's age: {ageDisplay}
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        <div className="card text-center py-16 lg:py-20">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-brand-100">
            <span className="text-4xl" role="img" aria-label="angka">🔢</span>
          </div>
          <h2 className="text-xl font-black text-ink-800 mb-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Fitur Segera Hadir
          </h2>
          <p className="text-sm text-ink-600 leading-relaxed max-w-sm mx-auto">
            Kami sedang mempersiapkan pengalaman belajar angka yang menyenangkan dan inklusif untuk si kecil.
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2.5 h-2.5 bg-brand-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2.5 h-2.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </main>

      <div className="text-center pb-6">
        <button
          className="text-xs text-ink-400 hover:text-brand-500 transition-colors"
          onClick={() => go('login')}
        >
          ← Kembali ke Login
        </button>
      </div>
    </div>
  )
}
