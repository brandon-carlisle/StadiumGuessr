import useGame from "@/hooks/useGame";
import { type LeagueCodeOpts } from "@/types/types";

import GameControls from "./game-controls";
import GameFinishedOverlay from "./game-finished-overlay";
import GameInfo from "./game-info";

interface Props {
  leagueCode: LeagueCodeOpts;
}

export default function Game({ leagueCode }: Props) {
  const { userHasFinishedGame } = useGame({
    leagueCode,
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
