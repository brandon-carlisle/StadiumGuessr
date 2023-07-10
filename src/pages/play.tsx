import useFinishGame from "@/hooks/useFinishGame";
import useStartGame from "@/hooks/useStartGame";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { setUserHasFinishedGame } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import GameControlsOverlay from "@/components/GameControlsOverlay/GameControlsOverlay";
import GameStatsOverlay from "@/components/GameStatsOverlay/GameStatsOverlay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Leaflet needs the window object, so this needs to have dynamic
const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayPage() {
  const dispatch = useAppDispatch();
  const { timeRemaining, teamsRemaining } = useAppSelector(
    (state) => state.game,
  );

  useStartGame(teams);
  useFinishGame();

  useEffect(() => {
    if (timeRemaining === 0 || teamsRemaining === 0) {
      dispatch(setUserHasFinishedGame(true));
    }
  }, [dispatch, teamsRemaining, timeRemaining]);

  return (
    <>
      <main className="relative flex h-full flex-col">
        <DynamicMap />
        {!completedGame && <GameControlsOverlay />}
        <GameStatsOverlay />
      </main>
    </>
  );
}

// export async function getServerSideProps() {
//   const teams = await prisma.team.findMany();

//   return {
//     props: { teams },
//   };
// }
