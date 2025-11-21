import { GameInfo } from "./game-info";
import HintAndZoomControls from "./hint-zoom";

export default function GameSidebar() {
  return (
    <div className="md:w-1/3 space-y-4">
      <GameInfo />
      <HintAndZoomControls />
    </div>
  );
}

