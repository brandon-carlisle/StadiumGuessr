import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Timer } from "./timer";

export function GameInfo() {
  const score = useAppSelector((state) => state.game.score);
  const teamsRemaining = useAppSelector((state) => state.game.teamsRemaining);

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
    <div className="card card-normal border bg-primary">
      <div className="card-body">
        <div className="flex justify-evenly md:flex-col gap-3">
          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Score</div>
            <div
              className={`stat-value text-5xl text-primary-content ${animate ? "motion-preset-confetti" : ""}`}
            >
              {score}
            </div>
          </div>

          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Teams Left</div>
            <div className="stat-value text-5xl text-primary-content">
              {teamsRemaining}
            </div>
          </div>

          <div className="pb-4">
            <div className="uppercase text-xs font-semibold">Time</div>
            <div className="stat-value text-5xl text-primary-content">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
