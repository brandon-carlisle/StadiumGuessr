import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type Team } from "@prisma/client";
import {
  setGameOngoing,
  updateTeam,
  updateTimeRemaining,
} from "../../store/features/game/game-slice";

import { useEffect } from "react";
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
  const dispatch = useAppDispatch();
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const timeRemaining = useAppSelector((state) => state.game.timeRemaining);

  currentTeam.id;

  useEffect(() => {
    dispatch(setGameOngoing(true));
    dispatch(updateTeam(teams[0]));
  }, [dispatch, teams]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimeRemaining());
    }, 1000);

    if (timeRemaining < 1) {
      dispatch(setGameOngoing(false));
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  function handleNextTeam() {
    const currentTeamIndex = teams.findIndex(
      (team) => currentTeam.id === team.id
    );
    const nextTeamIndex = currentTeamIndex + 1;

    if (nextTeamIndex < teams.length) {
      dispatch(updateTeam(teams[nextTeamIndex]));
    } else {
      dispatch(setGameOngoing(false));
    }
  }

  return (
    <main className="relative flex h-full flex-col">
      {/* <div className="navbar justify-center">
        <button onClick={handleNextTeam} className="btn-info btn">
          Change
        </button>
      </div> */}
      <DynamicMap />
      <div className="absolute top-8 left-1/2 z-[9999] -translate-x-1/2">
        <form className="w-96">
          <input
            type="text"
            className="input-primary input input-lg w-full text-center"
            id="answer-input"
            placeholder={`Who is the team of this stadium?`}
          />
        </form>
      </div>
      <Stats />
    </main>
  );
}
