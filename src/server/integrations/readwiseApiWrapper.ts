import { z } from "zod";
import { env } from "~/env.mjs";

interface ClientOptions {
  auth: string;
}

const CreateHighlightResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    category: z.string(),
    source: z.string(),
    num_highlights: z.number(),
    last_highlight_at: z.unknown(),
    updated: z.string(),
    cover_image_url: z.string(),
    highlights_url: z.string(),
    source_url: z.string(),
    modified_highlights: z.array(z.number()),
  })
);

const CreateHighlightSchema = z.object({
  text: z.string(),
  title: z.string().optional(),
  author: z.string().optional(),
  image_url: z.string().optional(),
  source_url: z.string().optional(),
  source_type: z.literal("notion_readwise_sync"),
  category: z.enum(["books", "articles", "tweets", "podcasts"]).optional(),
  note: z.string().optional(),
  location: z.number().optional(),
  location_type: z.enum(["page", "order", "time_offset"]).optional(),
  highlighted_at: z.string().datetime().optional(),
  highlight_url: z.string().optional(),
});

export type CreateHighlightType = z.infer<typeof CreateHighlightSchema>;

class ReadwiseClient {
  private _options: ClientOptions;
  private _baseUrl = "https://readwise.io/api/v2";
  private _highlightsUrl = `${this._baseUrl}/highlights/`;

  constructor(options: ClientOptions) {
    this._options = options;
  }

  public async getHighlistList() {
    const res = await fetch(this._highlightsUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${this._options.auth}`,
      },
    });

    if (res.ok) return (await res.json()) as unknown;

    switch (res.status) {
      case 401:
        // Unauthorized error

        break;

      default:
        break;
    }
  }

  public async createHighlight(input: { highlights: CreateHighlightType[] }) {
    const res = await fetch(this._highlightsUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${this._options.auth}`,
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) throw new Error("Unexpected Error");

    return CreateHighlightResponseSchema.parse(await res.json());
  }
}

const globalForReadwise = globalThis as unknown as { readwise: ReadwiseClient };

export const readwise =
  globalForReadwise.readwise ||
  new ReadwiseClient({
    auth: env.READWISE_SECRET,
  });

if (env.NODE_ENV !== "production") globalForReadwise.readwise = readwise;
