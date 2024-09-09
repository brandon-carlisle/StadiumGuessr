import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { allLeagues } from "@/server/stadiums";

// Need to keep this matched with LeagueCodeOpts in /src/types/types.ts
const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL_CHAMPIONSHIP"),
]);

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
