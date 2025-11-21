import useGame from "@/hooks/useGame";
import { getLeague, isLeagueCode } from "@/lib/utils";
import { saveGame } from "@/lib/server/games";
import { createFileRoute } from "@tanstack/react-router";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import GameLayout from "@/layouts/game-layout";

export const Route = createFileRoute("/play/$leagueCode")({
  component: RouteComponent,
  params: {
    parse: (rawParams) => {
      if (!isLeagueCode(rawParams.leagueCode)) {
        throw new Error("Invalid league code in params");
      }

      return { leagueCode: rawParams.leagueCode };
    },
  },
  loader: ({ params }) => getLeague(params.leagueCode),
  head: () => ({
    meta: [
      {
        title: "Playing now",
      },
    ],
  }),
});

function RouteComponent() {
  const league = Route.useLoaderData();
  const { startGame } = useGame();
  const state = useAppSelector((state) => state.game);
  const status = useAppSelector((state) => state.game.status);

  useEffect(() => {
    startGame(league);
  }, [startGame, league]);

  useEffect(() => {
    if (status === "COMPLETE") {
      (async () => {
        try {
          console.log("Saving game to database");
          const id = await saveGame(state);
          console.log("Game saved with id: ", id);
        } catch (error) {
          console.error("Failed to save game: ", error);
        }
      })();
    }
  }, [status, state]);

  return <GameLayout />;
}

