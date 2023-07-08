import { createTRPCRouter } from "@/server/api/trpc";

import { stadiumRouter } from "./routers/stadium";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  stadium: stadiumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
