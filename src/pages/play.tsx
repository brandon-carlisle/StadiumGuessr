import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../server/db";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { type Team } from "@prisma/client";
import { updateTeam } from "../store/features/game/game-slice";
import { useEffect, useMemo } from "react";
import Stats from "../components/Stats";
import GameControls from "../components/GameControls";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type ResponseData } from "./api/upload-match";

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import("../components/DynamicMap"), {
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

function shuffleTeams(input: Team[]) {
  return input
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { userHasFinishedGame, score } = useAppSelector((state) => state.game);
  const { data: session } = useSession();
  const router = useRouter();

  const shuffledTeams = useMemo(() => shuffleTeams(teams), [teams]);

  useEffect(() => {
    // TODO Refactor to start game reducer
    dispatch(updateTeam(shuffledTeams[0]));
  }, [dispatch, shuffledTeams]);

  useEffect(() => {
    if (userHasFinishedGame) {
      const match: MatchData = {
        score,
        user: session?.user.id,
      };

      async function uploadMatch() {
        const res = await fetch("/api/upload-match", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(match),
        });

        if (!res.ok) throw new Error("Could not create match");

        // TODO find better way to type this
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: ResponseData = await res.json();

        if (data.message === "completed") {
          await router.push("/leaderboard");
        } else {
          await router.push("/");
        }
      }

      try {
        void uploadMatch();
      } catch (error) {
        console.error(error);
      }
    }
  }, [router, score, session?.user.id, userHasFinishedGame]);

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
      {!userHasFinishedGame && <GameControls teams={shuffledTeams} />}
      <Stats />
    </main>
  );
}
