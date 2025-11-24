import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { team, league } from '@/db/schema'
import { nanoid } from 'nanoid'

// NOTE: All server functions should have the Fn suffix

// Gets all teams for a given league for the client
export const getTeamsForLeagueFn = createServerFn({
  method: 'GET',
}).handler(async ({ data }: { data: { leagueCode: string } }) => {
  try {
    if (!data?.leagueCode) {
      return {
        success: false,
        error: 'League code is required',
      }
    }

    // First find the league by code
    const [foundLeague] = await db
      .select()
      .from(league)
      .where(eq(league.code, data.leagueCode))
      .limit(1)

    if (!foundLeague) {
      return {
        success: false,
        error: 'League not found',
      }
    }

    // Then get all teams for that league
    const teams = await db
      .select()
      .from(team)
      .where(eq(team.leagueId, foundLeague.id))

    return {
      success: true,
      data: teams,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch teams',
    }
  }
})

// Gets a single team by ID
export const getTeamByIdFn = createServerFn({
  method: 'GET',
}).handler(async ({ data }: { data: { id: string } }) => {
  try {
    if (!data?.id) {
      return {
        success: false,
        error: 'Team ID is required',
      }
    }

    const [foundTeam] = await db
      .select()
      .from(team)
      .where(eq(team.id, data.id))
      .limit(1)

    if (!foundTeam) {
      return {
        success: false,
        error: 'Team not found',
      }
    }

    return {
      success: true,
      data: foundTeam,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch team',
    }
  }
})

// Will be used to add a new team to the database (admin dashboard only)
export const addTeamFn = createServerFn({
  method: 'POST',
}).handler(
  async ({
    data,
  }: {
    data: {
      code: string
      clubName: string
      stadiumName: string
      latitude: number
      longitude: number
      leagueId: string
    }
  }) => {
    try {
      if (
        !data?.code ||
        !data?.clubName ||
        !data?.stadiumName ||
        data.latitude === undefined ||
        data.longitude === undefined ||
        !data?.leagueId
      ) {
        return {
          success: false,
          error:
            'Code, clubName, stadiumName, latitude, longitude, and leagueId are required',
        }
      }

      const newTeam = {
        id: nanoid(),
        code: data.code,
        clubName: data.clubName,
        stadiumName: data.stadiumName,
        latitude: data.latitude,
        longitude: data.longitude,
        leagueId: data.leagueId,
      }

      const [createdTeam] = await db.insert(team).values(newTeam).returning()

      return {
        success: true,
        data: createdTeam,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create team',
      }
    }
  },
)

// Will be used to update an existing team in the database (admin dashboard only)
export const updateTeamFn = createServerFn({
  method: 'POST',
}).handler(
  async ({
    data,
  }: {
    data: {
      id: string
      code?: string
      clubName?: string
      stadiumName?: string
      latitude?: number
      longitude?: number
      leagueId?: string
    }
  }) => {
    try {
      if (!data?.id) {
        return {
          success: false,
          error: 'Team ID is required',
        }
      }

      const updateData: {
        code?: string
        clubName?: string
        stadiumName?: string
        latitude?: number
        longitude?: number
        leagueId?: string
      } = {}
      if (data.code !== undefined) updateData.code = data.code
      if (data.clubName !== undefined) updateData.clubName = data.clubName
      if (data.stadiumName !== undefined) updateData.stadiumName = data.stadiumName
      if (data.latitude !== undefined) updateData.latitude = data.latitude
      if (data.longitude !== undefined) updateData.longitude = data.longitude
      if (data.leagueId !== undefined) updateData.leagueId = data.leagueId

      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          error: 'At least one field must be provided',
        }
      }

      const [updatedTeam] = await db
        .update(team)
        .set(updateData)
        .where(eq(team.id, data.id))
        .returning()

      if (!updatedTeam) {
        return {
          success: false,
          error: 'Team not found',
        }
      }

      return {
        success: true,
        data: updatedTeam,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update team',
      }
    }
  },
)

// Will be used to delete a team from the database (admin dashboard only)
export const deleteTeamFn = createServerFn({
  method: 'POST',
}).handler(async ({ data }: { data: { id: string } }) => {
  try {
    if (!data?.id) {
      return {
        success: false,
        error: 'Team ID is required',
      }
    }

    const [deletedTeam] = await db
      .delete(team)
      .where(eq(team.id, data.id))
      .returning()

    if (!deletedTeam) {
      return {
        success: false,
        error: 'Team not found',
      }
    }

    return {
      success: true,
      data: deletedTeam,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete team',
    }
  }
})