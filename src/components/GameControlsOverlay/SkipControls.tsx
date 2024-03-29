import {
  addIncorrectStadiumId,
  decrementStadiumsRemaining,
  incrementCurrentStadium,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SkipButton() {
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
