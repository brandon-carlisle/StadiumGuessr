import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { LeagueCodeOptsSchema, allLeagues } from "@/server/stadiums";

import { shuffle } from "@/utils/shuffle-stadiums";

const GAME_ROUND_LENGTH = 20;

export const localStadiumRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        leagueCode: LeagueCodeOptsSchema,
      }),
    )
    .query(({ input }) => {
      if (!input.leagueCode) {
        // This is RANDOM mode
        // We need to return 20 random teams in this case
        const teams = allLeagues.map((league) => league.teams).flat();
        const shuffled = shuffle(teams);
        return shuffled.splice(0, GAME_ROUND_LENGTH);
      }

      return allLeagues.find((league) => league.code === input.leagueCode);
    }),
});
