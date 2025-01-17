/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect, useRef } from "react";

// TODO: Fix score animations
// Need to keep track of the previous score
// When the score changes, determine based on
// new score and previous score if it went up or down

type ScoreDirection = "increased" | "decreased" | "none";

export function Score() {
  const score = useAppSelector((state) => state.game.score);
  const prevScoreRef = useRef(score);
  const [animate, setAnimate] = useState(false);
  const [scoreDirection, setScoreDirection] = useState<ScoreDirection>("none");

  useEffect(() => {
    if (score > prevScoreRef.current) {
      setScoreDirection("increased");
    } else if (score < prevScoreRef.current) {
      setScoreDirection("decreased");
    } else {
      setScoreDirection("none");
    }

    prevScoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (score !== prevScoreRef.current) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 600); // reset animate class after 600ms

      return () => clearTimeout(timer);
    }
  }, [score]);

  function getAnimationClass() {
    if (!animate) {
      return "";
    }

    console.log("scoreDirection: ", scoreDirection);

    return scoreDirection === "increased"
      ? "motion-preset-confetti"
      : "motion-preset-compress";
  }

  return (
    <>
      <div className="uppercase text-xs font-semibold">Score</div>
      <div
        className={`stat-value text-5xl text-primary-content ${getAnimationClass()}`}
      >
        {score}
      </div>
    </>
  );
}
