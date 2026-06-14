import { useState } from 'react'
import { isValidEmail, MIN_PASSWORD, charsNeeded } from '../utils'
import { CheckIcon, XIcon, EyeOpenIcon, EyeClosedIcon, ArrowLeftIcon } from '../icons'

export default function RegisterStep1({ formData, update, go }) {
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false, confirm: false })

  const emailValid = isValidEmail(formData.email)
  const needed = charsNeeded(formData.password)
  const pwdValid = needed === 0
  const confirmValid =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword

  const canNext = emailValid && pwdValid && confirmValid

  const pwdLen = formData.password.length
  const pwdPct = Math.min(100, (pwdLen / MIN_PASSWORD) * 100)
  const pwdColor =
    pwdPct < 50 ? '#ba1a1a' : pwdPct < 88 ? '#F5A840' : '#4b6700'

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          aria-label="Kembali ke login"
          className="p-2 rounded-xl hover:bg-ink-50 text-ink-600 transition-colors"
          onClick={() => go('login')}
        >
          <ArrowLeftIcon />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-ink-800">Buat Akun</h2>
          <p className="text-xs text-ink-400">Langkah 1 dari 2</p>
        </div>
        <div className="flex gap-1.5">
          <div className="w-6 h-1.5 bg-brand-500 rounded-full" />
          <div className="w-6 h-1.5 bg-ink-200 rounded-full" />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ink-700 mb-1.5" htmlFor="reg-email">
          Email
        </label>
        <div className="relative">
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            className={`input-base pr-10 ${
              touched.email && formData.email
                ? emailValid
                  ? 'input-valid'
                  : 'input-error'
                : ''
            }`}
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={(e) => update({ email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          />
          {touched.email && formData.email && (
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                emailValid ? 'text-forest-500' : 'text-rose-500'
              }`}
            >
              {emailValid ? <CheckIcon /> : <XIcon />}
            </span>
          )}
        </div>
        {touched.email && formData.email && !emailValid && (
          <p className="field-hint text-rose-500">
            Format email tidak valid — contoh: nama@domain.com
          </p>
        )}
        {touched.email && emailValid && (
          <p className="field-hint text-forest-500">Format email valid</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ink-700 mb-1.5" htmlFor="reg-password">
          Password
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPass ? 'text' : 'password'}
            autoComplete="new-password"
            className={`input-base pr-10 ${
              touched.password && pwdValid ? 'input-valid' : ''
            }`}
            placeholder={`Minimal ${MIN_PASSWORD} karakter`}
            value={formData.password}
            onChange={(e) => update({ password: e.target.value })}
            onFocus={() => setTouched((t) => ({ ...t, password: true }))}
          />
          <button
            type="button"
            aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>

        {/* Password strength indicator */}
        {touched.password && formData.password.length > 0 && (
          <div className="mt-2 animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-ink-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pwdPct}%`, backgroundColor: pwdColor }}
                />
              </div>
              <span className="text-xs font-semibold whitespace-nowrap" style={{ color: pwdColor }}>
                {needed > 0 ? `${needed} karakter lagi` : 'Cukup kuat ✓'}
              </span>
            </div>
            {needed > 0 && (
              <p className="text-xs text-ink-400 mt-1">
                Password minimal {MIN_PASSWORD} karakter
              </p>
            )}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-ink-700 mb-1.5" htmlFor="reg-confirm">
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            id="reg-confirm"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            className={`input-base pr-10 ${
              touched.confirm && formData.confirmPassword
                ? confirmValid
                  ? 'input-valid'
                  : 'input-error'
                : ''
            }`}
            placeholder="Ulangi password"
            value={formData.confirmPassword}
            onChange={(e) => update({ confirmPassword: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
          />
          <button
            type="button"
            aria-label={showConfirm ? 'Sembunyikan' : 'Tampilkan'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {touched.confirm && formData.confirmPassword && (
          <p
            className={`field-hint ${
              confirmValid ? 'text-forest-500' : 'text-rose-500'
            }`}
          >
            {confirmValid ? 'Password cocok ✓' : 'Password tidak cocok ✗'}
          </p>
        )}
      </div>

      <button className="btn-primary" disabled={!canNext} onClick={() => go('register2')}>
        Lanjut →
      </button>
    </div>
  )
}
