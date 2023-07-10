import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const stadiumRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        names: z.array(z.string()),
        capacity: z.number(),
        latitude: z.number(),
        longitude: z.number(),
        club: z.string(),
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
});
