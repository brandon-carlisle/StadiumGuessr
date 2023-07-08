import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// import { api } from "@/utils/api";
import { resetGame } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

import AuthButton from "@/components/ui/AuthButton";

// import { useAppDispatch } from "@store/hooks";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  // const { data } = api.example.get.useQuery({ name: "Brandon" });
  // const { data } = api.example.getRole.useQuery();

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

            <div className="flex flex-col text-center">
              <Link
                href={"/play"}
                className="btn-primary btn-sm btn mb-4 md:btn-md"
              >
                {session ? "Play now" : "Play as guest"}
              </Link>

              <AuthButton />
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
                <div className="modal-open modal">
                  <div className="modal-box relative">
                    <label
                      className="btn-sm btn-circle btn absolute right-2 top-2"
                      onClick={handleModal}
                    >
                      ✕
                    </label>
                    <h3 className="mb-4 text-lg font-bold">How to play</h3>
                    <ol className="flex list-decimal flex-col gap-3 px-4 text-left">
                      <li>
                        Use the map to look around and figure out where you are
                      </li>
                      <li>Enter your guess or skip if you do not know</li>
                      <li>If you want scores to save, you must sign in</li>
                    </ol>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 flex w-full  -translate-x-1/2 items-center justify-center py-4">
        <p className="font-mono">
          Made by{" "}
          <a
            href="https://www.carlisle.dev/"
            className="link-accent link"
            target="_blank"
            rel="noreferrer"
          >
            Brandon
          </a>
        </p>

        <button onClick={handleModal} className="btn absolute right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </footer>
    </>
  );
}

function WelcomeHeader() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-primary-content md:text-6xl">
        StadiumGuessr
      </h1>
      <p className="py-6">
        Explore a map and find yourself at a random football stadium. Your
        challenge is to guess the correct name of the stadium. How many can you
        identify?
      </p>
    </header>
  );
}
