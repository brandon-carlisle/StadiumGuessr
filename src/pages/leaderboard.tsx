import type { Match } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";
import { prisma } from "../server/db";
import { resetGame } from "../store/features/game/game-slice";
import { useAppDispatch } from "../store/hooks";
import superjson from "superjson";

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

  const allMatches = await prisma.match.findMany({
    orderBy: {
      score: "desc",
    },
    take: 10,
    select: { date: true, score: true, User: { select: { name: true } } },
  });

  console.log(allMatches);

  // const recentMatchFromUser = await prisma.match.findMany({
  //   where: {
  //     userId: { equals: session.user.id },
  //   },

  //   orderBy: {
  //     date: "desc",
  //   },
  // });

  const leaderboard = superjson.stringify(allMatches);

  // console.log(leaderboard);

  return {
    props: { leaderboard },
  };
}

interface LeaderboardProps {
  allMatches: Match[];
}

export default function Leaderboard({ allMatches }: LeaderboardProps) {
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
