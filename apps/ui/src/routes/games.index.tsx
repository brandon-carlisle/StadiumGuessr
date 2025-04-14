import { db, type Game } from "@/lib/db";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
  staticData: {
    meta: { title: "Your games" },
  },
});

function RouteComponent() {
  const games = useLiveQuery(() => db.games.toArray());

  if (!games || games.length === 0) {
    return <div>None found rn</div>;
  }

  console.log(games);

  return (
    <ul>{games?.map((game) => <GameLink key={game.id} game={game} />)}</ul>
  );
}

interface GameProps {
  game: Game;
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
