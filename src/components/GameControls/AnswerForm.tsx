import { type FormEvent, useState } from "react";
import useSound from "use-sound";

import { validateAnswer } from "@utils/validateAnswer";

import {
  decrementTeamsRemaining,
  incrementCurrentTeam,
  incrementScore,
} from "@store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function AnswerForm() {
  const dispatch = useAppDispatch();
  const { currentTeam } = useAppSelector((state) => state.game);
  const [playCorrectSfx] = useSound("/correctSfx.mp3");
  const [playIncorrectSfx] = useSound("/incorrectSfx.mp3");

  const [input, setInput] = useState("");

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === "") return;

    const { isValid } = validateAnswer({
      userAnswer: input,
      answers: [currentTeam.stadium, currentTeam.alternativeStadium],
    });

    setInput("");

    if (isValid) {
      playCorrectSfx();
      dispatch(incrementScore(10));
      dispatch(incrementCurrentTeam());
      dispatch(decrementTeamsRemaining());
    } else {
      playIncorrectSfx();
    }
  }

  return (
    <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
      <input
        type="text"
        className="input-primary input w-full text-center md:input-lg"
        id="answer-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What stadium is this?"
      />
    </form>
  );
}
