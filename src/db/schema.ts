import { pgTable, text, timestamp, boolean, index, integer, doublePrecision, jsonb } from 'drizzle-orm/pg-core'
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  gameResults: many(gameResult),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// League schema
export const league = pgTable(
  "league",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("league_code_idx").on(table.code)],
);

// Team schema
export const team = pgTable(
  "team",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull().unique(),
    clubName: text("club_name").notNull(),
    stadiumName: text("stadium_name").notNull(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    leagueId: text("league_id")
      .notNull()
      .references(() => league.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("team_code_idx").on(table.code),
    index("team_leagueId_idx").on(table.leagueId),
  ],
);

// Game result schema
export const gameResult = pgTable(
  "game_result",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    leagueId: text("league_id")
      .notNull()
      .references(() => league.id, { onDelete: "cascade" }),
    score: integer("score").notNull().default(0),
    totalTeams: integer("total_teams").notNull(),
    teamsGuessed: integer("teams_guessed").notNull().default(0),
    guessHistory: jsonb("guess_history").$type<Array<{
      teamCode: string;
      guessLat: number;
      guessLng: number;
      actualLat: number;
      actualLng: number;
      distance: number;
      points: number;
    }>>().notNull().default([]),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("game_result_userId_idx").on(table.userId),
    index("game_result_leagueId_idx").on(table.leagueId),
  ],
);

// Relations
export const leagueRelations = relations(league, ({ many }) => ({
  teams: many(team),
  gameResults: many(gameResult),
}));

export const teamRelations = relations(team, ({ one }) => ({
  league: one(league, {
    fields: [team.leagueId],
    references: [league.id],
  }),
}));

export const gameResultRelations = relations(gameResult, ({ one }) => ({
  user: one(user, {
    fields: [gameResult.userId],
    references: [user.id],
  }),
  league: one(league, {
    fields: [gameResult.leagueId],
    references: [league.id],
  }),
}));