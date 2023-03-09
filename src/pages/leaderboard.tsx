import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";
import { prisma } from "../server/db";
import { resetGame } from "../store/features/game/game-slice";
import { useAppDispatch } from "../store/hooks";

interface LeaderboardEntry {
  score: number;
  user: string;
  date: string;
}
type Leaderboard = LeaderboardEntry[];

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

  const matches = await prisma.match.findMany({ take: 10 });

  console.log(matches);

  const FAKE_LEADERBOARD: Leaderboard = [
    {
      score: 20,
      user: "beanz",
      date: "09/03/23",
    },
  ];

  return {
    props: { FAKE_LEADERBOARD },
  };
}

export default function Leaderboard() {
  const dispatch = useAppDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <div className="w-[90%] overflow-x-auto p-2 md:w-2/3">
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Perez</td>
              <td>65</td>
              <td>05/02/23</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Halogenix</td>
              <td>55</td>
              <td>09/03/23</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TODO Check if this resets state */}
      <button onClick={() => dispatch(resetGame())}>
        <Link className="btn-primary btn" href={"/play"}>
          Play again
        </Link>
      </button>
    </main>
  );
}
