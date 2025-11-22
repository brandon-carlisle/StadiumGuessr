import GameSidebar from "@/components/game-sidebar";
import GuessInputBar from "@/components/guess-input-bar";
import MapWithSideLayout from "./map-with-side";

export default function GameLayout() {
  return (
    <div className="min-h-dvh flex flex-col p-4 bg-background text-foreground">
      <MapWithSideLayout sideContent={GameSidebar()} />
      <GuessInputBar />
    </div>
  );
}

