import { useAppSelector } from "@/store/hooks";

export default function TeamsLeft() {
  const { stadiumsRemaining } = useAppSelector((state) => state.game);

  return (
    <div className="stat">
      <div className="stat-title">🏟️ Stadiums</div>
      <div className="stat-value text-center text-2xl md:text-4xl">
        {stadiumsRemaining}
      </div>
    </div>
  );
}
