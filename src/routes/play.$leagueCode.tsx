import { GameInfo } from "@/components/game-info";
import MapView from "@/components/map";
import { AudioToggle } from "@/components/audio-toggle";
import { allLeagues } from "@/data/leagues";
import { LeagueCode } from "@/data/leagues/types";
import useGame from "@/hooks/useGame";
import { cn, isLeagueCode } from "@/lib/utils";
import { IconBulb, IconZoomIn } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { ButtonHTMLAttributes } from "react";

function getLeague(code: LeagueCode) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    throw new Error("No league found");
  }

  return league;
}

export const Route = createFileRoute("/play/$leagueCode")({
  component: RouteComponent,
  params: {
    parse: (rawParams) => {
      if (!isLeagueCode(rawParams.leagueCode)) {
        throw new Error("Invalid league code in params");
      }

      return { leagueCode: rawParams.leagueCode };
    },
  },
  loader: ({ params }) => getLeague(params.leagueCode),
  staticData: {
    meta: {
      title: "Playing now",
    },
  },
});

function RouteComponent() {
  const league = Route.useLoaderData();
  useGame(league);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-background text-foreground">
      <div className="flex-grow flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow md:w-2/3 bg-muted flex items-center justify-center border rounded-lg">
          <div className="container h-full w-full">
            <MapView />
          </div>
        </div>

        <div className="md:w-1/3 space-y-4">
          <GameInfo />

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => console.log("Hint requested")}>
              <IconBulb className="mr-2 h-4 w-4" />
              Hint
            </Button>
            <Button onClick={() => console.log("Reset zoom")}>
              <IconZoomIn className="mr-2 h-4 w-4" />
              Reset Zoom
            </Button>
            <div className="col-span-2">
              <AudioToggle />
            </div>
          </div>
        </div>
      </div>

      <form>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your answer"
            className="input input-bordered input-primary flex-grow"
            autoFocus
          />
          <Button className="btn-primary" type="submit">
            Guess
          </Button>
        </div>
      </form>
    </div>
  );
}

function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  className: string,
) {
  return (
    <button className={cn("btn", className)} type="button">
      {props.children}
    </button>
  );
}
