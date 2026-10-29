import GameSidebar from "@/components/game-sidebar";
import { GuessResultPopup } from "@/components/guess-result-popup";
import MapWithSideLayout from "./map-with-side";

export default function GameLayout() {
	return (
		<div className="min-h-dvh md:h-dvh flex flex-col p-4 bg-background text-foreground">
			<MapWithSideLayout sideContent={GameSidebar()} />
			<GuessResultPopup />
		</div>
	);
}
