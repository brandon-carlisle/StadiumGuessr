import "@store/features/game/game-slice";
import { useAppSelector } from "@store/hooks";

export default function TimeRemaining() {
  const time = useAppSelector((state) => state.game.timeRemaining);

  return (
    <div className="stat">
      <div className="stat-title">⏱️ Time(s)</div>
      <div className="stat-value text-center text-2xl md:text-4xl">{time}</div>
    </div>
  );
}
