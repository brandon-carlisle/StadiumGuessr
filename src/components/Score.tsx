import { useAppSelector } from "../store/hooks";

export default function Score() {
  const score = useAppSelector((state) => state.game.score);

  return (
    <div className="stat">
      <div className="stat-title">Current Score</div>
      <div className="stat-value text-center">{score}</div>
    </div>
  );
}
