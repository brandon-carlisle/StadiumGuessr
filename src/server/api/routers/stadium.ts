import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { shuffleStadiumArray } from "@/utils/shuffle-stadiums";

export const stadiumRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        names: z.array(z.string()),
        capacity: z.number(),
        latitude: z.number(),
        longitude: z.number(),
        club: z.string().min(1),
        league: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an admin",
        });

      const stadium = await ctx.prisma.stadium.create({ data: input });

      return { stadium };
    }),

  deleteById: protectedProcedure
    .input(z.object({ stadiumId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an admin",
        });

      await ctx.prisma.stadium.delete({
        where: {
          id: input.stadiumId,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const stadiums = await ctx.prisma.stadium.findMany();

    if (stadiums.length === 0)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find any stadiums",
      });

    return stadiums;
  }),

  getRandom: publicProcedure.query(async ({ ctx }) => {
    const stadiums = await ctx.prisma.stadium.findMany();

    // How many stadiums per match
    const GAME_ROUND_LENGTH = 20;

    if (stadiums.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find any stadiums",
      });
    }

    if (stadiums.length < GAME_ROUND_LENGTH) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find enough stadiums",
      });
    }

    const shuffled = shuffleStadiumArray(stadiums);

    return shuffled.slice(0, GAME_ROUND_LENGTH);
  }),
});
