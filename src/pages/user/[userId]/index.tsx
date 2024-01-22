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

  console.log(matches);

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

      <header className="mb-3 flex justify-between p-8">
        <h1 className="text-2xl font-semibold text-primary-content md:text-4xl">
          Your scores
        </h1>
        <Link href={"/"} className="btn-md btn">
          Go home
        </Link>
      </header>

      <main className="px-8">
        <section>
          {isLoading && <LoadingSpinner />}

          <div className="flex h-[70vh] flex-col gap-3 overflow-y-auto">
            {!matches || !matches.length ? (
              <p>No matches found...</p>
            ) : (
              matches.map((match) => (
                <Link
                  key={match.id}
                  href={`/summary/${match.id}`}
                  className="transition hover:translate-y-[0.05rem] active:translate-y-1"
                >
                  <StatsSummary match={match} />
                </Link>
              ))
            )}
          </div>
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
