import useTimer from "@/hooks/useTimer";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export function GameInfo() {
  const score = useAppSelector((state) => state.game.score);
  const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);

  return (
    <div className="card card-normal border bg-primary">
      <div className="card-body">
        <div className="flex justify-evenly md:flex-col gap-3">
          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Score</div>
            <div className="stat-value text-5xl text-primary-content">
              {score}
            </div>
          </div>

          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Teams Left</div>
            <div className="stat-value text-5xl text-primary-content">
              {teamsRemaining}
            </div>
          </div>

          <div className="pb-4">
            <div className="uppercase text-xs font-semibold">Time</div>
            <div className="stat-value text-5xl text-primary-content">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Timer() {
  const { timeRemaining, startTimer, stopTimer, resetTimer } = useTimer();

  const dispatch = useAppDispatch();

  if (timeRemaining === 0) {
    stopTimer();
    dispatch(gameActions.setGameStatus("COMPLETE"));
  }

  useEffect(() => {
    startTimer();

    return () => {
      resetTimer();
    };
  }, []);

  return <>{timeRemaining}</>;
}
