import { z } from "zod";
import { defineTool } from "./tool.js";

const version = defineTool({
  capability: "core",
  schema: {
    name: "version",
    title:
      "Gets the version of the API exposed by this plugin. Currently versions 1 through 6 are defined.",
    description:
      "Gets the version of the API exposed by this plugin. Currently versions 1 through 6 are defined.",
    inputSchema: z.object({}),
    type: "readOnly",
  },
  handle: async (context) => {
    const client = context.client();
    const code = [
      `// Gets the version of the API exposed by this plugin. Currently versions 1 through 6 are defined.`,
      `await client.miscellaneous.version()`,
    ];
    const action = async () => {
      const version = await client.miscellaneous.version();
      return {
        content: [
          {
            type: "text" as const,
            text: version.toString(),
          },
        ],
      };
    };
    return { code, action };
  },
});

export default [version];
