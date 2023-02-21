import { useAppSelector } from "../store/hooks";

export default function TeamsLeft() {
  const teams = useAppSelector((state) => state.game.teamsLeft);

  return (
    <div className="stat">
      <div className="stat-title">Teams Left</div>
      <div className="stat-value text-center">{teams}</div>
    </div>
  );
}
