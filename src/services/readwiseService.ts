import { type ServiceContext } from "~/server/api/trpc";

import {
  type CreateHighlightType,
  readwise,
} from "~/server/integrations/readwiseApiWrapper";
import { ProcessRequestAsync } from "~/utils/processRequest";

export const CreateHighlight = async (
  ctx: ServiceContext,
  newHighlight: CreateHighlightType
) => {
  return ProcessRequestAsync(async () => {
    const result = await readwise.createHighlight({
      highlights: [newHighlight],
    });

    return result;
  });

  console.log(result);
};
