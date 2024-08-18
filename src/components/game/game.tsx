import useGame from "@/hooks/useGame";

import type { LeagueOption } from "@/utils/types";

import GameControls from "./game-controls";
import GameFinishedOverlay from "./game-finished-overlay";
import GameInfo from "./game-info";

export default function Game({ league }: { league: LeagueOption }) {
  const { userHasFinishedGame } = useGame({
    league,
  });

  return (
    <>
      {!userHasFinishedGame ? (
        <>
          <GameControls />
          <GameInfo />
        </>
      ) : (
        <GameFinishedOverlay />
      )}
    </>
  );
}
