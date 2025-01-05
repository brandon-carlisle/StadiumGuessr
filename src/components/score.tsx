/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect, useRef } from "react";

// TODO: Change animation based
// on score increasing or decreasing

// 1) figure out if new score is > or < current score
//

type ScoreDirection = "increased" | "decreased" | "none";

export function Score() {
  const score = useAppSelector((state) => state.game.score);
  const prevScore = useRef(score);
  const [animate, setAnimate] = useState(false);
  const [scoreDirection, setScoreDirection] = useState<ScoreDirection>("none");

  useEffect(() => {
    if (score > prevScore.current) {
      setScoreDirection("increased");
    } else if (score < prevScore.current) {
      setScoreDirection("decreased");
    } else {
      setScoreDirection("none");
    }

    if (score !== prevScore.current) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 600); // reset animate class after 600ms

      return () => clearTimeout(timer);
    }

    prevScore.current = score;
  }, [score]);

  console.log(scoreDirection);

  function getAnimationClass() {
    if (!animate) {
      return "";
    }

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
