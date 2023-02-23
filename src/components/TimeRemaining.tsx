import { useEffect } from "react";
import {
  setGameOngoing,
  updateTimeRemaining,
} from "../store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function TimeRemaining() {
  const time = useAppSelector((state) => state.game.timeRemaining);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimeRemaining());
    }, 1000);

    if (time < 1) {
      dispatch(setGameOngoing(false));
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  return (
    <div className="stat">
      <div className="stat-title">Time Remaining</div>
      <div className="stat-value text-center">{time}</div>
    </div>
  );
}
