import type { Dispatch, SetStateAction } from 'react';

import { updateUserHasFinishedGame } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { type Questions } from './GameControls';

interface SkipControlsProps {
  questions: Questions;
  setInputText: Dispatch<SetStateAction<string>>;
  currentQuestion: string | undefined;
  setCurrentQuestion: Dispatch<SetStateAction<string | undefined>>;
  handleNextTeam: () => void;
}

export default function SkipControls({
  questions,
  setInputText,
  currentQuestion,
  setCurrentQuestion,
  handleNextTeam,
}: SkipControlsProps) {
  const { teamsLeft } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const currentQuestionIndex = Object.keys(questions).find(
    (key) => questions[key] === currentQuestion,
  );

  const isFinalQuestion = currentQuestionIndex === 'q3' && teamsLeft === 1;

  function handleSkipQuestion() {
    if (currentQuestionIndex === 'q1') {
      setInputText('');
      setCurrentQuestion(questions['q2']);
      return;
    }

    if (currentQuestionIndex === 'q2') {
      setInputText('');
      setCurrentQuestion(questions['q3']);
      return;
    }

    if (currentQuestionIndex === 'q3' && teamsLeft === 1) {
      setInputText('');
      setCurrentQuestion(questions['q1']);
    }

    if (currentQuestionIndex === 'q3' && teamsLeft > 1) {
      setInputText('');
      setCurrentQuestion(questions['q1']);
      handleNextTeam();
    }
  }

  function handleCompleteGame() {
    dispatch(updateUserHasFinishedGame(true));
  }

  return (
    <>
      {!isFinalQuestion && (
        <button className="btn-secondary btn" onClick={handleSkipQuestion}>
          Skip Question
        </button>
      )}

      {isFinalQuestion && (
        <button className="btn-secondary btn" onClick={handleCompleteGame}>
          Finish Game
        </button>
      )}
    </>
  );
}
