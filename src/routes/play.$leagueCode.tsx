import useGame from "@/hooks/useGame";
import { addGameToDb, getLeague, isLeagueCode } from "@/lib/utils";
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
  staticData: {
    meta: {
      title: "Playing now",
    },
  },
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
        let id;
        try {
          console.log("Adding to db");
          id = await addGameToDb(state);
          console.log("Added to db with id: ", id);
        } catch (error) {
          console.error("Failed to add to db: ", error);
        }
      })();
    }
  }, [status]);

  return <GameLayout />;
}
