import type { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

import StatsSummary from "@/components/Stats/StatsSummmary";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Unauthorised from "@/components/ui/Unauthorised";

export default function UserPage({
  userId,
}: InferGetServerSidePropsType<typeof getStaticPaths>) {
  const { data: session, status: sessionStatus } = useSession();
  const { data: matches, isLoading } = api.match.getAllByUserId.useQuery();

  if (sessionStatus === "loading")
    return (
      <div className="grid h-screen w-screen place-items-center">
        <LoadingSpinner />
      </div>
    );

  if (!session || session.user.id !== userId) return <Unauthorised />;

  return (
    <>
      <Head>
        <title>Your scores / StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-3 flex flex-col justify-between gap-5 py-8 px-10">
        <h1 className="text-2xl font-semibold md:text-4xl">Your scores</h1>
        <div className="flex justify-start gap-3">
          <Link href={"/play"} className="btn-primary btn-md btn">
            Play
          </Link>
          <Link href={"/"} className="btn-neutral btn-md btn">
            Home
          </Link>
        </div>
      </header>

      <main className="px-8 pb-8">
        <section>
          {isLoading && <LoadingSpinner />}

          <ul className="grid grid-cols-2 place-items-center gap-5 md:grid-cols-1">
            {!matches || !matches.length ? (
              <p>No matches found...</p>
            ) : (
              matches.map((match) => (
                <li key={match.id}>
                  <StatsSummary match={match} href={`/summary/${match.id}`} />
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticProps(
  context: GetStaticPropsContext<{ userId: string }>,
) {
  const userId = context.params?.userId as string;

  return {
    props: {
      userId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
