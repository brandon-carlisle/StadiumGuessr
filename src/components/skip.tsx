import { gameActions } from "@/store/features/game/game-slice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import useSound from "use-sound";
import { useAudioContext } from "./audio-provider";
import skippedFx from "@/assets/skipped_fx.mp3";

export default function SkipButton() {
  const audioCtx = useAudioContext();
  const status = useAppSelector((state) => state.game.status);

  const dispatch = useAppDispatch();
  const [playSkippedFx] = useSound(skippedFx, { volume: audioCtx.volume });

  function handleSkip() {
    if (status !== "PLAYING") {
      return;
    }

    playSkippedFx();
    dispatch(gameActions.registerSkippedGuess());
    dispatch(gameActions.setCurrentTeamToNext());
  }

  return (
    <button type="button" className="btn btn-accent" onClick={handleSkip}>
      Skip (-5pts)
    </button>
  );
}
