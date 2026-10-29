import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getSessionFn } from "@/server-functions/auth";
import { getGameResultByIdFn } from "@/server-functions/games";

export const Route = createFileRoute("/games/$gameId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const session = await getSessionFn();
		if (!session?.user) {
			throw redirect({ to: "/sign-in" });
		}
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

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<Link to="/games" className="link link-hover text-sm">
				Back to your games
			</Link>
			<h1 className="text-3xl font-bold mt-4">{game.leagueName}</h1>
			<p className="mt-2 text-lg">
				{game.score} points · {game.teamsGuessed} of {game.totalTeams} teams
				guessed
			</p>
			<p className="text-sm opacity-70 mt-1">
				{new Date(game.createdAt).toLocaleString()}
			</p>
			<ul className="mt-6 space-y-3">
				{game.guessHistory.map((guess) => (
					<li key={guess.teamId} className="card bg-base-100 border">
						<div className="card-body py-4">
							<div className="font-semibold">{guess.teamName}</div>
							<p>
								{Math.round(guess.distance)}{" "}
								{Math.round(guess.distance) === 1 ? "mile" : "miles"} away ·{" "}
								{guess.points} points
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
