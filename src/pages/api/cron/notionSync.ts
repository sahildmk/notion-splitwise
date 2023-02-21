import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const testSchema = z.object({
  testString: z.string(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = testSchema.parse(req.body);

  console.log(body);

  res.status(200).json(body);
}
