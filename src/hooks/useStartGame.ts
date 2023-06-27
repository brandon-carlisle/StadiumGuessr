import type { Team } from "@prisma/client";
import { useEffect, useMemo } from "react";

import { shuffleTeams } from "@utils/shuffleTeams";

import {
  decrementTimeRemaining,
  setCurrentTeam,
  setTeams,
  setTeamsRemaining,
} from "@store/features/game/game-slice";
import { useAppDispatch } from "@store/hooks";

export default function useStartGame(teams: Team[]) {
  const dispatch = useAppDispatch();
  const shuffledTeams = useMemo(() => shuffleTeams(teams), [teams]);

  useEffect(() => {
    dispatch(setTeams(shuffledTeams));
    dispatch(setTeamsRemaining(shuffledTeams.length));

    if (shuffledTeams[0]) {
      dispatch(setCurrentTeam(shuffledTeams[0]));
    }
  }, [dispatch, shuffledTeams]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(decrementTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return { shuffledTeams };
}
