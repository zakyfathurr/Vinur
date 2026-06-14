export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const MIN_PASSWORD = 8

export const charsNeeded = (password) =>
  Math.max(0, MIN_PASSWORD - password.length)

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const calculateAge = (birthYear, birthMonth) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  let years = currentYear - birthYear
  let months = currentMonth - birthMonth

  if (months < 0) {
    years -= 1
    months += 12
  }

  if (years < 0) return { years: 0, months: 0 }
  return { years, months }
}

export const formatAge = (years, months) => {
  if (years === 0 && months === 0) return 'Kurang dari 1 bulan'
  const parts = []
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`)
  return parts.join(' ')
}
