import { type FormEvent, useState } from "react";
import useSound from "use-sound";

import { validateAnswer } from "@/utils/validate-answer";

import {
  addCorrectStadiumId,
  decrementStadiumsRemaining,
  incrementCurrentStadium,
  incrementScore,
} from "@/store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AnswerForm() {
  const dispatch = useAppDispatch();
  const { currentStadium } = useAppSelector((state) => state.game);

  const [playCorrectSfx] = useSound("/correctSfx.mp3");
  const [playIncorrectSfx] = useSound("/incorrectSfx.mp3");

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
