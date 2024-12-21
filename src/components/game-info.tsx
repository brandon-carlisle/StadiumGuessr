import { useAppSelector } from "@/store/hooks";

export function GameInfo() {
  const gameState = useAppSelector((state) => state.game);

  return (
    <div className="card card-normal border bg-primary">
      <div className="card-body">
        <div className="flex justify-evenly md:flex-col gap-3">
          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Score</div>
            <div className="stat-value text-5xl text-primary-content">
              {gameState.score}
            </div>
          </div>

          <div className="border-b-2 border-primary-content/10 pb-4">
            <div className="uppercase text-xs font-semibold">Teams Left</div>
            <div className="stat-value text-5xl text-primary-content">
              {gameState.teamsRemaining}
            </div>
          </div>

          <div className="pb-4">
            <div className="uppercase text-xs font-semibold">Time</div>
            <div className="stat-value text-5xl text-primary-content">
              {gameState.timeRemaining}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
