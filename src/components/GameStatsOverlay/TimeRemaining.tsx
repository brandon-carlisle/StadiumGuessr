import "@store/features/game/game-slice";
import { useAppSelector } from "@store/hooks";

export default function TimeRemaining() {
  const time = useAppSelector((state) => state.game.timeRemaining);

  return (
    <div className="stat">
      <div className="stat-title">Time Remaining</div>
      <div className="stat-value text-center">{time}</div>
    </div>
  );
}
