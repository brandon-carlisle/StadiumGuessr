import { useEffect } from "react";
import { gameActions } from "@/store/features/game/game-slice";
import { shuffle } from "@/lib/utils";
import { type League } from "@/data/leagues/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { timerActions } from "@/store/features/timer/timer-slice";

export default function useGame(league: League) {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.game.status);
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);

  function startGame(league: League) {
    const shuffled = shuffle(league.teams);
    const baseGuessTimePerTeam = 0.5; // seconds per team
    const calculatedInitialTime = baseGuessTimePerTeam * league.teams.length;

    // dispatch(timerActions.reset());
    dispatch(timerActions.setTimeRemaining(calculatedInitialTime));

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

  useEffect(() => {
    if (status === "IDLE") {
      startGame(league);
    }

    if (status === "COMPLETE") {
      dispatch(timerActions.stop());
    }
  }, [status, startGame, dispatch]);

  if (teamsRemaining === 0) {
    dispatch(gameActions.setGameStatus("COMPLETE"));
  }

  return { currentTeam };
}
