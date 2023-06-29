import Score from "./Score";
import TeamsLeft from "./TeamsLeft";
import TimeRemaining from "./TimeRemaining";

export default function GameStatsOverlay() {
  return (
    <div className="stats absolute bottom-5 left-1/2 z-[9999] -translate-x-1/2 shadow-lg">
      <Score />
      <TeamsLeft />
      <TimeRemaining />
    </div>
  );
}
