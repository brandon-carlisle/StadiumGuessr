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
      console.log(input.leagueCode);

      return allLeagues.find((val) => val.code === input.leagueCode);
    }),
});
