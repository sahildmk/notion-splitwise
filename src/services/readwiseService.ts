import { z } from "zod";
import { ServiceContext } from "~/server/api/trpc";

const CreateHighlightSchema = z.object({
  text: z.string(),
  title: z.string().optional(),
  author: z.string().optional(),
  image_url: z.string().optional(),
  source_url: z.string().optional(),
  source_type: z.literal("notion_readwise_sync").optional(),
  category: z.enum(["books", "articles", "tweets", "podcasts"]).optional(),
  note: z.string().optional(),
  location: z.number().optional(),
  location_type: z.enum(["page", "order", "time_offset"]).optional(),
  highlighted_at: z.string().datetime().optional(),
  highlight_url: z.string().optional(),
});

export type CreateHighlightType = z.infer<typeof CreateHighlightSchema>;

const CreateHighlight = async (
  ctx: ServiceContext,
  newHighlight: CreateHighlightType
) => {};
