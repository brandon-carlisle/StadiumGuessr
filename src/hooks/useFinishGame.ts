import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ResponseData } from "pages/api/upload-match";
import { useEffect } from "react";

import { useAppSelector } from "@store/hooks";

export interface MatchData {
  score: number;
  user: string | undefined;
}

export default function useFinishGame() {
  const { data: session } = useSession();
  const router = useRouter();

  const { userHasFinishedGame, score } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (!session && userHasFinishedGame) {
      void router.push("/leaderboard");
    }

    if (session && userHasFinishedGame) {
      const match: MatchData = {
        score,
        user: session?.user.id,
      };

      void (async () => {
        const { status } = await uploadMatch(match);
        if (status === "completed") void router.push("/leaderboard");
        else void router.push("/");
      })();
    }
  }, [router, score, session, userHasFinishedGame]);

  return {
    completedGame: userHasFinishedGame,
  };
}

async function uploadMatch(match: MatchData) {
  const res = await fetch("/api/upload-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!res.ok) throw new Error("Could not create match");

  // TODO find better way to type this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: ResponseData = await res.json();

  return { status: data.message };
}
