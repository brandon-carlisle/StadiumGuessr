import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { timerActions } from "@/store/features//timer/timer-slice";

export default function useTimer() {
  const dispatch = useAppDispatch();
  const { timeRemaining, isRunning } = useAppSelector((state) => state.timer);

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
  }, [isRunning, dispatch, timeRemaining]);

  const startTimer = () => dispatch(timerActions.start());
  const stopTimer = () => dispatch(timerActions.stop());
  const resetTimer = () => dispatch(timerActions.reset());

  return { timeRemaining, isRunning, startTimer, stopTimer, resetTimer };
}
