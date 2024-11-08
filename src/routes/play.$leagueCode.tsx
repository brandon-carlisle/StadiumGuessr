import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play/$leagueCode")({
  component: RouteComponent,
  loader: ({ params }) => console.log(params.leagueCode),
  meta: ({ params }) => [
    {
      title: `Playing ${params.leagueCode}`,
    },
  ],
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col p-4 bg-background text-foreground">
      <div className="flex-grow flex flex-col md:flex-row gap-4 mb-4">
        <Card className="flex-grow md:w-2/3 bg-muted flex items-center justify-center">
          <p className="text-2xl text-muted-foreground">
            Interactive Map Placeholder
          </p>
        </Card>

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
              <Lightbulb className="mr-2 h-4 w-4" />
              Hint
            </Button>
            <Button onClick={() => console.log("Reset zoom")}>
              <ZoomIn className="mr-2 h-4 w-4" />
              Reset Zoom
            </Button>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="col-span-2"
            >
              {isMuted ? (
                <VolumeX className="mr-2 h-4 w-4" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              {isMuted ? "Unmute" : "Mute"} Audio
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitted answer:", answer);
            setAnswer("");
          }}
        >
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}
