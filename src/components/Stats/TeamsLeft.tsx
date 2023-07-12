import { useAppSelector } from "@/store/hooks";

export default function TeamsLeft() {
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
