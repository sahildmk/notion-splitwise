import * as NotionService from "~/services/notionService";
import * as ReadwiseService from "~/services/readwiseService";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type CreateHighlightType } from "~/server/integrations/readwiseApiWrapper";

export const notionRouter = createTRPCRouter({
  getUnpostedHighlights: publicProcedure.query(async ({ ctx }) => {
    const result = await NotionService.GetUnpostedHighlights(ctx);

    return result;
  }),
  createUnpostedHighlights: publicProcedure.mutation(async ({ ctx }) => {
    const newHighlight: CreateHighlightType = {
      text: "I am teaching pratiksha notion",
      title: "Notion Highlights",
      author: "Notion",
      source_url: "www.google.com",
      category: "books",
      source_type: "notion_readwise_sync",
    };

    await ReadwiseService.CreateHighlight(ctx, newHighlight);
  }),
});
