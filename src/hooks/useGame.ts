import { gameActions } from "@/store/features/game/game-slice";
import { mapActions } from "@/store/features/map/map-slice";
import { shuffle } from "@/lib/utils";
import { type League } from "@/data/leagues/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export default function useGame() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.game.status);
  const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);

  function startGame(league: League) {
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
    if (status === "PLAYING" && teamsRemaining === 0) {
      dispatch(gameActions.setGameStatus("COMPLETE"));
    }
  }, [status, teamsRemaining, dispatch]);

  return { startGame };
}

