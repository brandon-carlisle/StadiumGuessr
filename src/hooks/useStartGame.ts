import type { Stadium } from "@prisma/client";
import { useMemo } from "react";

import { shuffleStadiumArray } from "@/utils/shuffle-stadiums";

import { useAppDispatch } from "@/store/hooks";

export default function useStartGame(stadiums: Stadium[]) {
  const dispatch = useAppDispatch();
  const shuffledTeams = useMemo(
    () => shuffleStadiumArray(stadiums),
    [stadiums],
  );

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
