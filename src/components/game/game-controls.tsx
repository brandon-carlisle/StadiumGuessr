import toast from "react-hot-toast";

import {
  addIncorrectStadiumId,
  decrementStadiumsRemaining,
  incrementCurrentStadium,
  resetZoom,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import AnswerInput from "./answer-input";

export default function GameControls() {
  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex w-full -translate-x-1/2 flex-col items-center justify-center gap-1 px-2 md:px-0">
      <AnswerInput />

      <div className="join">
        <SkipQuestionButton />
        <GetHintButton />
        <ResetZoomButton />
      </div>
    </div>
  );
}

function GetHintButton() {
  const { currentStadium } = useAppSelector((state) => state.game);

  const getHint = () => {
    const capitalized = currentStadium.club
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const hint = `This stadium belongs to ${capitalized}`;

    toast(hint, {
      icon: "🤫",
    });
  };

  return (
    <button
      className="btn-secondary btn-sm join-item btn md:btn-md"
      onClick={getHint}
    >
      Get hint
    </button>
  );
}

function ResetZoomButton() {
  const dispatch = useAppDispatch();

  function handleResetZoom() {
    dispatch(resetZoom());
  }

  return (
    <button
      className="btn-neutral btn-sm join-item btn md:btn-md"
      onClick={handleResetZoom}
    >
      Reset Zoom
    </button>
  );
}

function SkipQuestionButton() {
  const dispatch = useAppDispatch();
  const { stadiumsRemaining, currentStadium } = useAppSelector(
    (state) => state.game,
  );

  const handleSkip = () => {
    dispatch(addIncorrectStadiumId(currentStadium.id));
    dispatch(incrementCurrentStadium());
    dispatch(decrementStadiumsRemaining());
  };

  return (
    <>
      {stadiumsRemaining > 1 ? (
        <button
          className="btn-primary btn-sm join-item btn md:btn-md"
          onClick={handleSkip}
        >
          Skip Question
        </button>
      ) : (
        <button
          className="btn-secondary btn-sm join-item btn md:btn-md"
          onClick={handleSkip}
        >
          Finish Game
        </button>
      )}
    </>
  );
}
