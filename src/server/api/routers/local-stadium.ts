//import { shuffle } from "@/utils/shuffle-stadiums";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { LeagueCodeOptsSchema, allLeagues } from "@/server/stadiums";

//const GAME_ROUND_LENGTH = 20

export const localStadiumRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        leagueCode: LeagueCodeOptsSchema,
      }),
    )
    .query(({ input }) => {
      if (!input.leagueCode) {
        // We need to return 20 random teams in this case
        return;
      }

      function getLeagueByCode(leagueCode: string) {
        return allLeagues.find((val) => val.code === leagueCode);
      }

      return getLeagueByCode(input.leagueCode);
    }),
});
