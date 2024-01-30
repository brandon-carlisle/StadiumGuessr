import type { Match } from "@prisma/client";

interface Props {
  match: Match;
}

export default function StatsSummary({ match }: Props) {
  return (
    <div className="stats stats-vertical shadow-lg md:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Total Score</div>
        <div className="stat-value">{match.score}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Time Remaining</div>
        <div className="stat-value">{match.timeRemaining}s</div>
      </div>

      <div className="stat">
        <div className="stat-title">Stadiums Remaining</div>
        <div className="stat-value">{match.stadiumsRemaining}</div>
      </div>
    </div>
  );
}
