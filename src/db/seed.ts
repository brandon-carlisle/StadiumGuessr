import { sql } from "drizzle-orm";
import { allLeagues } from "@/data/leagues";
import { db } from "./index.ts";
import { TABLE_league, TABLE_team, type TeamInsert } from "./schema.ts";

async function seed() {
	console.log("🌱 Starting database seed...");

	try {
		for (const leagueData of allLeagues) {
			console.log(
				`📋 Upserting league: ${leagueData.leagueName} (${leagueData.code})`,
			);

			const [createdLeagueResult] = await db
				.insert(TABLE_league)
				.values({
					code: leagueData.code,
					name: leagueData.leagueName,
				})
				.onConflictDoUpdate({
					target: TABLE_league.code,
					set: {
						name: leagueData.leagueName,
						updatedAt: new Date(),
					},
				})
				.returning();

			if (!createdLeagueResult) {
				throw new Error(`Failed to upsert league ${leagueData.code}`);
			}

			const teamsToInsert: TeamInsert[] = leagueData.teams.map((teamData) => {
				return {
					code: teamData.code,
					clubName: teamData.clubName,
					stadiumName: teamData.stadiumName,
					latitude: teamData.latitude,
					longitude: teamData.longitude,
					leagueId: createdLeagueResult.id,
				};
			});

			console.log(`  ⚽ Upserting ${teamsToInsert.length} teams...`);
			await db
				.insert(TABLE_team)
				.values(teamsToInsert)
				.onConflictDoUpdate({
					target: TABLE_team.code,
					set: {
						clubName: sql`excluded.club_name`,
						stadiumName: sql`excluded.stadium_name`,
						latitude: sql`excluded.latitude`,
						longitude: sql`excluded.longitude`,
						leagueId: sql`excluded.league_id`,
						updatedAt: new Date(),
					},
				});
		}

		console.log("✅ Database seed completed successfully!");

		// Print summary
		const leagueCount = await db.select().from(TABLE_league);
		const teamCount = await db.select().from(TABLE_team);
		console.log(
			`📊 Summary: ${leagueCount.length} leagues, ${teamCount.length} teams`,
		);
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		throw error;
	}
}

// Run seed function
seed()
	.then(() => {
		console.log("🎉 Seed script finished");
		process.exit(0);
	})
	.catch((error) => {
		console.error("💥 Seed script failed:", error);
		process.exit(1);
	});
