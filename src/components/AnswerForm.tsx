import type { Dispatch, FormEvent, SetStateAction } from 'react';
import useSound from 'use-sound';

import { incrementScore } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { checkAnswer } from '@utils/checkAnswer';
import { checkIfInRange } from '@utils/checkInRange';

import { type Questions } from './GameControls';

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

  const [playCorrectSfx] = useSound('/correctSfx.mp3');
  const [playIncorrectSfx] = useSound('/incorrectSfx.mp3');

  // prettier-ignore
  function updateScoreAndMoveOn(score: number,nextQuestion: "q1" | "q2" | "q3") {

    if (score > 0) {
      playCorrectSfx()
    } else {
      playIncorrectSfx()
    }

    dispatch(incrementScore(score));
    setInputText("");
    setCurrentQuestion(questions[nextQuestion]);
  }

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // prettier-ignore
    switch (currentQuestion) {
      case questions["q1"]:
        if (checkAnswer(inputText, [currentTeam.name, currentTeam.alternativeName])) {
          updateScoreAndMoveOn(5, "q2");
        } else {
          updateScoreAndMoveOn(0, "q2");
        }
        break;

      case questions["q2"]:
        if (checkAnswer(inputText, [currentTeam.stadium, currentTeam.alternativeStadium])) {
          updateScoreAndMoveOn(5, 'q3');
        } else {
          updateScoreAndMoveOn(0, 'q3');
        }
        break;

      case questions["q3"]:
        const capacityGuess = parseInt(inputText);

        if (checkIfInRange(capacityGuess, currentTeam.capacity - 5000, currentTeam.capacity + 5000)) {
          // Check if score is in range of +/- 5k
          updateScoreAndMoveOn(10, 'q1')
          handleNextTeam();
        } else if (
          // Check if score is in range of +/- 10k
          checkIfInRange(capacityGuess, currentTeam.capacity - 10000, currentTeam.capacity + 10000)) {
          updateScoreAndMoveOn(5, 'q1')
          handleNextTeam();
        } 
        else {
          // If out of both ranges, move on with no added points
          updateScoreAndMoveOn(0, 'q1')
          handleNextTeam();
        }
        break;
    }
  }

  return (
    <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
      <input
        type={currentQuestion === questions['q3'] ? 'number' : 'text'}
        className="input-primary input input-lg w-full text-center"
        id="answer-input"
        placeholder={currentQuestion}
        value={inputText}
        onChange={(e) => setInputText(e.currentTarget.value)}
      />
    </form>
  );
}
