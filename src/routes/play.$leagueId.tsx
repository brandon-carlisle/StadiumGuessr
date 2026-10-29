import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useGame from "@/hooks/useGame";
import GameLayout from "@/layouts/game-layout";
import { useSession } from "@/lib/auth-client";
import { addGameResultFn } from "@/server-functions/games";
import { getLeagueByIdWithTeamsFn } from "@/server-functions/leagues";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const savedPlayIds = new Set<string>();

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
	const status = useAppSelector((state) => state.game.status);
	const playId = useAppSelector((state) => state.game.playId);
	const leagueId = useAppSelector((state) => state.game.league.id);
	const guessHistory = useAppSelector((state) => state.game.guessHistory);
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const [saveError, setSaveError] = useState<string | null>(null);

	// Reset game state when entering play route to ensure clean state
	useEffect(() => {
		dispatch(gameActions.resetGame());
	}, [dispatch]);

	// Start the game after reset completes
	useEffect(() => {
		if (status === "IDLE" && league && league.teams.length > 0) {
			startGame(league);
		}
	}, [startGame, league, status]);

	useEffect(() => {
		if (status !== "COMPLETE" || !session?.user?.id || !playId) {
			return;
		}
		if (savedPlayIds.has(playId)) {
			return;
		}
		savedPlayIds.add(playId);

		const guesses = guessHistory.map((guess) => ({
			teamId: guess.teamId,
			guessLat: guess.guessLat,
			guessLng: guess.guessLng,
		}));

		void (async () => {
			try {
				await addGameResultFn({
					data: {
						leagueId,
						guessHistory: guesses,
					},
				});
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Could not save this game";
				setSaveError(message);
				toast.error(message);
			}
		})();
	}, [status, session?.user?.id, playId, leagueId, guessHistory]);

	return (
		<>
			{saveError ? (
				<div className="alert alert-error m-4">
					<span>Could not save this game. {saveError}</span>
				</div>
			) : null}
			<GameLayout />
		</>
	);
}
