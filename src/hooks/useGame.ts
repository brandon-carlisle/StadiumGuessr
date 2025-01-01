import { useEffect } from "react";
import { gameActions } from "@/store/features/game/game-slice";
import { shuffle } from "@/lib/utils";
import { type League } from "@/data/leagues/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useGame(league: League) {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.game.status);
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);

  function startGame(league: League) {
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

  useEffect(() => {
    if (status === "IDLE") {
      startGame(league);
    }
  }, [status, startGame, dispatch]);

  if (teamsRemaining === 0) {
    dispatch(gameActions.setGameStatus("COMPLETE"));
  }

  return { currentTeam };
}
