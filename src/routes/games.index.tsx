import { createFileRoute, Link } from "@tanstack/react-router";
import { getGames } from "@/server-functions/games";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
  loader: async () => {
    return await getGames();
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
    <ul>{games?.map((game) => <GameLink key={game.id} game={game} />)}</ul>
  );
}

interface GameProps {
  game: {
    id: string;
    datePlayed: string;
    league: unknown;
    teams: unknown[];
    score: number;
    correctTeamCodes: string[] | null;
    skippedTeamCodes: string[] | null;
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

