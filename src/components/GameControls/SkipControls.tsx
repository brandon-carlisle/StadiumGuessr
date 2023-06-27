import {
  decrementTeamsRemaining,
  incrementCurrentTeam,
} from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

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
        <button className="btn-primary btn" onClick={handleSkip}>
          Skip Question
        </button>
      ) : (
        <button className="btn-secondary btn" onClick={handleSkip}>
          Finish Game
        </button>
      )}
    </>
  );
}
