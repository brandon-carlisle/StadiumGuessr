import Dexie, { type EntityTable } from "dexie";

interface Game {
  id: number;
  score: number;
  played: Date;
  correct: string[];
  skipped: string[];
}

const db = new Dexie("GamesDb") as Dexie & {
  games: EntityTable<
    Game,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  games: "++id, score, played, correct, skipped", // primary key "id" (for the runtime!)
});

export type { Game };
export { db };
