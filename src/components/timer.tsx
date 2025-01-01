import { gameActions } from "@/store/features/game/game-slice";
import { timerActions } from "@/store/features/timer/timer-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export function Timer() {
  const dispatch = useAppDispatch();
  const { isRunning, timeRemaining } = useAppSelector((state) => state.timer);

  useEffect(() => {
    dispatch(timerActions.start());
    return () => {
      dispatch(timerActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        dispatch(timerActions.decrementTime());
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeRemaining, dispatch]);

  useEffect(() => {
    if (timeRemaining === 0) {
      dispatch(timerActions.stop());
      dispatch(gameActions.setGameStatus("COMPLETE"));
    }
  }, [timeRemaining, dispatch]);

  return <>{timeRemaining}</>;
}
