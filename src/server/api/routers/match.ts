import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        score: z.number(),
        leagueCode: z.string(),
        answers: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const match = await ctx.prisma.localMatch.create({
        data: {
          userId: ctx.session.user.id,
          score: input.score,
          leagueCode: input.leagueCode,
          answers: input.answers,
        },
      });

      return {
        matchId: match.id,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input, ctx }) => {
      const match = await ctx.prisma.localMatch.findUnique({
        where: {
          id: input.matchId,
          userId: ctx.session.user.id,
        },
      });

      if (!match)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No match found",
        });

      return {
        match: match,
      };
    }),

  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    const matches = await ctx.prisma.localMatch.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: { playedAt: "desc" },
    });

    if (matches.length < 1) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No matches found",
      });
    }

    return {
      matches: matches,
    };
  }),
});
