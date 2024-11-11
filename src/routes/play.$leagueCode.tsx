import MapView from "@/components/map";
import { allLeagues } from "@/data/leagues";
import {
  IconBulb,
  IconVolume,
  IconVolume2,
  IconZoomIn,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { BaseHTMLAttributes, ButtonHTMLAttributes, useState } from "react";

function getLeagueTitle(code: string) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    return "Not found";
  }

  return league.leagueName;
}

export const Route = createFileRoute("/play/$leagueCode")({
  component: RouteComponent,
  loader: ({ params }) => console.log(params.leagueCode),
  meta: ({ params }) => [
    {
      title: `Playing ${getLeagueTitle(params.leagueCode)}`,
    },
  ],
});

function RouteComponent() {
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
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-2">Game Info</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Score:</span>
              <span className="text-2xl">1250</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Time Remaining:</span>
              <span className="text-2xl">2:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Questions Remaining:</span>
              <span className="text-2xl">5</span>
            </div>
          </Card>

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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {}

function Card(props: CardProps) {
  return <div className="card bg-base-200">{props.children}</div>;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: ButtonProps) {
  return <button className="btn">{props.children}</button>;
}
