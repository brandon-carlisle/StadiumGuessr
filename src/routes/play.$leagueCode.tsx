import { GameInfo } from "@/components/game-info";
import MapView from "@/components/map";
import { AudioToggle } from "@/components/audio-toggle";
import { allLeagues } from "@/data/leagues";
import { LeagueCode } from "@/data/leagues/types";
import useGame from "@/hooks/useGame";
import { isLeagueCode } from "@/lib/utils";
import { IconBulb, IconZoomIn } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { GuessInput } from "@/components/guess-input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { gameActions, GameState } from "@/store/features/game/game-slice";
import useSound from "use-sound";
import skippedFx from "@/assets/skipped_fx.mp3";
import { useEffect } from "react";
import { useAudioContext } from "@/components/audio-provider";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";

function getLeague(code: LeagueCode) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    throw new Error("No league found");
  }

  return league;
}

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

async function addGameToDb(state: GameState) {
  return await db.games.add({
    id: nanoid(),
    datePlayed: new Date().toISOString(),
    league: state.league,
    teams: state.teams,
    score: state.score,
    correctTeamCodes: state.correctTeamCodes,
    skippedTeamCodes: state.incorrectTeamCodes,
  });
}

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

  return (
    <div className="min-h-screen flex flex-col p-4 bg-background text-foreground">
      <div className="flex-grow flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow md:w-2/3 bg-muted flex items-center justify-center border rounded-lg">
          <div className="container h-full w-full">
            <MapView />
          </div>
        </div>

        <div className="md:w-1/3 space-y-4">
          <GameInfo />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="btn"
              onClick={() => console.log("Hint requested")}
            >
              <IconBulb className="mr-2 h-4 w-4" />
              Hint
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => console.log("Reset zoom")}
            >
              <IconZoomIn className="mr-2 h-4 w-4" />
              Reset Zoom
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        <GuessInput />
        <SkipButton />
        <AudioToggle />
      </div>
    </div>
  );
}

function SkipButton() {
  const audioCtx = useAudioContext();
  const status = useAppSelector((state) => state.game.status);

  const dispatch = useAppDispatch();
  const [playSkippedFx] = useSound(skippedFx, { volume: audioCtx.volume });

  function handleSkip() {
    if (status !== "PLAYING") {
      return;
    }

    playSkippedFx();
    dispatch(gameActions.registerSkippedGuess());
    dispatch(gameActions.setCurrentTeamToNext());
  }

  return (
    <button type="button" className="btn btn-accent" onClick={handleSkip}>
      Skip (-5pts)
    </button>
  );
}
