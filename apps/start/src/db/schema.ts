import { pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const games = pgTable('games', {
  id: text('id').primaryKey(),
  datePlayed: timestamp('date_played').notNull(),
  league: jsonb('league').notNull(),
  teams: jsonb('teams').notNull(),
  score: integer('score').notNull(),
  correctTeamCodes: jsonb('correct_team_codes'),
  skippedTeamCodes: jsonb('skipped_team_codes'),
  createdAt: timestamp('created_at').defaultNow(),
})
