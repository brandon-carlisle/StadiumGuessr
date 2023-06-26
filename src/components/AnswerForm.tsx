import { type FormEvent, useState } from 'react';
import useSound from 'use-sound';

import { incrementScore } from '@store/features/game/game-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { validateAnswer } from '@utils/validateAnswer';

export default function AnswerForm() {
  const dispatch = useAppDispatch();
  const { currentTeam } = useAppSelector((state) => state.game);
  const [playCorrectSfx] = useSound('/correctSfx.mp3');
  const [playIncorrectSfx] = useSound('/incorrectSfx.mp3');

  const [input, setInput] = useState('');

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === '') return;

    const { valid } = validateAnswer({
      userAnswer: input,
      answers: ['test', 'another'],
    });

    setInput('');

    if (valid) {
      playCorrectSfx();
      dispatch(incrementScore(10));
    } else {
      playIncorrectSfx();
    }
  }

  return (
    <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
      <input
        type="text"
        className="input-primary input input-lg w-full text-center"
        id="answer-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
