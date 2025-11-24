import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getLeaguesFn } from "@/server-functions/leagues";
import { gameActions } from "@/store/features/game/game-slice";
import { useAppDispatch } from "@/store/hooks";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => await getLeaguesFn(),
	head: () => ({
		meta: [
			{
				title: "Home",
			},
		],
	}),
});

function RouteComponent() {
	const leagues = Route.useLoaderData();
	console.log("Leagues from database: ", leagues);
	const dispatch = useAppDispatch();

	// Reset the game state if we ever hit the home page
	useEffect(() => {
		dispatch(gameActions.resetGame());
	}, [dispatch]);

	return (
		<div className="flex flex-col min-h-dvh">
			<Hero />
			<Footer />
		</div>
	);
}

function Hero() {
	const leagues = Route.useLoaderData();
	const [leagueId, setLeagueId] = useState<string>(
		leagues && leagues.length > 0 ? leagues[0].id.toString() : "",
	);

	return (
		<div className="hero bg-base-200 grow">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">StadiumGuessr</h1>
					<div className="py-6">
						<div className="text-xl">
							See a stadium name and guess{" "}
							<span className="font-semibold">where</span> it's located on the
							map. Place your marker and see how close you get. You only have 60
							seconds.
						</div>
					</div>
					<div className="join w-full block">
						<select
							className="select select-bordered w-full max-w-xs join-item"
							value={leagueId}
							onChange={(e) => setLeagueId(e.target.value)}
						>
							<option disabled>Which league?</option>
							{leagues?.map((league) => (
								<option value={league.id.toString()} key={league.id}>
									{league.name}
								</option>
							))}
						</select>
						{leagueId && (
							<Link
								className="btn btn-primary join-item"
								to="/play/$leagueId"
								params={{
									leagueId: leagueId,
								}}
							>
								Let's play
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function Footer() {
	return (
		<footer className="footer footer-center bg-base-300 text-base-content p-4">
			<aside>
				<p>
					Check out the source code{" "}
					<a
						href="https://github.com/brandon-carlisle/stadiumGuessr/"
						target="_blank"
						className="link"
						rel="noreferrer noopener"
					>
						here
					</a>
				</p>
			</aside>
		</footer>
	);
}
