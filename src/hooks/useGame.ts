import { type LeagueCodeOpts } from "@/types/types";
import { useEffect } from "react";

import { api } from "@/utils/api";
import { shuffle } from "@/utils/shuffle-stadiums";

import {
  decrementTimeRemaining,
  setCurrentStadium,
  setStadiums,
  setStadiumsRemaining,
  setUserHasFinishedGame,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useGame({
  leagueCode,
}: {
  leagueCode: LeagueCodeOpts;
}) {
  const dispatch = useAppDispatch();

  const { data: league } = api.localStadium.getLeague.useQuery({
    leagueCode,
  });

  const { timeRemaining, stadiumsRemaining, userHasFinishedGame } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    if (league) {
      const shuffledStadiums = shuffle(league.teams);
      dispatch(setStadiums(shuffledStadiums));
      dispatch(setStadiumsRemaining(shuffledStadiums.length));

      if (shuffledStadiums[0]) {
        dispatch(setCurrentStadium(shuffledStadiums[0]));
      }
    }
  }, [dispatch, league]);

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
