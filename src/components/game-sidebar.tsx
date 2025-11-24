import { GameInfo } from "./game-info";
import HintAndZoomControls from "./hint-zoom";
import { TeamStadiumInfo } from "./team-stadium-info";
import { GuessButton } from "./guess-button";

export default function GameSidebar() {
  return (
    <div className="md:w-1/3 space-y-4">
      <TeamStadiumInfo />
      <GameInfo />
      <GuessButton />
      <HintAndZoomControls />
    </div>
  );
}

