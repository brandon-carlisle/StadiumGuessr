import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        score: z.number(),
        timeRemaining: z.number(),
        teamsRemaining: z.number(),
        correctStadiumIds: z.array(z.string()),
        incorrectStadiumIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const match = await ctx.prisma.match.create({
        data: {
          score: input.score,
          timeRemaining: input.timeRemaining,
          teamsRemaning: input.teamsRemaining,
          correctStadiumIds: input.correctStadiumIds,
          incorrectStadiumIds: input.incorrectStadiumIds,
          userId: ctx.session.user.id,
        },
      });

      return {
        matchId: match.id,
      };
    }),
});
