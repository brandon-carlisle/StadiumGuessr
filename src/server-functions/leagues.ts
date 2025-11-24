import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { league } from '@/db/schema'
import { nanoid } from 'nanoid'

// NOTE: All server functions should have the Fn suffix

// Gets all leagues for admin dashboard
export const getLeaguesFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const leagues = await db.select().from(league)
    return {
      success: true,
      data: leagues,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch leagues',
    }
  }
})

// Gets a single league by ID
export const getLeagueByIdFn = createServerFn({
  method: 'GET',
}).handler(async ({ data }: { data: { id: string } }) => {
  try {
    if (!data?.id) {
      return {
        success: false,
        error: 'League ID is required',
      }
    }

    const [foundLeague] = await db
      .select()
      .from(league)
      .where(eq(league.id, data.id))
      .limit(1)

    if (!foundLeague) {
      return {
        success: false,
        error: 'League not found',
      }
    }

    return {
      success: true,
      data: foundLeague,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch league',
    }
  }
})

// Will be used to add a new league to the database (admin dashboard only)
export const addLeagueFn = createServerFn({
  method: 'POST',
}).handler(async ({ data }: { data: { code: string; name: string } }) => {
  try {
    if (!data?.code || !data?.name) {
      return {
        success: false,
        error: 'Code and name are required',
      }
    }

    const newLeague = {
      id: nanoid(),
      code: data.code,
      name: data.name,
    }

    const [createdLeague] = await db
      .insert(league)
      .values(newLeague)
      .returning()

    return {
      success: true,
      data: createdLeague,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create league',
    }
  }
})

// Will be used to update an existing league (such as name or code) in the database (admin dashboard only)
export const updateLeagueFn = createServerFn({
  method: 'POST',
}).handler(
  async ({
    data,
  }: {
    data: { id: string; code?: string; name?: string }
  }) => {
    try {
      if (!data?.id) {
        return {
          success: false,
          error: 'League ID is required',
        }
      }

      const updateData: { code?: string; name?: string } = {}
      if (data.code !== undefined) updateData.code = data.code
      if (data.name !== undefined) updateData.name = data.name

      if (Object.keys(updateData).length === 0) {
        return {
          success: false,
          error: 'At least one field (code or name) must be provided',
        }
      }

      const [updatedLeague] = await db
        .update(league)
        .set(updateData)
        .where(eq(league.id, data.id))
        .returning()

      if (!updatedLeague) {
        return {
          success: false,
          error: 'League not found',
        }
      }

      return {
        success: true,
        data: updatedLeague,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update league',
      }
    }
  },
)

// Will be used to delete a league from the database (admin dashboard only)
export const deleteLeagueFn = createServerFn({
  method: 'POST',
}).handler(async ({ data }: { data: { id: string } }) => {
  try {
    if (!data?.id) {
      return {
        success: false,
        error: 'League ID is required',
      }
    }

    const [deletedLeague] = await db
      .delete(league)
      .where(eq(league.id, data.id))
      .returning()

    if (!deletedLeague) {
      return {
        success: false,
        error: 'League not found',
      }
    }

    return {
      success: true,
      data: deletedLeague,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete league',
    }
  }
})