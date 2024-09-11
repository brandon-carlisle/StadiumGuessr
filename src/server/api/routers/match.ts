import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        score: z.number(),
        timeRemaining: z.number(),
        stadiumsRemaining: z.number(),
        correctStadiums: z.array(z.string()), // Array of stadium IDs for correct guesses
        incorrectStadiums: z.array(z.string()), // Array of stadium IDs for incorrect guesses
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const match = await ctx.prisma.match.create({
        data: {
          score: input.score,
          timeRemaining: input.timeRemaining,
          stadiumsRemaining: input.stadiumsRemaining,
          userId: ctx.session?.user.id || null,
          correctStadiums: {
            connect: input.correctStadiums.map((stadiumId) => ({
              id: stadiumId,
            })),
          },
          incorrectStadiums: {
            connect: input.incorrectStadiums.map((stadiumId) => ({
              id: stadiumId,
            })),
          },
        },
      });

      return {
        matchId: match.id,
      };
    }),

  getById: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input, ctx }) => {
      const match = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
        include: {
          correctStadiums: true,
          incorrectStadiums: true,
        },
      });

      if (!match)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No match found with that ID",
        });

      return match;
    }),

  getAllByUserId: protectedProcedure.query(async ({ ctx }) => {
    const matches = await ctx.prisma.match.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: { date: "desc" },
    });

    if (matches.length < 1) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No matches found",
      });
    }

    return matches;
  }),
});
