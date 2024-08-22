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

  // Query for EPL teams
  const { data: eplStadiums, isSuccess: isEplSuccess } =
    api.stadium.getLocalEPLTeams.useQuery(undefined, {
      enabled: league === "EPL",
    });

  // Query for other leagues or random
  const { data: otherStadiums, isSuccess: isOtherSuccess } =
    api.stadium.getByLeagueOrRandom.useQuery(
      { league },
      {
        enabled: league !== "EPL",
      },
    );

  const stadiums = league === "EPL" ? eplStadiums : otherStadiums;
  const isSuccess = league === "EPL" ? isEplSuccess : isOtherSuccess;

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
