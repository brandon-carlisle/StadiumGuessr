import {
  decrementTeamsRemaining,
  incrementCurrentTeam,
} from "@store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function SkipControls() {
  const dispatch = useAppDispatch();
  const { teamsRemaining } = useAppSelector((state) => state.game);

  const handleSkip = () => {
    dispatch(incrementCurrentTeam());
    dispatch(decrementTeamsRemaining());
  };

  return (
    <>
      {teamsRemaining > 1 ? (
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
