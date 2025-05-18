import { z } from "zod";
import { defineTool } from "./tool.js";
import { type TextContent } from "@modelcontextprotocol/sdk/types.js";

const noteInputSchema = z.object({
  deckName: z.string(),
  modelName: z.string(),
  fields: z.record(z.string(), z.string()),
  options: z
    .object({
      allowDuplicate: z.boolean().optional(),
      duplicateScope: z.string().optional(),
      duplicateScopeOptions: z
        .object({
          deckName: z.string().optional(),
          checkChildren: z.boolean().optional(),
          checkAllModels: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  audio: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string(),
        skipHash: z.literal(false),
        fields: z.array(z.string()),
      })
    )
    .optional(),
  video: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string(),
        skipHash: z.literal(false),
        fields: z.array(z.string()),
      })
    )
    .optional(),
  picture: z
    .array(
      z.object({
        url: z.string(),
        filename: z.string(),
        skipHash: z.literal(false),
        fields: z.array(z.string()),
      })
    )
    .optional(),
});

const addNote = defineTool({
  capability: "core",
  schema: {
    name: "add_note",
    title:
      "Creates a note using the given deck and model, with the provided field values and tags. Returns the identifier of the created note created on success, and null on failure.",
    description:
      "Creates a note using the given deck and model, with the provided field values and tags. Returns the identifier of the created note created on success, and null on failure.",
    inputSchema: z.object({
      note: noteInputSchema,
    }),
    type: "destructive",
  },
  handle: async (context, params) => {
    const client = context.client();
    const code = [
      `// Creates a note using the given deck and model, with the provided field values and tags. Returns the identifier of the created note created on success, and null on failure.`,
      `await client.note.addNote({ note: ${JSON.stringify(params.note)} })`,
    ];
    const action = async () => {
      const note = await client.note.addNote({ note: params.note });
      return {
        content: [
          {
            type: "text",
            text: note?.toString() ?? "null",
          } as TextContent,
        ],
      };
    };
    return { code, action, type: "destructive" };
  },
});

export default [addNote];
