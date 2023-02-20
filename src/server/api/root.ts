import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { notionRouter } from "./routers/notion";
import { readwiseRouter } from "./routers/readwise";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  notion: notionRouter,
  readwise: readwiseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
