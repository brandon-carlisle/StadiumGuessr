import { db } from './index.ts'
import { league, team } from './schema.ts'
import { allLeagues } from '@/data/leagues'
import { nanoid } from 'nanoid'

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    // Delete existing teams first (due to foreign key constraint)
    console.log('🗑️  Clearing existing teams...')
    await db.delete(team)

    // Delete existing leagues
    console.log('🗑️  Clearing existing leagues...')
    await db.delete(league)

    // Insert leagues and teams
    for (const leagueData of allLeagues) {
      const leagueId = nanoid()
      
      console.log(`📋 Inserting league: ${leagueData.leagueName} (${leagueData.code})`)
      
      // Insert league
      await db.insert(league).values({
        id: leagueId,
        code: leagueData.code,
        name: leagueData.leagueName,
      })

      // Transform and insert teams
      const teamsToInsert = leagueData.teams.map((teamData) => {
        // Transform data structure:
        // - stadiumNames[0] -> stadiumName
        // - locaction.lat -> latitude
        // - locaction.lng -> longitude
        return {
          id: nanoid(),
          code: teamData.code,
          clubName: teamData.clubName,
          stadiumName: teamData.stadiumNames[0] || '',
          latitude: teamData.locaction.lat,
          longitude: teamData.locaction.lng,
          leagueId: leagueId,
        }
      })

      console.log(`  ⚽ Inserting ${teamsToInsert.length} teams...`)
      await db.insert(team).values(teamsToInsert)
    }

    console.log('✅ Database seed completed successfully!')
    
    // Print summary
    const leagueCount = await db.select().from(league)
    const teamCount = await db.select().from(team)
    console.log(`📊 Summary: ${leagueCount.length} leagues, ${teamCount.length} teams`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seed function
seed()
  .then(() => {
    console.log('🎉 Seed script finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error)
    process.exit(1)
  })
