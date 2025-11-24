import { relations } from "drizzle-orm";
import {
	boolean,
	doublePrecision,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	role: userRole("role").default("user").notNull(),
	banned: boolean("banned"),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires"),
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
		impersonatedBy: text("impersonated_by"),
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
	gameResults: many(TABLE_game_result),
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
export const TABLE_league = pgTable(
	"league",
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
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

export type LeagueSelect = typeof TABLE_league.$inferSelect;
export type LeagueInsert = typeof TABLE_league.$inferInsert;
export const leagueInsertSchema = createInsertSchema(TABLE_league);
export const leagueUpdateSchema = createUpdateSchema(TABLE_league);

// Team schema
export const TABLE_team = pgTable(
	"team",
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
		code: text("code").notNull().unique(),
		clubName: text("club_name").notNull(),
		stadiumName: text("stadium_name").notNull(),
		latitude: doublePrecision("latitude").notNull(),
		longitude: doublePrecision("longitude").notNull(),
		leagueId: integer("league_id")
			.notNull()
			.references(() => TABLE_league.id, { onDelete: "cascade" }),
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

export type TeamSelect = typeof TABLE_team.$inferSelect;
export type TeamInsert = typeof TABLE_team.$inferInsert;
export const teamInsertSchema = createInsertSchema(TABLE_team);
export const teamUpdateSchema = createUpdateSchema(TABLE_team);

// League with teams type for game use
export type LeagueWithTeams = LeagueSelect & { teams: TeamSelect[] };

// Guess history type - source of truth
export interface GuessHistoryItem {
	teamCode: string;
	teamName: string;
	teamId: number;
	guessLat: number;
	guessLng: number;
	actualLat: number;
	actualLng: number;
	distance: number; // Distance in miles
	points: number;
}

// Zod schema for guess history validation
export const guessHistoryItemSchema = z.object({
	teamCode: z.string(),
	teamName: z.string(),
	teamId: z.number(),
	guessLat: z.number(),
	guessLng: z.number(),
	actualLat: z.number(),
	actualLng: z.number(),
	distance: z.number(),
	points: z.number(),
});

// Game result schema
export const TABLE_game_result = pgTable(
	"game_result",
	{
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		leagueId: integer("league_id")
			.notNull()
			.references(() => TABLE_league.id, { onDelete: "cascade" }),
		score: integer("score").notNull().default(0),
		totalTeams: integer("total_teams").notNull(),
		teamsGuessed: integer("teams_guessed").notNull().default(0),
		guessHistory: jsonb("guess_history")
			.$type<GuessHistoryItem[]>()
			.notNull()
			.default([]),
		completedAt: timestamp("completed_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("game_result_userId_idx").on(table.userId),
		index("game_result_leagueId_idx").on(table.leagueId),
	],
);

export type GameResultSelect = typeof TABLE_game_result.$inferSelect;
export type GameResultInsert = typeof TABLE_game_result.$inferInsert;
export const gameResultInsertSchema = createInsertSchema(TABLE_game_result);
export const gameResultUpdateSchema = createUpdateSchema(TABLE_game_result);

// Relations
export const leagueRelations = relations(TABLE_league, ({ many }) => ({
	teams: many(TABLE_team),
	gameResults: many(TABLE_game_result),
}));

export const teamRelations = relations(TABLE_team, ({ one }) => ({
	league: one(TABLE_league, {
		fields: [TABLE_team.leagueId],
		references: [TABLE_league.id],
	}),
}));

export const gameResultRelations = relations(TABLE_game_result, ({ one }) => ({
	user: one(user, {
		fields: [TABLE_game_result.userId],
		references: [user.id],
	}),
	league: one(TABLE_league, {
		fields: [TABLE_game_result.leagueId],
		references: [TABLE_league.id],
	}),
}));
