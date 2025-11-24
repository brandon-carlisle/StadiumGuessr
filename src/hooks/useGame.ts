import { useEffect } from "react";
import type { LeagueWithTeams } from "@/db/schema";
import { shuffle } from "@/lib/utils";
import { gameActions } from "@/store/features/game/game-slice";
import { mapActions } from "@/store/features/map/map-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useGame() {
	const dispatch = useAppDispatch();

	const status = useAppSelector((state) => state.game.status);
	const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);
	const teams = useAppSelector((state) => state.game.teams);
	const guessHistory = useAppSelector((state) => state.game.guessHistory);

	function startGame(league: LeagueWithTeams) {
		if (status !== "IDLE") {
			console.log("Game not started: Status must be idle");
			return;
		}

		const shuffled = shuffle(league.teams);

		// Clear marker when starting new game
		dispatch(mapActions.clearMarker());

		dispatch(
			gameActions.initialise({
				league,
				teams: shuffled,
				teamsRemaining: league.teams.length,
				currentTeam: shuffled[0],
				status: "PLAYING",
			}),
		);
	}

	// Check for game completion when teams run out
	useEffect(() => {
		// Only mark as complete if:
		// 1. Status is PLAYING (game is actively running)
		// 2. Teams remaining is 0 (all teams have been guessed)
		// 3. Game was properly initialized (teams.length > 0)
		// 4. At least one guess was made (to distinguish from immediate completion)
		// 5. Teams remaining matches expected (teams.length guesses were made)
		if (
			status === "PLAYING" &&
			teamsRemaining === 0 &&
			teams.length > 0 &&
			guessHistory.length > 0 &&
			guessHistory.length === teams.length
		) {
			dispatch(gameActions.setGameStatus("COMPLETE"));
		}
	}, [status, teamsRemaining, teams.length, guessHistory.length, dispatch]);

	return { startGame };
}
