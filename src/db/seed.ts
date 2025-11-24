import { allLeagues } from "@/data/leagues";
import { db } from "./index.ts";
import {
	type LeagueInsert,
	TABLE_league,
	TABLE_team,
	type TeamInsert,
} from "./schema.ts";

async function seed() {
	console.log("🌱 Starting database seed...");

	try {
		// Delete existing teams first (due to foreign key constraint)
		console.log("🗑️  Clearing existing teams...");
		await db.delete(TABLE_team);

		// Delete existing leagues
		console.log("🗑️  Clearing existing leagues...");
		await db.delete(TABLE_league);

		// Insert leagues and teams
		for (const leagueData of allLeagues) {
			console.log(
				`📋 Inserting league: ${leagueData.leagueName} (${leagueData.code})`,
			);

			// Insert league
			const leagueInsert: LeagueInsert = {
				code: leagueData.code,
				name: leagueData.leagueName,
			};
			const [createdLeagueResult] = await db
				.insert(TABLE_league)
				.values(leagueInsert)
				.returning();

			// Insert teams
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

			console.log(`  ⚽ Inserting ${teamsToInsert.length} teams...`);
			await db.insert(TABLE_team).values(teamsToInsert);
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
