import { type Team } from "@prisma/client";
import { type FormEvent, useState } from "react";
import {
  incrementScore,
  removeTeamLeft,
  setGameOngoing,
  updateTeam,
} from "../store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkIfInRange } from "../utils/utils";
import ResetZoom from "./ResetZoom";
import SkipControls from "./SkipControls";

export interface Questions {
  [key: string]: string;
}
const GAME_QUESTIONS: Questions = {
  q1: "Name the team of this stadium",
  q2: "What is this stadium called?",
  q3: "What is the capacity of this stadium?",
};

interface GameControlsProps {
  teams: Team[];
}

export default function GameControls({ teams }: GameControlsProps) {
  const [inputText, setInputText] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(GAME_QUESTIONS["q1"]);
  const { currentTeam } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function handleNextTeam() {
    const currentTeamIndex = teams.findIndex(
      (team) => currentTeam.id === team.id
    );
    const nextTeamIndex = currentTeamIndex + 1;

    if (nextTeamIndex <= teams.length) {
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
      case GAME_QUESTIONS["q1"]:
        // Question logic
        if (
          inputText.toLowerCase() === currentTeam.name.toLowerCase() ||
          inputText.toLowerCase() === currentTeam.alternativeName.toLowerCase()
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(GAME_QUESTIONS["q2"]);
        }
        break;
      case GAME_QUESTIONS["q2"]:
        // Question login
        if (
          inputText.toLowerCase() === currentTeam.stadium.toLowerCase() ||
          inputText.toLowerCase() ===
            currentTeam.alternativeStadium.toLowerCase()
        ) {
          dispatch(incrementScore(5));
          setInputText("");
          setCurrentQuestion(GAME_QUESTIONS["q3"]);
        }
        break;
      case GAME_QUESTIONS["q3"]:
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
          setCurrentQuestion(GAME_QUESTIONS["q1"]);
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
          setCurrentQuestion(GAME_QUESTIONS["q1"]);
          handleNextTeam();
        } // If out of both ranges, move on with no added points
        else {
          setInputText("");
          setCurrentQuestion(GAME_QUESTIONS["q1"]);
          handleNextTeam();
        }
        break;
    }
  }

  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-1">
      <form className="w-96" onSubmit={(e) => handleAnswerSubmit(e)}>
        <input
          type={currentQuestion === GAME_QUESTIONS["q3"] ? "number" : "text"}
          className="input-primary input input-lg w-full text-center"
          id="answer-input"
          placeholder={currentQuestion}
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
        />
      </form>
      <div className="flex gap-2">
        <ResetZoom />
        <SkipControls
          questions={GAME_QUESTIONS}
          setInputText={setInputText}
          handleNextTeam={handleNextTeam}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
    </div>
  );
}
