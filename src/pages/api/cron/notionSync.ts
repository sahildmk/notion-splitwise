import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createTRPCContext } from "~/server/api/trpc";

const testSchema = z.object({
  testString: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json("Resource not found");
    return;
  }

  const context = await createTRPCContext({ req: req, res: res });

  const body = testSchema.parse(req.body);

  console.log(body);

  res.status(200).json(body);
}
