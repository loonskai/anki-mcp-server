import { z } from "zod";
import { defineTool } from "./tool.js";
import { TextContent } from "@modelcontextprotocol/sdk/types.js";

const CardBrowserColumns = [
  "answer",
  "cardDue",
  "cardEase",
  "cardIvl",
  "cardLapses",
  "cardMod",
  "cardReps",
  "deck",
  "note",
  "noteCrt",
  "noteFld",
  "noteMod",
  "noteTags",
  "question",
  "template",
];

const guiBrowse = defineTool({
  capability: "core",
  schema: {
    name: "gui_browse",
    title:
      "Invokes the Card Browser dialog and searches for a given query. Returns an array of identifiers of the cards that were found. Optionally, the reorderCards property can be provided to reorder the cards shown in the Card Browser. This is an array including the order and columnId objects. order can be either ascending or descending while columnId can be one of several column identifiers (as documented in the Anki source code). The specified column needs to be visible in the Card Browser.",
    description:
      "Invokes the Card Browser dialog and searches for a given query. Returns an array of identifiers of the cards that were found. Optionally, the reorderCards property can be provided to reorder the cards shown in the Card Browser. This is an array including the order and columnId objects. order can be either ascending or descending while columnId can be one of several column identifiers (as documented in the Anki source code). The specified column needs to be visible in the Card Browser.",
    inputSchema: z.object({
      query: z.string(),
      reorderCards: z
        .object({
          order: z.enum(["ascending", "descending"]),
          columnId: z.enum(
            Object.values(CardBrowserColumns) as [string, ...string[]]
          ),
        })
        .optional(),
    }),
    type: "readOnly",
  },
  handle: async (context, params) => {
    const client = context.client();
    const code = [
      `// Invokes the Card Browser dialog and searches for a given query. Returns an array of identifiers of the cards that were found. Optionally, the reorderCards property can be provided to reorder the cards shown in the Card Browser. This is an array including the order and columnId objects. order can be either ascending or descending while columnId can be one of several column identifiers (as documented in the Anki source code). The specified column needs to be visible in the Card Browser.`,
      `await client.card.guiBrowse({ query: "${params.query}", reorderCards: ${
        params.reorderCards ? JSON.stringify(params.reorderCards) : "undefined"
      } })`,
    ];
    const action = async () => {
      const guiBrowse = await client.graphical.guiBrowse(params);
      return {
        content: guiBrowse.map((card) => ({
          type: "text",
          text: JSON.stringify(card),
        })) as TextContent[],
      };
    };
    return { code, action };
  },
});

export default [guiBrowse];
