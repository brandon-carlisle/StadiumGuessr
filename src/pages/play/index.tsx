import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const DynamicMap = dynamic(() => import("../../components/DynamicMap"), {
  ssr: false,
  loading: () => <p className="text-4xl font-semibold">Map is loading..</p>,
});

export type Team = {
  id: string;
  name: string;
  stadium: string;
  capacity: number;
  latitude: number;
  longitude: number;
};

interface Props {
  teams: Team[];
}

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

  return {
    props: { teams },
  };
}

export default function PlayPage({ teams }: Props) {
  const dispatch = useAppDispatch();
  const currentTeamId = useAppSelector((state) => state.game.currentTeamId);
  const score = useAppSelector((state) => state.game.score);

  return (
    <main className="relative flex h-full flex-col">
      <div className="navbar">
        <input
          type="text"
          className="input-primary input"
          placeholder="45000"
        />
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
