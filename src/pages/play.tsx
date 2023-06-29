import { type Team } from "@prisma/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

import { prisma } from "@server/db";

import { setUserHasFinishedGame } from "@store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import GameControls from "@components/GameControls/GameControls";
import Stats from "@components/GameStatsOverlay/GameStatsOverlay";
import Loading from "@components/ui/Loading";

import useFinishGame from "@hooks/useFinishGame";
import useStartGame from "@hooks/useStartGame";

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import("../components/Map/DynamicMap"), {
  ssr: false,
  loading: () => <Loading />,
});

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { timeRemaining, teamsRemaining } = useAppSelector(
    (state) => state.game,
  );

  useStartGame(teams);
  const { completedGame } = useFinishGame();

  useEffect(() => {
    if (timeRemaining === 0 || teamsRemaining === 0) {
      dispatch(setUserHasFinishedGame(true));
    }
  }, [dispatch, teamsRemaining, timeRemaining]);

  return (
    <>
      <Head>
        <title>StadiumGuessr / Play</title>
      </Head>
      <main className="relative flex h-full flex-col">
        <DynamicMap />
        {!completedGame && <GameControls />}
        <Stats />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const teams = await prisma.team.findMany();

  return {
    props: { teams },
  };
}
