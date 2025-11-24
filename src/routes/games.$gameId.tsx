import { createFileRoute } from "@tanstack/react-router";
import ReviewLayout from "@/layouts/review-layout";
import { getGameResultByIdFn } from "@/server-functions/games";

export const Route = createFileRoute("/games/$gameId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		return await getGameResultByIdFn({ data: { id: params.gameId } });
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
