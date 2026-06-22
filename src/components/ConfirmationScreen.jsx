import { MONTHS, calculateAge, formatAge } from '../utils'

export default function ConfirmationScreen({ formData, go }) {
  const birthYear = parseInt(formData.birthYear) || 2020
  const birthMonth = parseInt(formData.birthMonth) || 1
  const { years, months } = calculateAge(birthYear, birthMonth)
  const ageDisplay = formatAge(years, months)
  const birthMonthName = MONTHS[birthMonth - 1]
  const childName = formData.childName || 'Si Kecil'

  return (
    <div className="min-h-screen bg-wood flex items-center justify-center p-6 lg:p-10 relative overflow-hidden">
      {/* Ambient circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-56 h-56 bg-lime rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="w-full max-w-4xl bg-surface rounded-2xl shadow-xl z-10 border-4 border-surface-high animate-burst relative overflow-hidden">

        {/* Back button */}
        <div className="flex items-center px-6 pt-5 pb-0">
          <button
            aria-label="Kembali"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-ink-600 transition-colors"
            onClick={() => go('register2')}
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
        </div>

        {/* Celebration header */}
        <div className="text-center px-10 pt-6 pb-8 lg:px-14">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-lime rounded-full mb-6 shadow-lg animate-floating">
            <span
              className="material-symbols-outlined text-forest-500"
              style={{ fontSize: 48, fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <h1 className="font-display text-5xl font-black text-brand-500 mb-3 leading-tight">Siap Memulai!</h1>
          <p className="text-lg text-ink-600">
            Semua sudah diatur untuk <strong className="text-ink-800">{childName}</strong>.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10 lg:px-14 mb-8">
          {/* Child profile */}
          <div className="bg-surface-low p-6 rounded-xl border-2 border-surface-container flex items-center gap-5">
            <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}
              >
                face
              </span>
            </div>
            <div>
              <p className="label-caps mb-1">Profil Anak</p>
              <p className="text-2xl font-bold text-ink-800 leading-tight">{childName}</p>
              <p className="text-sm text-ink-600 mt-1">Usia {ageDisplay}</p>
            </div>
          </div>

          {/* Parent account */}
          <div className="bg-surface-low p-6 rounded-xl border-2 border-surface-container flex items-center gap-5">
            <div className="w-16 h-16 bg-ink-400 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontSize: 32 }}>
                family_restroom
              </span>
            </div>
            <div>
              <p className="label-caps mb-1">Akun Orang Tua</p>
              <p className="text-sm font-bold text-ink-800 break-all leading-tight">{formData.email}</p>
              <p className="text-sm text-ink-600 mt-1">Lahir {birthMonthName} {birthYear}</p>
            </div>
          </div>

          {/* Focus area */}
          <div className="bg-surface-low p-6 rounded-xl border-2 border-surface-container md:col-span-2">
            <p className="label-caps mb-4">Area Fokus Awal</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-lime text-lime-on px-4 py-2 rounded-full text-sm font-semibold border border-forest-500 flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">category</span>
                Pengenalan Angka
              </span>
              <span className="bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold border border-brand-200 flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">extension</span>
                Pencocokan Objek
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-10 lg:px-14 pb-10 lg:pb-14">
          <button
            className="w-full md:w-auto min-w-[280px] h-16 bg-brand-500 text-white rounded-full px-10 font-bold text-lg border-4 border-brand-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-3"
            onClick={() => go('menu')}
          >
            Mulai Belajar!
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>
          <p className="mt-5 text-sm text-ink-600 max-w-sm mx-auto">
            Pastikan Anda berada di tempat yang nyaman dan tenang sebelum memulai aktivitas pertama.
          </p>
        </div>
      </div>
    </div>
  )
}
