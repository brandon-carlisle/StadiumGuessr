import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { gameResult } from '@/db/schema'
import { nanoid } from 'nanoid'

// NOTE: All server functions should have the Fn suffix

// Will be used to add a new game result to the database
export const addGameResultFn = createServerFn({
  method: 'POST',
}).handler(
  async ({
    data,
  }: {
    data: {
      userId: string
      leagueId: string
      score: number
      totalTeams: number
      teamsGuessed: number
      guessHistory: Array<{
        teamCode: string
        guessLat: number
        guessLng: number
        actualLat: number
        actualLng: number
        distance: number
        points: number
      }>
      completedAt?: Date
    }
  }) => {
    try {
      if (
        !data?.userId ||
        !data?.leagueId ||
        data.score === undefined ||
        !data?.totalTeams ||
        data.teamsGuessed === undefined ||
        !data?.guessHistory
      ) {
        return {
          success: false,
          error:
            'UserId, leagueId, score, totalTeams, teamsGuessed, and guessHistory are required',
        }
      }

      const newGameResult = {
        id: nanoid(),
        userId: data.userId,
        leagueId: data.leagueId,
        score: data.score,
        totalTeams: data.totalTeams,
        teamsGuessed: data.teamsGuessed,
        guessHistory: data.guessHistory,
        completedAt: data.completedAt || new Date(),
      }

      const [createdGameResult] = await db
        .insert(gameResult)
        .values(newGameResult)
        .returning()

      return {
        success: true,
        data: createdGameResult,
      }
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to create game result',
      }
    }
  },
)

// Gets a single game result by ID
export const getGameResultByIdFn = createServerFn({
  method: 'GET',
}).handler(async ({ data }: { data: { id: string } }) => {
  try {
    if (!data?.id) {
      return {
        success: false,
        error: 'Game result ID is required',
      }
    }

    const [foundGameResult] = await db
      .select()
      .from(gameResult)
      .where(eq(gameResult.id, data.id))
      .limit(1)

    if (!foundGameResult) {
      return {
        success: false,
        error: 'Game result not found',
      }
    }

    return {
      success: true,
      data: foundGameResult,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch game result',
    }
  }
})

// Gets all game results for a given user
export const getGameResultsForUserFn = createServerFn({
  method: 'GET',
}).handler(async ({ data }: { data: { userId: string } }) => {
  try {
    if (!data?.userId) {
      return {
        success: false,
        error: 'User ID is required',
      }
    }

    const gameResults = await db
      .select()
      .from(gameResult)
      .where(eq(gameResult.userId, data.userId))

    return {
      success: true,
      data: gameResults,
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch game results for user',
    }
  }
})
