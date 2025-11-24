import { useAppSelector } from "@/store/hooks";

export function TeamStadiumInfo() {
  const currentTeam = useAppSelector((state) => state.game.currentTeam);

  return (
    <div className="card card-normal border bg-base-100">
      <div className="card-body">
        <div className="space-y-4">
          <div>
            <div className="uppercase text-xs font-semibold text-base-content/70">
              Team
            </div>
            <div className="text-2xl font-bold text-base-content">
              {currentTeam.clubName}
            </div>
          </div>
          <div>
            <div className="uppercase text-xs font-semibold text-base-content/70">
              Stadium
            </div>
            <div className="text-xl font-semibold text-base-content">
              {currentTeam.stadiumName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
