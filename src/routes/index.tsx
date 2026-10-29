import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { gameDurationSeconds } from "@/lib/utils";
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
	const selected = leagues?.find((league) => league.id.toString() === leagueId);
	const seconds = gameDurationSeconds(selected?.teamCount ?? 0);

	return (
		<div className="hero bg-base-200 grow">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">StadiumGuessr</h1>
					<div className="py-6">
						<div className="text-xl">
							See a stadium name and guess{" "}
							<span className="font-semibold">where</span> it's located on the
							map. Place your marker and see how close you get.
							{leagues && leagues.length > 0 ? (
								<> You only have {seconds} seconds.</>
							) : null}
						</div>
					</div>
					{!leagues || leagues.length === 0 ? (
						<p>No leagues yet.</p>
					) : (
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
					)}
				</div>
			</div>
		</div>
	);
}
