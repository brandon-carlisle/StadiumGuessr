import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => {
      const message = "Hello there, " + input.name;

      return { message };
    }),

  getRole: protectedProcedure.query(({ ctx }) => {
    console.log("server: ", ctx.session.user.role);

    return { test: "test" };
  }),
});
