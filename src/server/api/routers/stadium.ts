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
        stadium: z.object({
          names: z.array(z.string()),
          capacity: z.number(),
          latitude: z.number(),
          longitude: z.number(),
          club: z.string(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an admin",
        });

      const stadium = await ctx.prisma.stadium.create({ data: input.stadium });

      return { stadium };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const stadiums = await ctx.prisma.stadium.findMany();

    return stadiums;
  }),
});
