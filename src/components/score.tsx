import { useAppSelector } from "@/store/hooks";
import { useState, useEffect } from "react";

// TODO: Change animation based
// on score increasing or decreasing

export function Score() {
  const score = useAppSelector((state) => state.game.score);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (score > 0) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 600); // reset animate class after 600ms

      return () => clearTimeout(timer);
    }
  }, [score]);

  return (
    <>
      <div className="uppercase text-xs font-semibold">Score</div>
      <div
        className={`stat-value text-5xl text-primary-content ${animate ? "motion-preset-confetti" : ""}`}
      >
        {score}
      </div>
    </>
  );
}
