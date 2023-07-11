import useFinishGame from "@/hooks/useFinishGame";
import useStartGame from "@/hooks/useStartGame";
import dynamic from "next/dynamic";

import GameControlsOverlay from "@/components/GameControlsOverlay/GameControlsOverlay";
import GameStatsOverlay from "@/components/GameStatsOverlay/GameStatsOverlay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Leaflet needs the window object, so this needs to have dynamic
const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayPage() {
  useStartGame();
  useFinishGame();

  return (
    <>
      <main className="relative flex h-full flex-col">
        <DynamicMap />
        <GameControlsOverlay />
        <GameStatsOverlay />
      </main>
    </>
  );
}
