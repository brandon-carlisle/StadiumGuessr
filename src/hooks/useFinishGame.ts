import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { setUserHasFinishedGame } from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useFinishGame() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userHasFinishedGame, score, timeRemaining, stadiumsRemaining } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    if (timeRemaining === 0 || stadiumsRemaining === 0) {
      dispatch(setUserHasFinishedGame(true));
    }
  }, [dispatch, stadiumsRemaining, timeRemaining]);

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
