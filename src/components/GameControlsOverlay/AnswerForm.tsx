import { type FormEvent, useContext, useState } from "react";
import useSound from "use-sound";

import { validateAnswer } from "@/utils/validate-answer";

import {
  addCorrectStadiumId,
  decrementStadiumsRemaining,
  incrementCurrentStadium,
  incrementScore,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SoundContext } from "@/store/sound-context";

export default function AnswerForm() {
  const dispatch = useAppDispatch();
  const { currentStadium } = useAppSelector((state) => state.game);
  const { soundEnabled } = useContext(SoundContext);

  const [playCorrectSfx] = useSound("/correctfx.mp3", {
    volume: 0.2,
    soundEnabled,
  });
  const [playIncorrectSfx] = useSound("/incorrectfx.mp3", {
    volume: 0.2,
    soundEnabled,
  });

  const [input, setInput] = useState("");

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === "") return;

    const { isValid } = validateAnswer({
      userAnswer: input,
      answers: currentStadium.names,
    });

    setInput("");

    if (isValid) {
      playCorrectSfx();
      dispatch(incrementScore(10));
      dispatch(addCorrectStadiumId(currentStadium.id));
      dispatch(incrementCurrentStadium());
      dispatch(decrementStadiumsRemaining());
    } else {
      playIncorrectSfx();
    }
  }

  return (
    <form
      className="flex w-full items-center justify-center md:w-96"
      onSubmit={(e) => handleAnswerSubmit(e)}
    >
      <input
        type="text"
        className="input text-center md:input-lg md:w-full"
        id="answer-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What stadium is this?"
      />
    </form>
  );
}
