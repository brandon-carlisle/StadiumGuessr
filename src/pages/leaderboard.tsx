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
    select: {
      date: true,
      score: true,
      User: { select: { name: true } },
      id: true,
    },
  });
  const leaderboardString = superjson.stringify(allMatches);
  const leaderboard = superjson.parse(leaderboardString);

  const recentMatchFromUser = await prisma.match.findFirst({
    where: {
      userId: { equals: session.user.id },
    },

    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
      score: true,
      User: { select: { name: true } },
      id: true,
    },
  });

  console.log(recentMatchFromUser);

  return {
    props: { leaderboard, recentMatchFromUser },
  };
}

interface LeaderboardEntry {
  date: Date;
  score: number;
  User: { name: string };
  id: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  recentMatchFromUser: LeaderboardEntry;
}

export default function Leaderboard({
  leaderboard,
  recentMatchFromUser,
}: LeaderboardProps) {
  const dispatch = useAppDispatch();

  function formatDate(date: number | Date) {
    return new Intl.DateTimeFormat("en-GB").format(date);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">Leaderboard</h1>
      <div className="w-[90%] overflow-x-auto p-2 md:w-2/3">
        <table className="table-compact table w-full text-center">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.User.name}</td>
                <td>{entry.score}</td>
                <td>{formatDate(entry.date)}</td>
              </tr>
            ))}

            {recentMatchFromUser && (
              <tr className="bg-primary">
                <td className="bg-inherit">{recentMatchFromUser.User.name}</td>
                <td className="bg-inherit">{recentMatchFromUser.score}</td>
                <td className="bg-inherit">
                  {formatDate(recentMatchFromUser.date)}
                </td>
              </tr>
            )}
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
