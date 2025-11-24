import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import {
	TABLE_league,
	TABLE_team,
	teamInsertSchema,
	teamUpdateSchema,
} from "@/db/schema";

// NOTE: All server functions should have the Fn suffix

const getTeamsForLeagueSchema = z.object({
	leagueId: z.number(),
});

// Gets all teams for a given league for the client
export const getTeamsForLeagueFn = createServerFn({
	method: "GET",
})
	.inputValidator(getTeamsForLeagueSchema)
	.handler(async ({ data }) => {
		// First find the league by id
		const [foundLeague] = await db
			.select()
			.from(TABLE_league)
			.where(eq(TABLE_league.id, data.leagueId))
			.limit(1);

		if (!foundLeague) {
			throw new Error("League not found");
		}

		// Then get all teams for that league
		const teams = await db
			.select()
			.from(TABLE_team)
			.where(eq(TABLE_team.leagueId, foundLeague.id));

		return teams;
	});

const getTeamByIdSchema = z.object({
	id: z.number(),
});

// Gets a single team by ID
export const getTeamByIdFn = createServerFn({
	method: "GET",
})
	.inputValidator(getTeamByIdSchema)
	.handler(async ({ data }) => {
		const [foundTeam] = await db
			.select()
			.from(TABLE_team)
			.where(eq(TABLE_team.id, data.id))
			.limit(1);

		if (!foundTeam) {
			throw new Error("Team not found");
		}

		return foundTeam;
	});

// Will be used to add a new team to the database (admin dashboard only)
export const addTeamFn = createServerFn({
	method: "POST",
})
	.inputValidator(teamInsertSchema)
	.handler(async ({ data }) => {
		const [createdTeam] = await db.insert(TABLE_team).values(data).returning();

		if (!createdTeam) {
			throw new Error("Failed to create team");
		}

		return createdTeam;
	});

// Will be used to update an existing team in the database (admin dashboard only)
export const updateTeamFn = createServerFn({
	method: "POST",
})
	.inputValidator(teamUpdateSchema.extend({ id: z.string() }))
	.handler(async ({ data }) => {
		const [updatedTeam] = await db
			.update(TABLE_team)
			.set(data)
			.where(eq(TABLE_team.id, parseInt(data.id, 10)))
			.returning();

		if (!updatedTeam) {
			throw new Error("Team not found");
		}

		return updatedTeam;
	});

const deleteTeamSchema = z.object({
	id: z.number(),
});

// Will be used to delete a team from the database (admin dashboard only)
export const deleteTeamFn = createServerFn({
	method: "POST",
})
	.inputValidator(deleteTeamSchema)
	.handler(async ({ data }) => {
		const [deletedTeam] = await db
			.delete(TABLE_team)
			.where(eq(TABLE_team.id, data.id))
			.returning();

		if (!deletedTeam) {
			throw new Error("Team not found");
		}

		return deletedTeam;
	});
