import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { TABLE_game_result, TABLE_league, TABLE_team } from "@/db/schema";
import { calculateDistance, calculateScore } from "@/lib/utils";
import { requireUser } from "@/server-functions/session";

const submittedGuessSchema = z.object({
	teamId: z.number().int(),
	guessLat: z.number(),
	guessLng: z.number(),
});

const addGameResultSchema = z.object({
	leagueId: z.number().int(),
	guessHistory: z.array(submittedGuessSchema),
});

// Saves a finished game for the signed-in user. Points are recomputed from stored stadium coordinates.
export const addGameResultFn = createServerFn({
	method: "POST",
})
	.validator(addGameResultSchema)
	.handler(async ({ data }) => {
		const session = await requireUser();

		const [league] = await db
			.select()
			.from(TABLE_league)
			.where(eq(TABLE_league.id, data.leagueId))
			.limit(1);

		if (!league) {
			throw new Error("League not found");
		}

		const teams = await db
			.select()
			.from(TABLE_team)
			.where(eq(TABLE_team.leagueId, league.id));

		const teamById = new Map(teams.map((team) => [team.id, team]));
		const seenTeamIds = new Set<number>();
		let score = 0;

		const guessHistory = data.guessHistory.map((guess) => {
			const team = teamById.get(guess.teamId);
			if (!team) {
				throw new Error("Guess is not for a team in this league");
			}
			if (seenTeamIds.has(team.id)) {
				throw new Error("Duplicate guess for a team");
			}
			seenTeamIds.add(team.id);

			const distance = calculateDistance(
				guess.guessLat,
				guess.guessLng,
				team.latitude,
				team.longitude,
			);
			const points = calculateScore(distance);
			score += points;

			return {
				teamCode: team.code,
				teamName: team.clubName,
				teamId: team.id,
				guessLat: guess.guessLat,
				guessLng: guess.guessLng,
				actualLat: team.latitude,
				actualLng: team.longitude,
				distance,
				points,
			};
		});

		const [createdGameResult] = await db
			.insert(TABLE_game_result)
			.values({
				userId: session.user.id,
				leagueId: league.id,
				score,
				totalTeams: teams.length,
				teamsGuessed: guessHistory.length,
				guessHistory,
				completedAt: new Date(),
			})
			.returning();

		if (!createdGameResult) {
			throw new Error("Failed to create game result");
		}

		return createdGameResult;
	});

const getGameResultByIdSchema = z.object({
	id: z.string(),
});

// Gets one game result when it belongs to the signed-in user
export const getGameResultByIdFn = createServerFn({
	method: "GET",
})
	.validator(getGameResultByIdSchema)
	.handler(async ({ data }) => {
		const session = await requireUser();

		const [foundGameResult] = await db
			.select({
				id: TABLE_game_result.id,
				userId: TABLE_game_result.userId,
				leagueId: TABLE_game_result.leagueId,
				leagueName: TABLE_league.name,
				score: TABLE_game_result.score,
				totalTeams: TABLE_game_result.totalTeams,
				teamsGuessed: TABLE_game_result.teamsGuessed,
				guessHistory: TABLE_game_result.guessHistory,
				completedAt: TABLE_game_result.completedAt,
				createdAt: TABLE_game_result.createdAt,
			})
			.from(TABLE_game_result)
			.innerJoin(TABLE_league, eq(TABLE_game_result.leagueId, TABLE_league.id))
			.where(eq(TABLE_game_result.id, parseInt(data.id, 10)))
			.limit(1);

		if (!foundGameResult) {
			throw new Error("Game result not found");
		}

		if (foundGameResult.userId !== session.user.id) {
			throw new Error("Game result not found");
		}

		return foundGameResult;
	});

// Gets saved games for the signed-in user
export const getGameResultsForUserFn = createServerFn({
	method: "GET",
}).handler(async () => {
	const session = await requireUser();

	const gameResults = await db
		.select({
			id: TABLE_game_result.id,
			leagueId: TABLE_game_result.leagueId,
			leagueName: TABLE_league.name,
			score: TABLE_game_result.score,
			totalTeams: TABLE_game_result.totalTeams,
			teamsGuessed: TABLE_game_result.teamsGuessed,
			createdAt: TABLE_game_result.createdAt,
		})
		.from(TABLE_game_result)
		.innerJoin(TABLE_league, eq(TABLE_game_result.leagueId, TABLE_league.id))
		.where(eq(TABLE_game_result.userId, session.user.id))
		.orderBy(desc(TABLE_game_result.createdAt));

	return gameResults;
});
