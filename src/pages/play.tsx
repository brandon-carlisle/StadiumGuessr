import useFinishGame from "@/hooks/useFinishGame";
import useStartGame from "@/hooks/useStartGame";
import dynamic from "next/dynamic";
import Head from "next/head";

import { useAppSelector } from "@/store/hooks";

import GameCompleteOverlay from "@/components/GameCompleteOverlay/GameCompleteOverlay";
import GameControlsOverlay from "@/components/GameControlsOverlay/GameControlsOverlay";
import GameStatsOverlay from "@/components/Stats/GameStatsOverlay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Leaflet needs the window object, so this needs to have dynamic
const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function PlayPage() {
  const { userHasFinishedGame } = useAppSelector((state) => state.game);

  useStartGame();
  useFinishGame();

  return (
    <>
      <Head>
        <title>Play / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-dvh relative flex flex-col">
        <DynamicMap />

        {!userHasFinishedGame ? (
          <>
            <GameControlsOverlay />
            <GameStatsOverlay />
          </>
        ) : (
          <GameCompleteOverlay />
        )}
      </main>
    </>
  );
}
