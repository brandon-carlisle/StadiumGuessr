import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data, status } = useSession();

  console.log("data: ", data);
  console.log("status: ", status);

  const handleSignIn = () => {
    signIn("discord").catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    signOut().catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title>StadiumGuessr</title>
        <meta
          name="description"
          content="A football stadium guessing game - challenge your football knowledge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">StadiumGuessr</h1>
            <p className="py-6">
              StadiumGuessr is a fun game to test your football stadium
              knowledge. You will get placed at a random stadium around Europe
              and you will have to guess various facts about it.
            </p>

            <div className="flex items-center justify-center gap-4">
              {status === "loading" || status === "unauthenticated" ? (
                <button disabled className="btn-disabled btn">
                  Play now
                </button>
              ) : (
                <Link href={"/play"} className="btn-primary btn">
                  Play now
                </Link>
              )}

              {status === "loading" || status === "unauthenticated" ? (
                <button className="btn-secondary btn" onClick={handleSignIn}>
                  Login with discord
                </button>
              ) : (
                <button className="btn-warning btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
