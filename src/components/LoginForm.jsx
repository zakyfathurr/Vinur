import { useState } from 'react'
import { isValidEmail } from '../utils'
import { CheckIcon, XIcon, EyeOpenIcon, EyeClosedIcon } from '../icons'

const Logo = () => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-md">
      <span className="text-white text-xl font-bold select-none">M²</span>
    </div>
    <div className="text-left">
      <p className="text-lg font-bold text-ink-800 leading-tight">VINUR</p>
      <p className="text-xs text-ink-400">Belajar Angka untuk Semua</p>
    </div>
  </div>
)

export default function LoginForm({ formData, update, go }) {
  const [showPass, setShowPass] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailValid = isValidEmail(formData.email)
  const passwordFilled = formData.password.length > 0
  const canSubmit = emailValid && passwordFilled
  const showEmailFeedback = touched.email && formData.email.length > 0
  const showPasswordFeedback = touched.password && !passwordFilled

  return (
    <div className="card">
      <div className="lg:hidden">
        <Logo />
      </div>

      <h2 className="text-2xl font-bold text-ink-800 mb-1">Selamat Datang!</h2>
      <p className="text-sm text-ink-600 mb-6">Masuk ke akun Anda untuk melanjutkan</p>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ink-700 mb-1.5" htmlFor="login-email">
          Email
        </label>
        <div className="relative">
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className={`input-base pr-10 ${
              showEmailFeedback ? (emailValid ? 'input-valid' : 'input-error') : ''
            }`}
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={(e) => update({ email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          />
          {showEmailFeedback && (
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                emailValid ? 'text-forest-500' : 'text-rose-500'
              }`}
            >
              {emailValid ? <CheckIcon /> : <XIcon />}
            </span>
          )}
        </div>
        {showEmailFeedback && !emailValid && (
          <p className="field-hint text-rose-500">
            Format email tidak valid — contoh: nama@domain.com
          </p>
        )}
        {showEmailFeedback && emailValid && (
          <p className="field-hint text-forest-500">Format email valid</p>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-ink-700 mb-1.5" htmlFor="login-password">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPass ? 'text' : 'password'}
            autoComplete="current-password"
            className={`input-base pr-10 ${showPasswordFeedback ? 'input-error' : ''}`}
            placeholder="Masukkan password"
            value={formData.password}
            onChange={(e) => update({ password: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
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
        {showPasswordFeedback && (
          <p className="field-hint text-rose-500">Password wajib diisi</p>
        )}
      </div>

      <button
        className="btn-primary mb-4"
        disabled={!canSubmit}
        onClick={() => go('game')}
      >
        Masuk
      </button>

      <p className="text-center text-sm text-ink-600">
        Belum punya akun?{' '}
        <button
          className="text-brand-500 font-semibold hover:text-brand-700 transition-colors"
          onClick={() => go('register1')}
        >
          Daftar sekarang
        </button>
      </p>
    </div>
  )
}
