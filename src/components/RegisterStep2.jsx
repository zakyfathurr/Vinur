import { ArrowLeftIcon } from '../icons'
import { MONTHS, calculateAge, formatAge } from '../utils'

const MIN_YEAR = 2010
const MAX_YEAR = new Date().getFullYear() - 1

const Stepper = ({ label, displayValue, onUp, onDown, disableUp, disableDown }) => (
  <div className="flex-1">
    <div className="bg-[#fafaf5] border-2 border-[#e3e3de] rounded-xl flex flex-col items-center py-2 overflow-hidden hover:border-[#b80049] transition-colors">
      <button
        type="button"
        aria-label={`Tambah ${label}`}
        disabled={disableUp}
        onClick={onUp}
        className="w-10 h-10 rounded-full hover:bg-[#eeeee9] flex items-center justify-center text-[#5b3f43] active:scale-95 transition-transform disabled:opacity-25 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xl">expand_less</span>
      </button>
      <div className="h-16 flex items-center justify-center w-full px-2">
        <span className="text-3xl font-bold text-[#1a1c19] text-center leading-none select-none truncate">
          {displayValue}
        </span>
      </div>
      <button
        type="button"
        aria-label={`Kurang ${label}`}
        disabled={disableDown}
        onClick={onDown}
        className="w-10 h-10 rounded-full hover:bg-[#eeeee9] flex items-center justify-center text-[#5b3f43] active:scale-95 transition-transform disabled:opacity-25 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xl">expand_more</span>
      </button>
    </div>
    <p className="text-center mt-2 text-xs text-[#5b3f43] uppercase tracking-wider font-bold">
      {label}
    </p>
  </div>
)

export default function RegisterStep2({ formData, update, go }) {
  const birthYear = parseInt(formData.birthYear) || 2020
  const birthMonth = parseInt(formData.birthMonth) || 1

  const { years, months } = calculateAge(birthYear, birthMonth)
  const ageDisplay = formatAge(years, months)

  const adjustYear = (delta) => {
    const next = Math.min(MAX_YEAR, Math.max(MIN_YEAR, birthYear + delta))
    update({ birthYear: String(next) })
  }

  const adjustMonth = (delta) => {
    let next = birthMonth + delta
    if (next > 12) next = 1
    if (next < 1) next = 12
    update({ birthMonth: String(next) })
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          aria-label="Kembali"
          className="p-2 rounded-xl hover:bg-[#eeeee9] text-[#5b3f43] transition-colors"
          onClick={() => go('register1')}
        >
          <ArrowLeftIcon />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#1a1c19]">Info Anak</h2>
          <p className="text-xs text-[#5b3f43]">Langkah 2 dari 2</p>
        </div>
        <div className="flex gap-1.5">
          <div className="w-6 h-1.5 bg-[#b80049] rounded-full" />
          <div className="w-6 h-1.5 bg-[#b80049] rounded-full" />
        </div>
      </div>

      {/* Child Name */}
      <div className="mb-5">
        <label className="label-caps block mb-2" htmlFor="child-name">
          Nama Anak (opsional)
        </label>
        <input
          id="child-name"
          type="text"
          className="input-base h-16 text-base"
          placeholder="e.g. Leo"
          value={formData.childName}
          onChange={(e) => update({ childName: e.target.value })}
        />
      </div>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="label-caps block mb-3">Date of Birth</label>
        <div className="flex gap-4">
          <Stepper
            label="Month"
            displayValue={MONTHS[birthMonth - 1]}
            onUp={() => adjustMonth(1)}
            onDown={() => adjustMonth(-1)}
            disableUp={false}
            disableDown={false}
          />
          <Stepper
            label="Year"
            displayValue={birthYear}
            onUp={() => adjustYear(1)}
            onDown={() => adjustYear(-1)}
            disableUp={birthYear >= MAX_YEAR}
            disableDown={birthYear <= MIN_YEAR}
          />
        </div>
      </div>

      {/* Live Age Feedback */}
      <div className="bg-[#eeeee9] rounded-lg p-4 flex items-center justify-center gap-3 mb-6 border border-[#b9f61d] transition-all duration-300">
        <span className="material-symbols-outlined text-[#4b6700]" style={{ fontVariationSettings: "'FILL' 1" }}>
          cake
        </span>
        <span className="text-base text-[#1a1c19] font-semibold">
          Child's Age: {ageDisplay}
        </span>
      </div>

      {/* CTA */}
      <button
        className="w-full h-[72px] bg-[#b80049] text-white rounded-full font-bold text-base border-4 border-[#e2165f] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:bg-[#e2165f] active:scale-95"
        onClick={() => go('confirm')}
      >
        Next
        <span className="material-symbols-outlined text-xl">arrow_forward</span>
      </button>
    </div>
  )
}
