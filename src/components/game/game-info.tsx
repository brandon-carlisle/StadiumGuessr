import { useAppSelector } from "@/store/hooks";

export default function GameInfo() {
  return (
    <div className="absolute bottom-10 left-1/2 z-[9999] w-3/4 -translate-x-1/2 shadow-lg lg:w-2/5">
      <div className="stats w-full shadow">
        <Score />
        <TeamsLeft />
        <TimeRemaining />
      </div>
    </div>
  );
}

function Score() {
  const score = useAppSelector((state) => state.game.score);

  return (
    <div className="stat w-full place-items-center">
      <div className="stat-title">⚽️</div>
      <div className="stat-value text-center text-2xl md:text-4xl">{score}</div>
    </div>
  );
}

function TeamsLeft() {
  const { stadiumsRemaining } = useAppSelector((state) => state.game);

  return (
    <div className="stat w-full place-items-center">
      <div className="stat-title">🏟️</div>
      <div className="stat-value text-center text-2xl md:text-4xl">
        {stadiumsRemaining}
      </div>
    </div>
  );
}

function TimeRemaining() {
  const time = useAppSelector((state) => state.game.timeRemaining);

  return (
    <div className="stat w-full place-items-center">
      <div className="stat-title">⏱️</div>
      <div className="stat-value text-center text-2xl md:text-4xl">
        <span className="countdown">
          {/* @ts-expect-error Style countdown */}
          <span style={{ "--value": time }}></span>
        </span>
      </div>
    </div>
  );
}
