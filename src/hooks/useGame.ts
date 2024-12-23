import { useEffect } from "react";
import { gameActions } from "@/store/features/game/game-slice";
import { shuffle } from "@/lib/utils";
import { type League } from "@/data/leagues/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useTimer from "./useTimer";

export default function useGame(league: League) {
  const dispatch = useAppDispatch();

  const { status, teamsRemaining } = useAppSelector((state) => state.game);
  const { timeRemaining, startTimer, stopTimer, resetTimer } = useTimer();

  useEffect(() => {
    if (status === "IDLE") {
      const shuffled = shuffle(league.teams);

      resetTimer();
      startTimer();

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
  }, [dispatch, league, status, startTimer]);

  useEffect(() => {
    if ((timeRemaining === 0 || teamsRemaining === 0) && status === "PLAYING") {
      dispatch(gameActions.setGameStatus("COMPLETE"));
      stopTimer(); // Stop the timer when the game ends
    }
  }, [dispatch, timeRemaining, teamsRemaining, status, stop]);
}
