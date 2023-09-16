import Score from "./Score";
import TeamsLeft from "./TeamsLeft";
import TimeRemaining from "./TimeRemaining";

export default function GameStatsOverlay() {
  return (
    <div className="absolute bottom-10 left-1/2 z-[9999] w-3/4 -translate-x-1/2 shadow-lg lg:w-2/5">
      <div className="stats w-full shadow">
        <Score />
        <TeamsLeft />
        <TimeRemaining />
      </div>
    </div>
  );
}
