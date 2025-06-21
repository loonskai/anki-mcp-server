import { z } from "zod";
import { defineTool } from "./tool.js";
import { TextContent } from "@modelcontextprotocol/sdk/types.js";

const cardsInfo = defineTool({
  capability: "core",
  schema: {
    name: "cards_info",
    title:
      "Returns a list of objects containing for each card ID the card fields, front and back sides including CSS, note type, the note that the card belongs to, and deck name, last modification timestamp as well as ease and interval.",
    description:
      "Returns a list of objects containing for each card ID the card fields, front and back sides including CSS, note type, the note that the card belongs to, and deck name, last modification timestamp as well as ease and interval.",
    inputSchema: z.object({
      cards: z.array(z.number()),
    }),
    type: "readOnly",
  },
  handle: async (context, params) => {
    const client = context.client();
    const code = [
      `// Returns a list of objects containing for each card ID the card fields, front and back sides including CSS, note type, the note that the card belongs to, and deck name, last modification timestamp as well as ease and interval.`,
      `await client.card.cardsInfo({ cards: [${params.cards.join(",")}] })`,
    ];
    const action = async () => {
      const cardsInfo = await client.card.cardsInfo(params);
      return {
        content: cardsInfo.map((card) => ({
          type: "text",
          text: JSON.stringify(card),
        })) as TextContent[],
      };
    };
    return { code, action };
  },
});

export default [cardsInfo];
