import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement } from "../store/features/counter/counterSlice";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const count = useAppSelector((state) => state.counter.value);
  const dipatch = useAppDispatch();

  const handleIncrementClick = () => {
    dipatch(increment());
  };

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

            <p>Counter State: {count}</p>
            <button className="btn-primary btn" onClick={handleIncrementClick}>
              Increment
            </button>
            <button className="btn-primary btn">Decrement</button>

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

            {status === "authenticated" && data.user.image ? (
              <div className="mt-16 flex flex-col items-center gap-2">
                <p>Welcome back,</p>
                <div>
                  <Image
                    src={data.user?.image}
                    alt="Discord profile image of signed in user"
                    width={128}
                    height={128}
                    className="mb-1 h-16 w-16 rounded-full ring"
                  />
                  <p>{data.user.name}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
