import { gameActions } from "@/store/features/game/game-slice";
import { mapActions } from "@/store/features/map/map-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function GuessResultPopup() {
  const dispatch = useAppDispatch();
  const isPopupVisible = useAppSelector((state) => state.game.isPopupVisible);
  const guessHistory = useAppSelector((state) => state.game.guessHistory);

  if (!isPopupVisible || guessHistory.length === 0) {
    return null;
  }

  const lastGuess = guessHistory[guessHistory.length - 1];
  const distance = Math.round(lastGuess.distance);
  const points = lastGuess.points;

  const handleDismiss = () => {
    dispatch(mapActions.clearMarker());
    dispatch(gameActions.dismissPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card card-normal bg-base-100 max-w-md w-full mx-4">
        <div className="card-body">
          <h2 className="card-title text-2xl">Guess Submitted!</h2>
          <div className="space-y-4 py-4">
            <div className="text-lg">
              {distance === 0 ? (
                <span className="font-bold text-success">
                  Perfect! You were exactly right!
                </span>
              ) : (
                <span>
                  Wow, you were <span className="font-bold">{distance}</span>{" "}
                  {distance === 1 ? "mile" : "miles"} away!
                </span>
              )}
            </div>
            <div className="text-xl">
              Points earned: <span className="font-bold text-primary">{points}</span>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleDismiss}>
              Move onto next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
