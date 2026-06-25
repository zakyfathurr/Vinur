import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { query } from './db.js'
import { hashPassword, verifyPassword, signToken, requireAuth } from './auth.js'

const app = express()
const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json())

// ── Helpers ──────────────────────────────────────────────

const serializeUser = (row) => ({
  id: row.id,
  email: row.email,
  childName: row.child_name,
  birthMonth: row.birth_month,
  birthYear: row.birth_year,
})

const getProgressMap = async (userId) => {
  const { rows } = await query(
    'SELECT stage_id, solved, attempts, max_level, time_spent, started_at, completed_at FROM stage_progress WHERE user_id = $1',
    [userId]
  )
  const map = {}
  for (const r of rows) {
    map[r.stage_id] = {
      solved: r.solved,
      attempts: r.attempts,
      maxLevel: r.max_level,
      timeSpent: r.time_spent,
      startedAt: r.started_at,
      completedAt: r.completed_at,
    }
  }
  return map
}

// ── Routes ───────────────────────────────────────────────

app.get('/api/health', (req, res) => res.json({ ok: true }))

// Register: create parent account + child profile
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, childName = '', birthMonth = 1, birthYear = 2020 } = req.body || {}

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' })
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password minimal 8 karakter' })
    }

    const exists = await query('SELECT id FROM users WHERE email = $1', [email])
    if (exists.rowCount > 0) {
      return res.status(409).json({ error: 'Email sudah terdaftar' })
    }

    const passwordHash = await hashPassword(String(password))
    const { rows } = await query(
      `INSERT INTO users (email, password_hash, child_name, birth_month, birth_year)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [email, passwordHash, childName, parseInt(birthMonth) || 1, parseInt(birthYear) || 2020]
    )

    const user = rows[0]
    const token = signToken(user.id)
    res.status(201).json({ token, user: serializeUser(user), progress: {} })
  } catch (err) {
    console.error('register error:', err)
    res.status(500).json({ error: 'Gagal mendaftar' })
  }
})

// Login: verify credentials
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' })
    }

    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email])
    const user = rows[0]
    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' })
    }

    const ok = await verifyPassword(String(password), user.password_hash)
    if (!ok) {
      return res.status(401).json({ error: 'Email atau password salah' })
    }

    const token = signToken(user.id)
    const progress = await getProgressMap(user.id)
    res.json({ token, user: serializeUser(user), progress })
  } catch (err) {
    console.error('login error:', err)
    res.status(500).json({ error: 'Gagal masuk' })
  }
})

// Current user profile + progress
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.userId])
    const user = rows[0]
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' })

    const progress = await getProgressMap(user.id)
    res.json({ user: serializeUser(user), progress })
  } catch (err) {
    console.error('me error:', err)
    res.status(500).json({ error: 'Gagal memuat profil' })
  }
})

// Update child profile
app.put('/api/profile', requireAuth, async (req, res) => {
  try {
    const { childName, birthMonth, birthYear } = req.body || {}
    const { rows } = await query(
      `UPDATE users
         SET child_name = COALESCE($1, child_name),
             birth_month = COALESCE($2, birth_month),
             birth_year = COALESCE($3, birth_year),
             updated_at = now()
       WHERE id = $4 RETURNING *`,
      [
        childName ?? null,
        birthMonth != null ? parseInt(birthMonth) : null,
        birthYear != null ? parseInt(birthYear) : null,
        req.userId,
      ]
    )
    res.json({ user: serializeUser(rows[0]) })
  } catch (err) {
    console.error('profile error:', err)
    res.status(500).json({ error: 'Gagal menyimpan profil' })
  }
})

// Upsert stage progress
app.put('/api/progress/:stageId', requireAuth, async (req, res) => {
  try {
    const stageId = parseInt(req.params.stageId)
    if (!Number.isInteger(stageId)) {
      return res.status(400).json({ error: 'stageId tidak valid' })
    }

    const { solved = 0, attempts = 0, maxLevel = 0, timeSpent = 0, completedAt = null } = req.body || {}

    const { rows } = await query(
      `INSERT INTO stage_progress (user_id, stage_id, solved, attempts, max_level, time_spent, started_at, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, now(), $7)
       ON CONFLICT (user_id, stage_id) DO UPDATE SET
         solved = EXCLUDED.solved,
         attempts = EXCLUDED.attempts,
         max_level = EXCLUDED.max_level,
         time_spent = EXCLUDED.time_spent,
         completed_at = COALESCE(EXCLUDED.completed_at, stage_progress.completed_at)
       RETURNING stage_id, solved, attempts, max_level, time_spent, started_at, completed_at`,
      [req.userId, stageId, solved, attempts, maxLevel, timeSpent, completedAt]
    )

    const r = rows[0]
    res.json({
      stageId: r.stage_id,
      progress: {
        solved: r.solved,
        attempts: r.attempts,
        maxLevel: r.max_level,
        timeSpent: r.time_spent,
        startedAt: r.started_at,
        completedAt: r.completed_at,
      },
    })
  } catch (err) {
    console.error('progress error:', err)
    res.status(500).json({ error: 'Gagal menyimpan progress' })
  }
})

app.listen(PORT, () => {
  console.log(`VINUR API listening on http://localhost:${PORT}`)
})
