import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import {
	gameResultInsertSchema,
	guessHistoryItemSchema,
	TABLE_game_result,
} from "@/db/schema";

// NOTE: All server functions should have the Fn suffix

const addGameResultSchema = gameResultInsertSchema.extend({
	guessHistory: z.array(guessHistoryItemSchema),
});

// Will be used to add a new game result to the database
export const addGameResultFn = createServerFn({
	method: "POST",
})
	.inputValidator(addGameResultSchema)
	.handler(async ({ data }) => {
		const [createdGameResult] = await db
			.insert(TABLE_game_result)
			.values(data)
			.returning();

		if (!createdGameResult) {
			throw new Error("Failed to create game result");
		}

		return createdGameResult;
	});

const getGameResultByIdSchema = z.object({
	id: z.string(),
});

// Gets a single game result by ID
export const getGameResultByIdFn = createServerFn({
	method: "GET",
})
	.inputValidator(getGameResultByIdSchema)
	.handler(async ({ data }) => {
		const [foundGameResult] = await db
			.select()
			.from(TABLE_game_result)
			.where(eq(TABLE_game_result.id, parseInt(data.id, 10)))
			.limit(1);

		if (!foundGameResult) {
			throw new Error("Game result not found");
		}

		return foundGameResult;
	});

const getGameResultsForUserSchema = z.object({
	userId: z.string(),
});

// Gets all game results for a given user
export const getGameResultsForUserFn = createServerFn({
	method: "GET",
})
	.inputValidator(getGameResultsForUserSchema)
	.handler(async ({ data }) => {
		const gameResults = await db
			.select()
			.from(TABLE_game_result)
			.where(eq(TABLE_game_result.userId, data.userId));

		return gameResults;
	});
