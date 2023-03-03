import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Match, type Team } from "@prisma/client";
import { updateTeam } from "../../store/features/game/game-slice";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Stats from "../../components/Stats";
import GameControls from "../../components/GameControls";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

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

export interface MatchData {
  score: number;
  user: string | undefined;
}

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { userHasFinishedGame, score } = useAppSelector((state) => state.game);
  const { data: session } = useSession();

  useEffect(() => {
    // Refactor to start game reducer
    dispatch(updateTeam(teams[0]));
  }, [dispatch, teams]);

  // TODO:
  // When game has finished:
  // Upload score and user (match data) to db
  // Once score has been uploaded -> redirect to leaderboard page

  if (userHasFinishedGame) {
    const matchData: MatchData = {
      score,
      user: session?.user.id,
    };
  }

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
      <GameControls teams={teams} />
      <Stats />
    </main>
  );
}
