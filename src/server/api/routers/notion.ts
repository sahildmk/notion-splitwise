import { z } from "zod";
import { Client } from "@notionhq/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const notionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    console.log("Hello");

    const databaseId = "c396574a71404f5889028d3f423ea86d";

    const response = await ctx.notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log(response);

    return "hello";
  }),
});
