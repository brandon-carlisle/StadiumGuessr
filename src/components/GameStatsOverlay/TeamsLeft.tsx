import { useAppSelector } from "@store/hooks";

export default function TeamsLeft() {
  const { teamsRemaining } = useAppSelector((state) => state.game);

  return (
    <div className="stat">
      <div className="stat-title">Teams Left</div>
      <div className="stat-value text-center">{teamsRemaining}</div>
    </div>
  );
}