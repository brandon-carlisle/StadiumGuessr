import type { Match } from "@prisma/client";
import Link from "next/link";

interface Props {
  match: Match;
  href?: string;
}

export default function MatchSummary({ match, href }: Props) {
  const currentDate = new Date();

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="stats stats-vertical bg-neutral shadow md:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Total Score</div>
          <div className="stat-value">{match.score}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Time Remaining</div>
          <div className="stat-value">{match.timeRemaining}s</div>
        </div>

        <div className="stat">
          <div className="stat-title">Remaining</div>
          <div className="stat-value">{match.stadiumsRemaining}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Played</div>
          <div className="stat-value">
            {differenceInDays(currentDate, match.date)}
          </div>
          <div className="stat-desc">days ago</div>
        </div>

        {href && (
          <div className="stat place-items-center">
            <Link href={href} className="btn-primary btn">
              View match
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function differenceInDays(date1: Date, date2: Date) {
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  const difference_ms = Math.abs(date1Ms - date2Ms);
  const differenceInDays = Math.ceil(difference_ms / (1000 * 60 * 60 * 24));

  return differenceInDays;
}
