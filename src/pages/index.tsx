import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { resetGame } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

import AuthButton from "@/components/ui/AuthButton";

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

      <main className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <WelcomeHeader />

            <div className="flex w-full flex-col border-opacity-50">
              <div className="mb-6 flex flex-col text-center">
                <Link href={"/play"} className="btn-primary btn">
                  {session ? "Play now" : "Play as guest"}
                </Link>
              </div>
              <div className="divider">
                {!session ? "Sign in to see previous scores" : "Sign out"}
              </div>
              <AuthButton />
            </div>

            {session && session.user.image ? (
              <div className="mt-16 flex flex-col items-center gap-3">
                <p>Welcome back,</p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Link
                    href={`/user/${session.user.id}`}
                    className="flex flex-col items-center justify-center"
                  >
                    <Image
                      src={session.user.image}
                      alt="Profile image of signed in user"
                      width={128}
                      height={128}
                      className="mb-1 h-16 w-16 rounded-full ring"
                    />
                    <p>{session.user.name}</p>
                  </Link>
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
                      <li>
                        If you want to see your previous scores, you must sign
                        in
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

function WelcomeHeader() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold text-primary md:text-6xl">
        StadiumGuessr
      </h1>
      <p className="py-6">
        Explore a map and find yourself at a random football stadium. Your
        challenge is to correctly guess the name of the stadium. How many can
        you identify?
      </p>
    </header>
  );
}
