import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-client";
import { getGameResultsForUserFn } from "@/server-functions/games";

export const Route = createFileRoute("/games/")({
	component: RouteComponent,
	loader: async () => {
		const session = useSession();
		if (!session || !session.data?.user) {
			throw redirect({ to: "/sign-in" });
		}
		return await getGameResultsForUserFn({
			data: { userId: session.data.user.id },
		});
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
		return <div>None found rn</div>;
	}

	console.log(games);

	return (
		<ul>
			{games?.map((game) => (
				<GameLink
					key={game.id}
					game={{
						id: game.id.toString(),
						datePlayed: game.createdAt.toISOString(),
					}}
				/>
			))}
		</ul>
	);
}

interface GameProps {
	game: {
		id: string;
		datePlayed: string;
	};
}

function GameLink(props: GameProps) {
	return (
		<div>
			<Link to="/games/$gameId" params={{ gameId: props.game.id }}>
				Check out how you did
			</Link>
		</div>
	);
}
