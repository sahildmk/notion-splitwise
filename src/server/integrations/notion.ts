import { Client as NotionClient } from "@notionhq/client";

import { env } from "~/env.mjs";

const globalForNotion = globalThis as unknown as { notion: NotionClient };

export const notion =
  globalForNotion.notion ||
  new NotionClient({
    auth: env.NOTION_SECRET,
  });

if (env.NODE_ENV !== "production") globalForNotion.notion = notion;
