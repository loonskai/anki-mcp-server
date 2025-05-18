import { z } from "zod";
import { defineTool } from "./tool.js";
import { TextContent } from "@modelcontextprotocol/sdk/types.js";

const findModelsByName = defineTool({
  capability: "core",
  schema: {
    name: "find_models_by_name",
    title:
      "Gets a list of models for the provided model names from the current user.",
    description:
      "Gets a list of models for the provided model names from the current user.",
    inputSchema: z.object({
      modelNames: z.array(z.string()),
    }),
    type: "readOnly",
  },
  handle: async (context, params) => {
    const client = context.client();
    const code = [
      `// Gets a list of models for the provided model names from the current user.`,
      `await client.model.findModelsByName({ modelNames: [${params.modelNames
        .map((name) => `"${name}"`)
        .join(",")}] })`,
    ];
    const action = async () => {
      const models = await client.model.findModelsByName(params);
      return {
        content: models.map((model) => ({
          type: "text",
          text: JSON.stringify(model),
        })) as TextContent[],
      };
    };
    return { code, action };
  },
});

const modelNames = defineTool({
  capability: "core",
  schema: {
    name: "model_names",
    title: "Gets the complete list of model names for the current user.",
    description: "Gets the complete list of model names for the current user.",
    inputSchema: z.object({}),
    type: "readOnly",
  },
  handle: async (context) => {
    const client = context.client();
    const code = [
      `// Gets the complete list of model names for the current user.`,
      `await client.model.modelNames()`,
    ];
    const action = async () => {
      const modelNames = await client.model.modelNames();
      return {
        content: modelNames.map((name) => ({
          type: "text",
          text: name,
        })) as TextContent[],
      };
    };
    return { code, action };
  },
});

export default [findModelsByName, modelNames];
