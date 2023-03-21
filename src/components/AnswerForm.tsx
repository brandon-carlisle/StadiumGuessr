import type { Dispatch, FormEvent, SetStateAction } from "react";
import { incrementScore } from "../store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkIfInRange } from "../utils/checkInRange";
import { type Questions } from "./GameControls";
import { checkAnswer } from "../utils/checkAnswer";

interface AnswerFormProps {
  questions: Questions;
  currentQuestion: string | undefined;
  setCurrentQuestion: Dispatch<SetStateAction<string | undefined>>;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleNextTeam: () => void;
}

export default function AnswerForm({
  questions,
  currentQuestion,
  setCurrentQuestion,
  inputText,
  setInputText,
  handleNextTeam,
}: AnswerFormProps) {
  const { currentTeam } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  console.table(currentTeam);

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    switch (currentQuestion) {
      case questions["q1"]:
        // Question logic
        if (
          checkAnswer(inputText, [
            currentTeam.name,
            currentTeam.alternativeName,
          ])
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(questions["q2"]);
        } else {
          setInputText("");
          setCurrentQuestion(questions["q2"]);
        }
        break;
      case questions["q2"]:
        // Question login
        if (
          checkAnswer(inputText, [
            currentTeam.stadium,
            currentTeam.alternativeStadium,
          ])
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(questions["q3"]);
        } else {
          setInputText("");
          setCurrentQuestion(questions["q3"]);
        }
        break;
      case questions["q3"]:
        const capacityGuess = parseInt(inputText);

        // Check if score is in range of +/- 5k
        if (
          checkIfInRange(
            capacityGuess,
            currentTeam.capacity - 5000,
            currentTeam.capacity + 5000
          )
        ) {
          dispatch(incrementScore(10));
          setInputText("");
          setCurrentQuestion(questions["q1"]);
          handleNextTeam();
        } else if (
          // Check if score is in range of +/- 10k
          checkIfInRange(
            capacityGuess,
            currentTeam.capacity - 10000,
            currentTeam.capacity + 10000
          )
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(questions["q1"]);
          handleNextTeam();
        } // If out of both ranges, move on with no added points
        else {
          setInputText("");
          setCurrentQuestion(questions["q1"]);
          handleNextTeam();
        }
        break;
    }
  }

  return (
    <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
      <input
        type={currentQuestion === questions["q3"] ? "number" : "text"}
        className="input-primary input input-lg w-full text-center"
        id="answer-input"
        placeholder={currentQuestion}
        value={inputText}
        onChange={(e) => setInputText(e.currentTarget.value)}
      />
    </form>
  );
}
