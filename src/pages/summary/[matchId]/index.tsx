import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import superjson from "superjson";

import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MatchSummaryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { data: match, isLoading } = api.match.getById.useQuery({
    matchId: props.matchId,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!match) return <p>Could not find that match...</p>;

  return <p>This is a summary page for match: {match.id}</p>;
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
