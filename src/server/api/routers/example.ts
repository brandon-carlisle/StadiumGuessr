import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => {
      const message = "Hello, " + input.name;

      return { message };
    }),
});
