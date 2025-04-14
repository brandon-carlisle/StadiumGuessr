import { LeagueCode } from "@/data/leagues/types";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

async function fetchLeagues() {
  try {
    const res = await fetch("/api/league");
    if (!res.ok) {
      throw new Error(`Could not fetch leagues: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => await fetchLeagues(),
  staticData: {
    meta: {
      title: "Home",
    },
  },
});

function RouteComponent() {
  const leagues = Route.useLoaderData();
  console.log("Leagues from api: ", leagues);
  const dispatch = useAppDispatch();

  // Reset the game state if we ever hit the home page
  useEffect(() => {
    dispatch(gameActions.resetGame());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-dvh">
      <Hero />
      <Footer />
    </div>
  );
}

interface SelectOption {
  name: string;
  code: LeagueCode;
  default: boolean;
}

const selectOptions: SelectOption[] = [
  { name: "Premier League", code: "EPL", default: true },
  { name: "Championship", code: "EFL", default: false },
];

const defaultOptionCode = selectOptions.find((opt) => opt.default)?.code;

function Hero() {
  const [option, setOption] = useState(defaultOptionCode);

  return (
    <div className="hero bg-base-200 flex-grow">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">StadiumGuessr</h1>
          <div className="py-6">
            <div className="text-xl">
              Use a map to look around and figure out what football
              <div
                className="tooltip inline mx-1"
                data-tip="Guess the name of the stadium and not the club"
              >
                <span className="font-semibold inline-block">stadium</span>
              </div>
              you are at. You only have 60 seconds.
            </div>
          </div>
          <div className="join w-full block">
            <select
              className="select select-bordered w-full max-w-xs join-item"
              onChange={(e) => setOption(e.target.value as LeagueCode)}
            >
              <option disabled>Which league?</option>
              {selectOptions.map((opt) => (
                <option value={opt.code} key={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
            {option && (
              <Link
                className="btn btn-primary join-item"
                to="/play/$leagueCode"
                params={{
                  leagueCode: option,
                }}
              >
                Let's play
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Check out the source code{" "}
          <a
            href="https://github.com/brandon-carlisle/stadiumGuessr/"
            target="_blank"
            className="link"
            rel="noreferrer noopener"
          >
            here
          </a>
        </p>
      </aside>
    </footer>
  );
}
