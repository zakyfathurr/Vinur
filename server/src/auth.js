import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const JWT_EXPIRES_IN = '7d'

export const hashPassword = (plain) => bcrypt.hash(plain, 10)

export const verifyPassword = (plain, hash) => bcrypt.compare(plain, hash)

export const signToken = (userId) =>
  jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

// Express middleware: validates Bearer token and sets req.userId
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ada' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.uid
    next()
  } catch {
    return res.status(401).json({ error: 'Token tidak valid' })
  }
}
