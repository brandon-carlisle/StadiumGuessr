import { createServerFn } from '@tanstack/react-start'
import { nanoid } from 'nanoid'
import { db } from '@/db'
import { games } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { GameState } from '@/store/features/game/game-slice'
import type { League, Team } from '@/data/leagues/types'

export interface Game {
  id: string
  datePlayed: string
  league: League
  teams: Team[]
  score: number
  correctTeamCodes: string[] | null
  skippedTeamCodes: string[] | null
}

export const getGames = createServerFn({
  method: 'GET',
}).handler(async () => {
  const result = await db.select().from(games).orderBy(games.datePlayed)
  
  return result.map((game) => ({
    id: game.id,
    datePlayed: game.datePlayed.toISOString(),
    league: game.league as League,
    teams: game.teams as Team[],
    score: game.score,
    correctTeamCodes: game.correctTeamCodes as string[] | null,
    skippedTeamCodes: game.skippedTeamCodes as string[] | null,
  })) as Game[]
})

export const getGame = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    const result = await db.select().from(games).where(eq(games.id, id)).limit(1)
    
    if (result.length === 0) {
      throw new Error('Game not found')
    }
    
    const game = result[0]
    return {
      id: game.id,
      datePlayed: game.datePlayed.toISOString(),
      league: game.league as League,
      teams: game.teams as Team[],
      score: game.score,
      correctTeamCodes: game.correctTeamCodes as string[] | null,
      skippedTeamCodes: game.skippedTeamCodes as string[] | null,
    } as Game
  })

export const saveGame = createServerFn({
  method: 'POST',
})
  .inputValidator((data: GameState) => data)
  .handler(async ({ data }) => {
    const gameId = nanoid()
    const datePlayed = new Date()
    
    await db.insert(games).values({
      id: gameId,
      datePlayed,
      league: data.league as unknown,
      teams: data.teams as unknown,
      score: data.score,
      correctTeamCodes: data.correctTeamCodes as unknown,
      skippedTeamCodes: data.incorrectTeamCodes as unknown,
    })
    
    return gameId
  })

