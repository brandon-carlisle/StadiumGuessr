import { useEffect, useMemo } from "react";

import { api } from "@/utils/api";
import { shuffleStadiumArray } from "@/utils/shuffle-stadiums";

import {
  decrementTimeRemaining,
  setCurrentStadium,
  setStadiums,
  setStadiumsRemaining,
} from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

export default function useStartGame() {
  const dispatch = useAppDispatch();

  const { data: stadiums } = api.stadium.getAll.useQuery();

  const shuffledStadiums = useMemo(
    () => shuffleStadiumArray(stadiums),
    [stadiums],
  );

  useEffect(() => {
    dispatch(setStadiums(shuffledStadiums));
    dispatch(setStadiumsRemaining(shuffledStadiums.length));

    if (shuffledStadiums[0]) {
      dispatch(setCurrentStadium(shuffledStadiums[0]));
    }
  }, [dispatch, shuffledStadiums]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(decrementTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return { shuffledStadiums };
}
