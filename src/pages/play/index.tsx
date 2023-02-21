import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type Team } from "@prisma/client";
import { updateTeam } from "../../store/features/game/game-slice";
import Score from "../../components/Score";
import { useEffect, useState } from "react";
import Stats from "../../components/Stats";

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
  const [rounds, setRounds] = useState<Team[]>();
  const teamsLeft = useAppSelector((state) => state.game.teamsLeft);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setRounds(teams);
  }, [teams]);

  function handleUpdateTeam() {
    // temp to simulate team change
    if (teams[5]) {
      dispatch(updateTeam(teams[5]));
    }
  }

  return (
    <main className="relative flex h-full flex-col">
      <div className="navbar justify-between">
        <button onClick={handleUpdateTeam} className="btn-info btn">
          Change
        </button>
        {teamsLeft ? (
          <div className="text-info">{teamsLeft} stadiums remaining</div>
        ) : (
          <div className="text-info">No stadiums remaining</div>
        )}
      </div>
      <DynamicMap />
      <Stats />
    </main>
  );
}
