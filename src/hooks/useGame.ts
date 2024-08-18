import { useEffect } from "react";

import { api } from "@/utils/api";
import { shuffleStadiumArray } from "@/utils/shuffle-stadiums";
import type { LeagueOption } from "@/utils/types";

import {
  decrementTimeRemaining,
  setCurrentStadium,
  setStadiums,
  setStadiumsRemaining,
  setUserHasFinishedGame,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useGame({ league }: { league: LeagueOption }) {
  const dispatch = useAppDispatch();

  const { data: stadiums, isSuccess } =
    api.stadium.getByLeagueOrRandom.useQuery({
      league,
    });

  const { timeRemaining, stadiumsRemaining, userHasFinishedGame } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    if (isSuccess) {
      const shuffledStadiums = shuffleStadiumArray(stadiums);

      dispatch(setStadiums(shuffledStadiums));
      dispatch(setStadiumsRemaining(shuffledStadiums.length));

      if (shuffledStadiums[0]) dispatch(setCurrentStadium(shuffledStadiums[0]));
    }
  }, [dispatch, isSuccess, stadiums]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(decrementTimeRemaining());
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [dispatch, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 || stadiumsRemaining === 0) {
      dispatch(setUserHasFinishedGame(true));
    }
  }, [dispatch, stadiumsRemaining, timeRemaining]);

  return {
    userHasFinishedGame,
  };
}
