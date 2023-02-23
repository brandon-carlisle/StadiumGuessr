import { type Team } from "@prisma/client";
import { useState } from "react";
import {
  removeTeamLeft,
  setGameOngoing,
  updateTeam,
} from "../store/features/game/game-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import AnswerForm from "./AnswerForm";
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

  return (
    <div className="absolute top-8 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-1">
      <AnswerForm
        questions={GAME_QUESTIONS}
        currentQuestion={currentQuestion}
        handleNextTeam={handleNextTeam}
        inputText={inputText}
        setCurrentQuestion={setCurrentQuestion}
        setInputText={setInputText}
      />
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
