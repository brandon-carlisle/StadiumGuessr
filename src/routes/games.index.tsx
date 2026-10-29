import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getSessionFn } from "@/server-functions/auth";
import { getGameResultsForUserFn } from "@/server-functions/games";

export const Route = createFileRoute("/games/")({
	component: RouteComponent,
	loader: async () => {
		const session = await getSessionFn();
		if (!session?.user) {
			throw redirect({ to: "/sign-in" });
		}
		return await getGameResultsForUserFn();
	},
	head: () => ({
		meta: [
			{
				title: "Your games",
			},
		],
	}),
});

function RouteComponent() {
	const games = Route.useLoaderData();

	if (!games || games.length === 0) {
		return (
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-bold mb-4">Your games</h1>
				<p>No saved games yet.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Your games</h1>
			<ul className="space-y-3">
				{games.map((game) => (
					<li key={game.id} className="card bg-base-100 border">
						<div className="card-body">
							<Link
								to="/games/$gameId"
								params={{ gameId: game.id.toString() }}
								className="link link-hover font-semibold"
							>
								{game.leagueName}
							</Link>
							<p>
								{game.score} points · {game.teamsGuessed} of {game.totalTeams}{" "}
								teams guessed
							</p>
							<p className="text-sm opacity-70">
								{new Date(game.createdAt).toLocaleString()}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
