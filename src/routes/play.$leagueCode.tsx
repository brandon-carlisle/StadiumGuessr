import { GameInfo } from "@/components/game-info";
import MapView from "@/components/map";
import { allLeagues } from "@/data/leagues";
import { cn } from "@/lib/utils";
import {
  IconBulb,
  IconVolume,
  IconVolume2,
  IconZoomIn,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { ButtonHTMLAttributes, useState } from "react";

function getLeagueTitle(code: string) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    return "Not found";
  }

  return league.leagueName;
}

function getLeagueTeams(code: string) {
  const league = allLeagues.find((league) => league.code === code)

  if (!league) {
    throw new Error("No league found")
  }

  return {
    leagueName: league.leagueName,
    teams: league.teams
  }
}

export const Route = createFileRoute("/play/$leagueCode")({
  component: RouteComponent,
  loader: ({ params }) => getLeagueTeams(params.leagueCode),
  meta: ({ params }) => [
    {
      title: `Playing ${getLeagueTitle(params.leagueCode)}`,
    },
  ],
});

function RouteComponent() {
  const league = Route.useLoaderData()
  console.log(league)

  const [isMuted, setIsMuted] = useState(true);
  const [answer, setAnswer] = useState("");

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
            <Button onClick={() => setIsMuted(!isMuted)} className="col-span-2">
              {isMuted ? (
                <IconVolume className="mr-2 h-4 w-4" />
              ) : (
                <IconVolume2 className="mr-2 h-4 w-4" />
              )}
              {isMuted ? "Unmute" : "Mute"} Audio
            </Button>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitted answer:", answer);
          setAnswer("");
        }}
      >
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your answer"
            value={""}
            onChange={(e) => setAnswer(e.target.value)}
            className="input input-bordered input-primary flex-grow"
            autoFocus
          />
          <Button className="btn-primary" type="submit">Guess</Button>
        </div>
      </form>
    </div>
  );
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

function Button(props: ButtonProps, className: string) {
  return <button className={cn("btn", className)}>{props.children}</button>;
}
