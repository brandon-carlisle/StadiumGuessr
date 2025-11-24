import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import useGame from "@/hooks/useGame";
import GameLayout from "@/layouts/game-layout";
import { addGameResultFn } from "@/server-functions/games";
import { getLeagueByIdWithTeamsFn } from "@/server-functions/leagues";
import { useAppSelector } from "@/store/hooks";

export const Route = createFileRoute("/play/$leagueId")({
	component: RouteComponent,
	loader: async ({ params }) =>
		await getLeagueByIdWithTeamsFn({ data: { id: params.leagueId } }),
	head: () => ({
		meta: [
			{
				title: "Playing now",
			},
		],
	}),
});

function RouteComponent() {
	const league = Route.useLoaderData();
	const { startGame } = useGame();
	const state = useAppSelector((state) => state.game);
	const status = useAppSelector((state) => state.game.status);

	useEffect(() => {
		startGame(league);
	}, [startGame, league]);

	useEffect(() => {
		if (status === "COMPLETE") {
			(async () => {
				try {
					console.log("Saving game to database");
					// TODO: Transform state to match addGameResultFn schema
					// This will need userId, leagueId, score, totalTeams, teamsGuessed, guessHistory
					const result = await addGameResultFn({
						data: {
							userId: "", // TODO: Get from auth context
							leagueId: state.league.id,
							score: state.score,
							totalTeams: state.league.teams.length,
							teamsGuessed: state.league.teams.length - state.teamsRemaining,
							guessHistory: state.guessHistory,
						},
					});
					console.log("Game saved with id: ", result.id);
				} catch (error) {
					console.error("Failed to save game: ", error);
				}
			})();
		}
	}, [status, state]);

	return <GameLayout />;
}
