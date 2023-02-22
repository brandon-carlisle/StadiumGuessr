import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import dynamic from "next/dynamic";
import { prisma } from "../../server/db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type Team } from "@prisma/client";
import {
  incrementScore,
  removeTeamLeft,
  resetZoom,
  setGameOngoing,
  updateTeam,
  updateTimeRemaining,
} from "../../store/features/game/game-slice";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Stats from "../../components/Stats";
import { number } from "zod";

// Leaflet needs the window object, so this needs to have dynamic import
const DynamicMap = dynamic(() => import("../../components/DynamicMap"), {
  ssr: false,
  loading: () => <p className="text-4xl font-semibold">Map is loading..</p>,
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const teams = await prisma.team.findMany();
  console.log("⚽ Some team info here: ", teams[1]);

  return {
    props: { teams },
  };
}

const QUESTIONS = {
  q1: "Name the team of this stadium",
  q2: "What is this stadium called?",
  q3: "What is the capacity of this stadium?",
};

function checkIfInRange(capacity: number, min: number, max: number) {
  return capacity >= min && capacity <= max;
}

interface PlayPageProps {
  teams: Team[];
}

export default function PlayPage({ teams }: PlayPageProps) {
  const dispatch = useAppDispatch();
  const { currentTeam, timeRemaining } = useAppSelector((state) => state.game);
  const [inputText, setInputText] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(QUESTIONS["q1"]);

  useEffect(() => {
    dispatch(setGameOngoing(true));
    dispatch(updateTeam(teams[0]));
  }, [dispatch, teams]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTimeRemaining());
    }, 1000);

    if (timeRemaining < 1) {
      dispatch(setGameOngoing(false));
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

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
        if (inputText.toLowerCase() === currentTeam.stadium.toLowerCase()) {
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
        } else {
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

  return (
    <main className="relative flex h-full flex-col">
      <DynamicMap />
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
      </div>
      <Stats />
    </main>
  );
}
