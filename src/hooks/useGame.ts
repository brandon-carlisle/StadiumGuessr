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

type LeagueCodeOpts = "EPL" | "EFL_CHAMPIONSHIP" | null;

export default function useGame({ league }: { league: LeagueCodeOpts }) {
  const dispatch = useAppDispatch();
  const { data: teams } = api.localStadium.get.useQuery({
    leagueCode: league,
  });

  const { timeRemaining, stadiumsRemaining, userHasFinishedGame } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    if (teams) {
      const shuffledStadiums = shuffle(teams);

      dispatch(setStadiums(shuffledStadiums));
      dispatch(setStadiumsRemaining(shuffledStadiums.length));

      if (shuffledStadiums[0]) {
        dispatch(setCurrentStadium(shuffledStadiums[0]));
      }
    }
  }, [dispatch, teams]);

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
