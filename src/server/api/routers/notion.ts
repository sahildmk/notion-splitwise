import { z } from "zod";
import { Client } from "@notionhq/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const databaseId = "c396574a71404f5889028d3f423ea86d";

const highlightSchema = z.object({
  id: z.string(),
  properties: z.object({
    Name: z.object({
      title: z
        .array(
          z.object({
            text: z.object({
              content: z.string(),
            }),
          })
        )
        .nonempty(),
    }),
  }),
});

const blockSchema = z.object({
  paragraph: z
    .object({
      rich_text: z.array(
        z.object({
          plain_text: z.string(),
        })
      ),
    })
    .optional(),
});

export const notionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log(response);

    return "hello";
  }),
  getUnpostedHighlights: publicProcedure.query(async ({ ctx }) => {
    const unpostedHighlights = await ctx.notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "readwise_createHighlight",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "readwise_highlightLink",
            url: {
              is_empty: true,
            },
          },
        ],
      },
    });

    if (unpostedHighlights.results[0]?.id === undefined) return;

    const result: Array<{
      highlightTitle: string;
      content: string;
    }> = [];

    for (const unparsedhighlight of unpostedHighlights.results) {
      const highlight = highlightSchema.parse(unparsedhighlight);
      if (highlight === undefined) continue;

      const title = highlight.properties.Name.title[0].text.content;

      const content = await ctx.notion.blocks.children.list({
        block_id: highlight.id,
      });

      const fullContentString: string[] = [];
      content.results.forEach((unparsedBlock) => {
        let fullBlockString = "";
        const block = blockSchema.parse(unparsedBlock);

        if (block.paragraph === undefined) return;

        block.paragraph.rich_text.forEach((rt) => {
          fullBlockString = fullBlockString.concat(rt.plain_text);
        });

        if (fullBlockString !== "") fullContentString.push(fullBlockString);
      });

      result.push({
        highlightTitle: title,
        content: fullContentString.join("\n"),
      });
    }

    return result;
  }),
});
