import { z } from "zod";
import { defineTool } from "./tool.js";

const cardReviews = defineTool({
  capability: "core",
  schema: {
    name: "card_reviews",
    title:
      "Requests all card reviews for a specified deck after a certain time. startID is the latest unix time not included in the result. Returns a list of 9-tuples (reviewTime, cardID, usn, buttonPressed, newInterval, previousInterval, newFactor, reviewDuration, reviewType)",
    description:
      "Requests all card reviews for a specified deck after a certain time. startID is the latest unix time not included in the result. Returns a list of 9-tuples (reviewTime, cardID, usn, buttonPressed, newInterval, previousInterval, newFactor, reviewDuration, reviewType)",
    inputSchema: z.object({
      deck: z.string(),
      startID: z.number(),
    }),
    type: "readOnly",
  },
  handle: async (context, params) => {
    const client = context.client();
    const code = [
      `// Requests all card reviews for a specified deck after a certain time. startID is the latest unix time not included in the result. Returns a list of 9-tuples (reviewTime, cardID, usn, buttonPressed, newInterval, previousInterval, newFactor, reviewDuration, reviewType)`,
      `await client.statistic.cardReviews({ deck: "${params.deck}", startID: ${params.startID} })`,
    ];
    const action = async () => {
      const cardReviews = await client.statistic.cardReviews(params);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(cardReviews),
          },
        ],
      };
    };
    return { code, action };
  },
});

export default [cardReviews];
