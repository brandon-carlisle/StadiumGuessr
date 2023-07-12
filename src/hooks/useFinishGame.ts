import { useEffect } from "react";

import { setUserHasFinishedGame } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useFinishGame() {
  const dispatch = useAppDispatch();

  const { timeRemaining, stadiumsRemaining } = useAppSelector(
    (state) => state.game,
  );

  useEffect(() => {
    if (timeRemaining === 0 || stadiumsRemaining === 0) {
      dispatch(setUserHasFinishedGame(true));
    }
  }, [dispatch, stadiumsRemaining, timeRemaining]);

  return;
}
