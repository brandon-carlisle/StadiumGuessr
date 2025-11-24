import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import useGame from "@/hooks/useGame";
import GameLayout from "@/layouts/game-layout";
import { useSession } from "@/lib/auth-client";
import { addGameResultFn } from "@/server-functions/games";
import { getLeagueByIdWithTeamsFn } from "@/server-functions/leagues";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
	const { data: session } = useSession();
	const dispatch = useAppDispatch();

	// Reset game state when entering play route to ensure clean state
	useEffect(() => {
		dispatch(gameActions.resetGame());
	}, [dispatch]);

	// Start the game after reset completes
	useEffect(() => {
		// Only start if status is IDLE (after reset) and we have league data
		if (status === "IDLE" && league && league.teams.length > 0) {
			startGame(league);
		}
	}, [startGame, league, status]);

	const canSaveGame = status === "COMPLETE" && session?.user?.id;

	useEffect(() => {
		// Only save game results if:
		// 1. Game status is COMPLETE
		// 2. User is logged in (has a valid user ID)
		if (canSaveGame) {
			(async () => {
				try {
					console.log("Saving game to database");
					const result = await addGameResultFn({
						data: {
							userId: session.user.id,
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
	}, [state, canSaveGame, session]);

	return <GameLayout />;
}
