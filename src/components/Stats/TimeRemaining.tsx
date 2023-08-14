import { useAppSelector } from "@/store/hooks";

export default function TimeRemaining() {
  const time = useAppSelector((state) => state.game.timeRemaining);

  return (
    <div className="stat w-full place-items-center">
      <div className="stat-title">⏱️</div>
      <div className="stat-value text-center text-2xl md:text-4xl">
        <span className="countdown">
          <span style={{ "--value": time }}></span>
        </span>
      </div>
    </div>
  );
}
