import { z } from "zod";
import { Client } from "@notionhq/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const readwiseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    console.log("Readwise Hello");

    return "hello";
  }),
});
