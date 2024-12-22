import { useEffect } from "react";

import { gameActions } from "@/store/features/game/game-slice";
import { shuffle } from "@/lib/utils";
import { type League } from "@/data/leagues/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// TODO: FIX RE-RENDERS!

export default function useGame(league: League) {
  const dispatch = useAppDispatch();

  const { status, timeRemaining, teamsRemaining } = useAppSelector(
    (state) => state.game,
  );

  useEffect(() => {
    if (status === "IDLE") {
      const shuffled = shuffle(league.teams);
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
  }, [dispatch, league, status]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (status === "PLAYING" && timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(gameActions.decrementTimeRemaining());
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [dispatch, status, timeRemaining]);

  useEffect(() => {
    if (
      (timeRemaining === 0 || teamsRemaining === 0) &&
      status !== "COMPLETE"
    ) {
      dispatch(gameActions.setGameStatus("COMPLETE"));
    }
  }, [dispatch, timeRemaining, teamsRemaining, status]);
}
