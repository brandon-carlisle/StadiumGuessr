import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const baseGuessTimePerTeam = 5; // seconds per team

export function Timer() {
  const dispatch = useAppDispatch();
  const { league, status } = useAppSelector((state) => state.game);

  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const initialTimeRemaining = baseGuessTimePerTeam * league.teams.length;
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setTimeRemaining(initialTimeRemaining);
  }, [league, baseGuessTimePerTeam]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (status === "PLAYING" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (status === "PLAYING" && timeRemaining === 0) {
      dispatch(gameActions.setGameStatus("COMPLETE"));
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, dispatch, status]);

  return <>{status === "IDLE" ? " " : timeRemaining}</>;
}
