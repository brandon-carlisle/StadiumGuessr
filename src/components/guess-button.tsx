import { gameActions } from "@/store/features/game/game-slice";
import { mapActions } from "@/store/features/map/map-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calculateDistance, calculateScore } from "@/lib/utils";
import correctFx from "@/assets/correct_fx.mp3";
import incorrectFx from "@/assets/incorrect_fx.mp3";
import useSound from "use-sound";
import { useAudioContext } from "./audio-provider";

export function GuessButton() {
  const dispatch = useAppDispatch();
  const markerPosition = useAppSelector((state) => state.map.markerPosition);
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const status = useAppSelector((state) => state.game.status);
  const isPopupVisible = useAppSelector((state) => state.game.isPopupVisible);
  const audioCtx = useAudioContext();

  const [playCorrectFx] = useSound(correctFx, { volume: audioCtx.volume });
  const [playIncorrectFx] = useSound(incorrectFx, { volume: audioCtx.volume });

  const handleGuess = () => {
    if (status !== "PLAYING" || !markerPosition || isPopupVisible) {
      return;
    }

    const actualLat = currentTeam.latitude;
    const actualLng = currentTeam.longitude;

    // Calculate distance
    const distance = calculateDistance(
      markerPosition.lat,
      markerPosition.lng,
      actualLat,
      actualLng,
    );

    // Calculate score
    const points = calculateScore(distance);

    // Register the guess
    dispatch(
      gameActions.registerLocationGuess({
        guessLat: markerPosition.lat,
        guessLng: markerPosition.lng,
        distance,
        points,
      }),
    );

    // Play sound based on distance (close = correct sound, far = incorrect)
    if (distance < 10) {
      // Within 10 miles - play correct sound
      playCorrectFx();
    } else {
      // Far away - play incorrect sound
      playIncorrectFx();
    }
  };

  const isDisabled = !markerPosition || status !== "PLAYING" || isPopupVisible;

  return (
    <button
      className="btn btn-primary w-full"
      onClick={handleGuess}
      disabled={isDisabled}
    >
      Guess
    </button>
  );
}
