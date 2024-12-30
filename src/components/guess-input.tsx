import { useAppDispatch, useAppSelector } from "@/store/hooks";

import correctFx from "@/assets/correct_fx.mp3";
import incorrectFx from "@/assets/incorrect_fx.mp3";
import useSound from "use-sound";
import { useContext } from "react";
import { AudioContext } from "./audio-provider";
import { gameActions } from "@/store/features/game/game-slice";

interface FormElements extends HTMLFormControlsCollection {
  guessInput: HTMLInputElement;
}
interface UserGuessFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function GuessInput() {
  const currentTeam = useAppSelector((state) => state.game.currentTeam);
  const audioCtx = useContext(AudioContext);
  const volume = audioCtx.audioEnabled ? 0.7 : 0;
  const dispatch = useAppDispatch();

  const [playCorrectFx] = useSound(correctFx, { volume });
  const [playIncorrectFx] = useSound(incorrectFx, { volume });

  function handleGuess(event: React.FormEvent<UserGuessFormElement>) {
    event.preventDefault();
    const guess = event.currentTarget.elements.guessInput.value;

    if (!guess) {
      return;
    }

    if (isGuessCorrect(guess, currentTeam.stadiumNames)) {
      // Register correct answer
      dispatch(gameActions.registerCorrectGuess());

      // Play sound
      playCorrectFx();

      // Clear input
      event.currentTarget.reset();

      // Move onto next team OR end game
      //
    } else {
      // Clear input
      event.currentTarget.reset();

      // Play sound
      playIncorrectFx();
    }
  }

  return (
    <form onSubmit={handleGuess} className="flex space-x-2">
      <input
        type="text"
        placeholder="Enter your answer"
        className="input input-bordered input-primary flex-grow"
        autoFocus
        id="guessInput"
      />
      <button className="btn btn-primary" type="submit">
        Guess
      </button>
    </form>
  );
}

function sanitize(inputs: string[]) {
  return inputs.map((item) =>
    item
      .replaceAll(" ", "")
      .replaceAll(/[.,\\/#!$%\\^&\\*;:{}=\-_`~()]/g, "")
      .toLowerCase(),
  );
}

function isGuessCorrect(guess: string, answers: string[]) {
  const [sanitizedInput] = sanitize([guess]);
  const sanitizedAnswers = sanitize(answers);

  if (sanitizedAnswers.includes(sanitizedInput)) {
    return true;
  } else {
    return false;
  }
}
