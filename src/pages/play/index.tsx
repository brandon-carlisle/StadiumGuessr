import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type Team } from "@prisma/client";
import { updateTeam } from "../../store/features/game/game-slice";

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
  // Import from prisma
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const score = useAppSelector((state) => state.game.score);

  function handleUpdateTeam() {
    dispatch(updateTeam(teams[5]));
  }

  console.log(currentTeam);

  return (
    <main className="relative flex h-full flex-col">
      <div className="navbar">
        <button className="btn-primary btn" onClick={handleUpdateTeam}>
          Update team
        </button>
      </div>

      <DynamicMap />

      <div className="stats absolute bottom-5 left-1/2 z-[9999] -translate-x-1/2 shadow-lg">
        <div className="stat">
          <div className="stat-title">Current Score</div>
          <div className="stat-value text-center">{score}</div>
        </div>
      </div>
    </main>
  );
}
