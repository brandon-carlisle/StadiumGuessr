import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";

export default function useFinishGame() {
  const { data: session } = useSession();
  const router = useRouter();

  const { userHasFinishedGame, score } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (!session && userHasFinishedGame) {
      console.log("User does NOT have session, and completed game");
    }

    if (session && userHasFinishedGame) {
      console.log("User HAS session, and completed game");
    }
  }, [router, score, session, userHasFinishedGame]);

  return {
    completedGame: userHasFinishedGame,
  };
}
