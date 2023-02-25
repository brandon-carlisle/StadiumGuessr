import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type Team } from "@prisma/client";
import { updateTeam } from "../../store/features/game/game-slice";

import { useEffect } from "react";
import Stats from "../../components/Stats";
import GameControls from "../../components/GameControls";
import { useRouter } from "next/navigation";

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import("../../components/DynamicMap"), {
  ssr: false,
  loading: () => <p className="text-4xl font-semibold">Map is loading..</p>,
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const teams = await prisma.team.findMany();
  console.log("⚽ Some team info here: ", teams[1]);

  return {
    props: { teams },
  };
}

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { userHasFinishedGame } = useAppSelector((state) => state.game);

  const router = useRouter();

  useEffect(() => {
    // Refactor to start game reducer
    dispatch(updateTeam(teams[0]));
  }, [dispatch, teams]);

  // TODO: If timer ran out or questions ran out, redirect to 'finished' page
  if (userHasFinishedGame) {
    router.push("/finish");
  }

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
      <GameControls teams={teams} />
      <Stats />
    </main>
  );
}

// TODO: Add head and meta tags
