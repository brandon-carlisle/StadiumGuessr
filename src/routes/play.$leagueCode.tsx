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
  return "Hello /play/$leagueCode!";
}
