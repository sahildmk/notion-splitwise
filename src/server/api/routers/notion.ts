import * as NotionService from "~/services/notionService";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notionRouter = createTRPCRouter({
  getUnpostedHighlights: publicProcedure.query(async ({ ctx }) => {
    const result = await NotionService.GetUnpostedHighlights(ctx);

    return result;
  }),
});
