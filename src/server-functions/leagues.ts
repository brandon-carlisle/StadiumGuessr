import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import {
	leagueInsertSchema,
	leagueUpdateSchema,
	TABLE_league,
	TABLE_team,
} from "@/db/schema";

// NOTE: All server functions should have the Fn suffix

// Gets all leagues for admin dashboard
export const getLeaguesFn = createServerFn({
	method: "GET",
}).handler(async () => {
	const leagues = await db.select().from(TABLE_league);

	if (!leagues || leagues.length === 0) {
		throw new Error("No leagues found");
	}

	return leagues;
});

const getLeagueByIdSchema = z.object({
	id: z.string(),
});

// Gets a single league by ID
export const getLeagueByIdFn = createServerFn({
	method: "GET",
})
	.inputValidator(getLeagueByIdSchema)
	.handler(async ({ data }) => {
		const [foundLeague] = await db
			.select()
			.from(TABLE_league)
			.where(eq(TABLE_league.id, parseInt(data.id, 10)))
			.limit(1);

		if (!foundLeague) {
			throw new Error("League not found");
		}

		return foundLeague;
	});

// Gets a single league by ID with all its teams
export const getLeagueByIdWithTeamsFn = createServerFn({
	method: "GET",
})
	.inputValidator(getLeagueByIdSchema)
	.handler(async ({ data }) => {
		const [foundLeague] = await db
			.select()
			.from(TABLE_league)
			.where(eq(TABLE_league.id, parseInt(data.id, 10)))
			.limit(1);

		if (!foundLeague) {
			throw new Error("League not found");
		}

		// Fetch all teams for this league
		const teams = await db
			.select()
			.from(TABLE_team)
			.where(eq(TABLE_team.leagueId, foundLeague.id));

		return {
			...foundLeague,
			teams,
		};
	});

// Will be used to add a new league to the database (admin dashboard only)
export const addLeagueFn = createServerFn({
	method: "POST",
})
	.inputValidator(leagueInsertSchema)
	.handler(async ({ data }) => {
		const [createdLeague] = await db
			.insert(TABLE_league)
			.values(data)
			.returning();

		if (!createdLeague) {
			throw new Error("Failed to create league");
		}

		return createdLeague;
	});

// Will be used to update an existing league (such as name or code) in the database (admin dashboard only)
export const updateLeagueFn = createServerFn({
	method: "POST",
})
	.inputValidator(leagueUpdateSchema.extend({ id: z.string() }))
	.handler(async ({ data }) => {
		const [updatedLeague] = await db
			.update(TABLE_league)
			.set(data)
			.where(eq(TABLE_league.id, parseInt(data.id, 10)))
			.returning();

		if (!updatedLeague) {
			throw new Error("League not found");
		}

		return updatedLeague;
	});

const deleteLeagueSchema = z.object({
	id: z.string(),
});

// Will be used to delete a league from the database (admin dashboard only)
export const deleteLeagueFn = createServerFn({
	method: "POST",
})
	.inputValidator(deleteLeagueSchema)
	.handler(async ({ data }) => {
		const [deletedLeague] = await db
			.delete(TABLE_league)
			.where(eq(TABLE_league.id, parseInt(data.id, 10)))
			.returning();

		if (!deletedLeague) {
			throw new Error("League not found");
		}

		return deletedLeague;
	});
