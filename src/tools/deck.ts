import { z } from "zod";
import { defineTool } from "./tool.js";
import { TextContent } from "@modelcontextprotocol/sdk/types.js";

const deckNames = defineTool({
  capability: "core",
  schema: {
    name: "deck_names",
    title: "Get the complete list of deck names for the current user.",
    description: "Get the complete list of deck names for the current user.",
    inputSchema: z.object({}),
    type: "readOnly",
  },
  handle: async (context) => {
    const client = context.client();
    const code = [
      `// Get the complete list of deck names for the current user.`,
      `await client.deck.deckNames()`,
    ];
    const action = async () => {
      const deckNames = await client.deck.deckNames();
      return {
        content: deckNames.map((name) => ({
          type: "text",
          text: name,
        })) as TextContent[],
      };
    };
    return { code, action };
  },
});

export default [deckNames];
