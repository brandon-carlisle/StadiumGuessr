//import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

//import { shuffle } from "@/utils/shuffle-stadiums";
import { z } from "zod";

//const GAME_ROUND_LENGTH = 20

export const stadiumRouter = createTRPCRouter({
  //getAllLeagues: publicProcedure.query(() => {
  //  const stadiums = [...STADIUMS]
  //
  //  if (stadiums.length === 0)
  //    throw new TRPCError({
  //      code: "NOT_FOUND",
  //      message: "Could not find any stadiums",
  //    });
  //
  //  return shuffle(stadiums).slice(0, GAME_ROUND_LENGTH)
  //}),

  getByLeague: publicProcedure
    .input(
      z.object({
        leagueCode: z.string(),
      }),
    )
    .query(({ input }) => {
      console.log(input.leagueCode)
    }),
});
