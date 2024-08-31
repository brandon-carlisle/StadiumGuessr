import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { LeagueCodeOptsSchema, allLeagues } from "@/server/stadiums";

//import { shuffle } from "@/utils/shuffle-stadiums";
import { z } from "zod";
//const GAME_ROUND_LENGTH = 20

export const localStadiumRouter = createTRPCRouter({
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
        leagueCode: LeagueCodeOptsSchema
      }),
    )
    .query(({ input }) => {
      console.log(input.leagueCode)

      return allLeagues.find((val) => val.code === input.leagueCode)
    }),
});
