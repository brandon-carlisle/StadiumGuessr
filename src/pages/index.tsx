import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { resetGame } from '@store/features/game/game-slice';
import { useAppDispatch } from '@store/hooks';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  // Reset game state whenever user goes to homepage
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
            <WelcomeHeader />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={'/play'} className="btn-primary btn">
                {session ? 'Play now' : 'Play as guest'}
              </Link>

              <Link href={'/leaderboard'} className="btn-accent btn">
                Leaderboard
              </Link>
              <button className="btn-secondary btn" onClick={handleModal}>
                How to play
              </button>

              {session ? (
                <button
                  className="btn-warning btn"
                  onClick={() => void signOut()}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  className="btn-warning btn"
                  onClick={() => void signIn('discord')}
                >
                  Sign in
                </button>
              )}
            </div>

            {session && session.user.image ? (
              <div className="mt-16 flex flex-col items-center gap-2">
                <p>Welcome back,</p>
                <div>
                  <Image
                    src={session.user.image}
                    alt="Discord profile image of signed in user"
                    width={128}
                    height={128}
                    className="mb-1 h-16 w-16 rounded-full ring"
                  />
                  <p>{session.user.name}</p>
                </div>
              </div>
            ) : null}
            {modalOpen && (
              <>
                <div className="modal modal-open">
                  <div className="modal-box relative">
                    <label
                      className="btn-sm btn-circle btn absolute right-2 top-2"
                      onClick={handleModal}
                    >
                      ✕
                    </label>
                    <h3 className="mb-4 text-lg font-bold">How to play</h3>
                    <ol className="flex list-decimal flex-col gap-3 px-4 text-left">
                      <li>Try to answer each question for every stadium</li>
                      <li>You can skip any questions you dont know</li>
                      <li>You must sign in to save your scores</li>
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

function WelcomeHeader() {
  return (
    <header>
      <h1 className="text-3xl font-bold md:text-5xl">StadiumGuessr</h1>
      <p className="py-6">
        StadiumGuessr is a game to test your football stadium knowledge. You
        will get placed at a random stadium around Europe and you will have to
        guess various facts about it.
      </p>
    </header>
  );
}
