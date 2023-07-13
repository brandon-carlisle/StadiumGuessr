import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import superjson from "superjson";

import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";

import { resetGame } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

import AnswersOverview from "@/components/Stats/AnswersOverview";
import StatsSummary from "@/components/Stats/StatsSummmary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MatchSummaryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const dispatch = useAppDispatch();

  // Reset game state whenever user goes to homepage
  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const { data: match, isLoading } = api.match.getById.useQuery({
    matchId: props.matchId,
  });

  if (isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingSpinner />
      </div>
    );

  if (!match)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <div className="flex flex-col gap-3">
          <p>Could not find that match...</p>
          <Link href={"/"} className="btn">
            Go Home
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Head>
        <title>Summary / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-3 flex flex-col justify-between gap-5 py-8 px-10">
        <h1 className="text-2xl font-semibold md:text-4xl">Match Summary</h1>
        <div className="flex justify-start gap-3">
          <Link href={"/play"} className="btn-primary btn-neutral btn-md btn">
            Play again
          </Link>
          <Link href={"/"} className="btn-neutral btn-md btn">
            Home
          </Link>
        </div>
      </header>
      <main className="flex flex-col justify-center gap-10 p-10">
        <StatsSummary match={match} />
        <AnswersOverview
          correctStadiums={match.correctStadiums}
          incorrectStadiums={match.incorrectStadiums}
        />
      </main>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ matchId: string }>,
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma,
    },
    transformer: superjson, // optional - adds superjson serialization
  });
  const matchId = context.params?.matchId as string;

  // prefetch `bracket.getById`
  await helpers.match.getById.prefetch({ matchId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      matchId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
