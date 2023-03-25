import { updateUserHasFinishedGame } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export default function TeamsLeft() {
  const teams = useAppSelector((state) => state.game.teamsLeft);
  const dispatch = useAppDispatch();

  if (teams < 1) {
    dispatch(updateUserHasFinishedGame(true));
  }

  return (
    <div className="stat">
      <div className="stat-title">Teams Left</div>
      <div className="stat-value text-center">{teams}</div>
    </div>
  );
}
