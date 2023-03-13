import Head from "next/head";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { resetGame } from "../store/features/game/game-slice";
import { getServerAuthSession } from "../server/auth";
import type { GetServerSidePropsContext } from "next";
import type { User } from "@prisma/client";

interface HomeProps {
  auth: {
    user: User;
    expires: string;
  };
}

function Home({ auth }: HomeProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // const { data: session, status } = useSession();

  const authenticated = !!auth?.user;

  const handleSignIn = () => {
    signIn("discord").catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    signOut().catch((err) => console.error(err));
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const handleModal = () => {
    setModalOpen((prev) => !prev);
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
            <h1 className="text-3xl font-bold md:text-5xl">StadiumGuessr</h1>
            <p className="py-6">
              StadiumGuessr is a fun game to test your football stadium
              knowledge. You will get placed at a random stadium around Europe
              and you will have to guess various facts about it.
            </p>
            {!authenticated && (
              <div className="flex items-center justify-center gap-4">
                <button disabled className="btn-disabled btn">
                  Play now
                </button>
                <button className="btn btn-secondary" onClick={handleSignIn}>
                  Login with discord
                </button>
              </div>
            )}
            {authenticated && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href={"/play"} className="btn btn-primary">
                  Play now
                </Link>

                <Link href={"/leaderboard"} className="btn btn-accent">
                  Leaderboard
                </Link>
                <button className="btn btn-secondary" onClick={handleModal}>
                  How to play
                </button>
                <button className="btn btn-warning" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
            {authenticated && auth.user.image ? (
              <div className="mt-16 flex flex-col items-center gap-2">
                <p>Welcome back,</p>
                <div>
                  <Image
                    src={auth.user.image}
                    alt="Discord profile image of signed in user"
                    width={128}
                    height={128}
                    className="mb-1 h-16 w-16 rounded-full ring"
                  />
                  <p>{auth.user.name}</p>
                </div>
              </div>
            ) : null}

            {modalOpen && (
              <>
                <div className="modal modal-open">
                  <div className="modal-box relative">
                    <label
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                      onClick={handleModal}
                    >
                      ✕
                    </label>
                    <h3 className="mb-4 text-lg font-bold">How to play</h3>
                    <ol className="flex list-decimal flex-col gap-3 px-4 text-left">
                      <li>Try to answer each question for every stadium</li>
                      <li>You can skip any questions you dont know</li>
                      <li>
                        When guessing the stadium capacity - you only get one
                        chance, and will be scored on how close you get to the
                        correct answer
                      </li>
                    </ol>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  return {
    props: { auth: session },
  };
}
