import type { FormEvent } from 'react';
import useSound from 'use-sound';

import { incrementScore } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { checkAnswer } from '@utils/checkAnswer';

export default function AnswerForm() {
  const { currentTeam } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [playCorrectSfx] = useSound('/correctSfx.mp3');
  const [playIncorrectSfx] = useSound('/incorrectSfx.mp3');

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
      <input
        type="text"
        className="input-primary input input-lg w-full text-center"
        id="answer-input"
      />
    </form>
  );
}
