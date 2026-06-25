-- VINUR database schema
-- Runs automatically on first Postgres init (mounted into /docker-entrypoint-initdb.d).

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  child_name    VARCHAR(255) DEFAULT '',
  birth_month   INT DEFAULT 1,
  birth_year    INT DEFAULT 2020,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stage_progress (
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stage_id     INT NOT NULL,
  solved       INT DEFAULT 0,
  attempts     INT DEFAULT 0,
  max_level    INT DEFAULT 0,
  time_spent   INT DEFAULT 0,
  started_at   TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, stage_id)
);
