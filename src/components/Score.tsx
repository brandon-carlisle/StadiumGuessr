import { useAppSelector } from "../store/hooks";

export default function Score() {
  const score = useAppSelector((state) => state.game.score);

  return (
    <div className="stats absolute bottom-5 left-1/2 z-[9999] -translate-x-1/2 shadow-lg">
      <div className="stat">
        <div className="stat-title">Current Score</div>
        <div className="stat-value text-center">{score}</div>
      </div>
    </div>
  );
}
