import { useAppSelector } from "@/store/hooks";

interface FormElements extends HTMLFormControlsCollection {
  guessInput: HTMLInputElement;
}
interface UserGuessFormElement extends HTMLFormElement {
  // now we can override the elements type to be an HTMLFormControlsCollection
  // of our own design...
  readonly elements: FormElements;
}

export function GuessInput() {
  const currentTeam = useAppSelector((state) => state.game.currentTeam);

  function handleGuess(event: React.FormEvent<UserGuessFormElement>) {
    event.preventDefault();
    const guess = event.currentTarget.elements.guessInput.value;
    console.log("Guess: ", guess);

    if (!guess) {
      alert("guess");
      return;
    }

    if (isGuessCorrect(guess, currentTeam.stadiumNames)) {
      alert("correct");
    } else {
      alert("incorrect");
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
