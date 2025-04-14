import { League, Team } from "@/data/leagues/types";
import Dexie, { type EntityTable } from "dexie";

interface Game {
  id: string;
  datePlayed: string; // Date played
  league: League;
  teams: Team[];
  score: number;
  correctTeamCodes: string[] | null;
  skippedTeamCodes: string[] | null;
}

const db = new Dexie("GamesDb") as Dexie & {
  games: EntityTable<
    Game,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  games:
    "++id, datePlayed, league, teams, score, correctTeamCodes, skippedTeamCodes", // primary key "id" (for the runtime!)
});

export type { Game };
export { db };
