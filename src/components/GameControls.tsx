import { type Team } from "@prisma/client";
import { type FormEvent, useState } from "react";
import {
  incrementScore,
  removeTeamLeft,
  resetZoom,
  setGameOngoing,
  updateTeam,
} from "../store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function checkIfInRange(capacity: number, min: number, max: number) {
  return capacity >= min && capacity <= max;
}

interface Questions {
  [key: string]: string;
}
const QUESTIONS: Questions = {
  q1: "Name the team of this stadium",
  q2: "What is this stadium called?",
  q3: "What is the capacity of this stadium?",
};

interface GameControlsProps {
  teams: Team[];
}

export default function GameControls({ teams }: GameControlsProps) {
  const [inputText, setInputText] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(QUESTIONS["q1"]);
  const { currentTeam } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function handleNextTeam() {
    const currentTeamIndex = teams.findIndex(
      (team) => currentTeam.id === team.id
    );
    const nextTeamIndex = currentTeamIndex + 1;

    if (nextTeamIndex < teams.length) {
      dispatch(updateTeam(teams[nextTeamIndex]));
      dispatch(removeTeamLeft());
    } else {
      dispatch(setGameOngoing(false));
    }
  }

  function handleAnswerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // This can be DRY -- FIX THIS
    switch (currentQuestion) {
      case QUESTIONS["q1"]:
        // Question logic
        if (
          inputText.toLowerCase() === currentTeam.name.toLowerCase() ||
          inputText.toLowerCase() === currentTeam.alternativeName.toLowerCase()
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(QUESTIONS["q2"]);
        }
        break;
      case QUESTIONS["q2"]:
        // Question login
        if (
          inputText.toLowerCase() === currentTeam.stadium.toLowerCase() ||
          inputText.toLowerCase() ===
            currentTeam.alternativeStadium.toLowerCase()
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(QUESTIONS["q3"]);
        }
        break;
      case QUESTIONS["q3"]:
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
          setCurrentQuestion(QUESTIONS["q1"]);
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
          setCurrentQuestion(QUESTIONS["q1"]);
          handleNextTeam();
        } // If out of both ranges, move on with no added points
        else {
          setInputText("");
          setCurrentQuestion(QUESTIONS["q1"]);
          handleNextTeam();
        }
        break;
    }
  }

  function handleResetZoom() {
    dispatch(resetZoom());
  }

  function handleSkipQuestion() {
    const currentQuestionIndex = Object.keys(QUESTIONS).find(
      (key) => QUESTIONS[key] === currentQuestion
    );

    if (currentQuestionIndex === "q1") {
      setInputText("");
      setCurrentQuestion(QUESTIONS["q2"]);
      return;
    }

    if (currentQuestionIndex === "q2") {
      setInputText("");
      setCurrentQuestion(QUESTIONS["q3"]);
      return;
    }

    if (currentQuestionIndex === "q3") {
      setInputText("");
      setCurrentQuestion(QUESTIONS["q1"]);
      handleNextTeam();
    }
  }

  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-1">
      <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
        <input
          type={currentQuestion === QUESTIONS["q3"] ? "number" : "text"}
          className="input-primary input input-lg w-full text-center"
          id="answer-input"
          placeholder={currentQuestion}
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
        />
      </form>
      <button className="btn-secondary btn" onClick={handleResetZoom}>
        Reset Zoom
      </button>
      <button className="btn-secondary btn" onClick={handleSkipQuestion}>
        Skip Question
      </button>
    </div>
  );
}
