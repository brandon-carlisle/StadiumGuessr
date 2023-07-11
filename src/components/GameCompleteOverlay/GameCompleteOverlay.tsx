import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import { useAppSelector } from "@/store/hooks";

import LoadingButton from "../ui/LoadingButton";

export default function GameCompleteOverlay() {
  const router = useRouter();
  const { data: session } = useSession();

  const { game } = useAppSelector((state) => state);

  const { mutate, isLoading, isSuccess } = api.match.create.useMutation();

  const handlePlayAgain = () => {
    if (!session) {
      return router.reload();
    }

    mutate(
      {
        score: game.score,
        timeRemaining: game.timeRemaining,
        stadiumsRemaining: game.stadiumsRemaining,
        correctStadiumIds: game.correctStadiumIds,
        incorrectStadiumIds: game.incorrectStadiumIds,
      },
      {
        onSuccess() {
          router.reload();
        },
      },
    );
  };

  const handleViewSummary = () => {
    mutate(
      {
        score: game.score,
        timeRemaining: game.timeRemaining,
        stadiumsRemaining: game.stadiumsRemaining,
        correctStadiumIds: game.correctStadiumIds,
        incorrectStadiumIds: game.incorrectStadiumIds,
      },
      {
        onSuccess(data) {
          void router.push(`/summary/${data.matchId}`);
        },
      },
    );
  };

  return (
    <div className="absolute top-1/2 left-1/2 z-[9999] flex -translate-x-1/2 -translate-y-1/2 gap-1 px-2 md:px-0">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">You finished!</h2>
          <div className="stat-value">{game.score} points 🎮</div>
          <div className="mt-4 flex gap-3">
            {session ? (
              <>
                {!isLoading || !isSuccess ? (
                  <button
                    className="btn-primary btn"
                    onClick={handleViewSummary}
                  >
                    View summary
                  </button>
                ) : (
                  <LoadingButton />
                )}
                {!isLoading || !isSuccess ? (
                  <button className="btn-neutral btn" onClick={handlePlayAgain}>
                    Play again
                  </button>
                ) : (
                  <LoadingButton />
                )}
              </>
            ) : (
              <>
                <button
                  className="btn-primary btn-wide btn"
                  onClick={handlePlayAgain}
                >
                  Play again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
