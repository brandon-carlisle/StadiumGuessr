/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";

// TODO: Change animation based
// on score increasing or decreasing

export function Score() {
  const score = useAppSelector((state) => state.game.score);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!animate) {
      setAnimate(true);
      timer = setTimeout(() => {
        setAnimate(false);
      }, 600); // reset animate class after 600ms
    }

    return () => clearTimeout(timer);
  }, [score]);

  function getAnimationClass() {
    if (!animate) {
      return "";
    }

    return "motion-preset-bounce";
  }

  return (
    <>
      <div className="uppercase text-xs font-semibold">Score</div>
      <div
        className={`stat-value text-5xl text-primary-content ${getAnimationClass()} overflow-hidden`}
      >
        {score}
      </div>
    </>
  );
}
