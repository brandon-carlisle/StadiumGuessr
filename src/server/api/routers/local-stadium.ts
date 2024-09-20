import { LeagueCodeOptsSchema } from "@/types/types";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { allLeagues } from "@/data/stadiums";

export const localStadiumRouter = createTRPCRouter({
  getLeague: publicProcedure
    .input(
      z.object({
        leagueCode: LeagueCodeOptsSchema,
      }),
    )
    .query(({ input }) => {
      return allLeagues.find((league) => league.code === input.leagueCode);
    }),
});
