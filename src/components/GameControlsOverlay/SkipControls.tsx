import {
  decrementStadiumsRemaining,
  incrementCurrentStadium,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SkipControls() {
  const dispatch = useAppDispatch();
  const { stadiumsRemaining } = useAppSelector((state) => state.game);

  const handleSkip = () => {
    dispatch(incrementCurrentStadium());
    dispatch(decrementStadiumsRemaining());
  };

  return (
    <>
      {stadiumsRemaining > 1 ? (
        <button
          className="btn-primary btn-sm btn md:btn-md"
          onClick={handleSkip}
        >
          Skip Question
        </button>
      ) : (
        <button
          className="btn-secondary btn-sm btn md:btn-md"
          onClick={handleSkip}
        >
          Finish Game
        </button>
      )}
    </>
  );
}
