import { useAppSelector } from "@store/hooks";

export default function TeamsLeft() {
  const { teamsRemaining } = useAppSelector((state) => state.game);

  return (
    <div className="stat">
      <div className="stat-title">🏟️ Teams</div>
      <div className="stat-value text-center text-2xl md:text-4xl">
        {teamsRemaining}
      </div>
    </div>
  );
}
