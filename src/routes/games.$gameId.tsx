import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId")({
  component: RouteComponent,
  staticData: {
    meta: { title: "Game ID" },
  },
});

function RouteComponent() {
  return <div>Hello "/games/$gameId"!</div>;
}
