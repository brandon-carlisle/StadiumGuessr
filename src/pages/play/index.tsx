import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch } from "../../store/hooks";
import { type Team } from "@prisma/client";
import { updateTeam } from "../../store/features/game/game-slice";
import Score from "../../components/Score";

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

  function handleUpdateTeam() {
    // temp to simulate team change
    if (teams[5]) {
      dispatch(updateTeam(teams[5]));
    }
  }

  return (
    <main className="relative flex h-full flex-col">
      <div className="navbar">
        <button onClick={handleUpdateTeam} className="btn-info btn">
          Change
        </button>
      </div>
      <DynamicMap />
      <Score />
    </main>
  );
}
