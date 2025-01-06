import { db } from "@/lib/db";
import { createFileRoute } from "@tanstack/react-router";
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

  return <ul>{games?.map((game) => <li key={game.id}>{game.id}</li>)}</ul>;
}
