import ReviewLayout from "@/layouts/review-layout";
import { createFileRoute } from "@tanstack/react-router";
import { getGame } from "@/lib/server/games";

export const Route = createFileRoute("/games/$gameId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getGame({ id: params.gameId });
  },
  head: () => ({
    meta: [
      {
        title: "Review your game",
      },
    ],
  }),
});

function RouteComponent() {
  const game = Route.useLoaderData();
  console.log("Game data:", game);
  return <ReviewLayout />;
}

