import { useAppSelector } from "@/store/hooks";

export default function Score() {
  const score = useAppSelector((state) => state.game.score);

  return (
    <div className="stat">
      <div className="stat-title">⚽️ Score</div>
      <div className="stat-value text-center text-2xl md:text-4xl">{score}</div>
    </div>
  );
}
