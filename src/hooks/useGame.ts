import { useEffect } from "react";

import { api } from "@/utils/api";
import { shuffleStadiumArray } from "@/utils/shuffle-stadiums";

import {
  decrementTimeRemaining,
  setCurrentStadium,
  setStadiums,
  setStadiumsRemaining,
  setUserHasFinishedGame,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";


type LeagueCodeOpts = "EPL" | "EFL_CHAMPIONSHIP"

export default function useGame({ league }: { league: LeagueCodeOpts }) {
  const dispatch = useAppDispatch();

  // Query for specfifc league
  const { data: eplStadiums, isSuccess: isEplSuccess } =
    api.localStadium.getByLeague.useQuery({ leagueCode: league }, {
      enabled: league === "EPL",
    });

  // Query for other leagues or random
  const { data: otherStadiums, isSuccess: isOtherSuccess } =
    api.localStadium.getByLeague.useQuery(
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
