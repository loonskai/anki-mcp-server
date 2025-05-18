import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool as McpTool,
} from "@modelcontextprotocol/sdk/types.js";
import { tools } from "./tools/index.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Context } from "./context.js";
import { FullConfig } from "./config.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

export async function createConnection(
  config: FullConfig
): Promise<Connection> {
  const server = new Server(
    {
      name: "Anki",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const context = new Context(tools, config);

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: tools.map((tool) => ({
        name: tool.schema.name,
        description: tool.schema.description,
        inputSchema: zodToJsonSchema(tool.schema.inputSchema),
        annotations: {
          title: tool.schema.title,
          readOnlyHint: tool.schema.type === "readOnly",
          destructiveHint: tool.schema.type === "destructive",
          openWorldHint: true,
        },
      })) as McpTool[],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const errorResult = (...messages: string[]) => ({
      content: [{ type: "text", text: messages.join("\n") }],
      isError: true,
    });
    const tool = tools.find((tool) => tool.schema.name === request.params.name);
    if (!tool) {
      return errorResult(`Tool ${request.params.name} not found`);
    }

    try {
      return await context.run(tool, request.params.arguments);
    } catch (error) {
      return errorResult(String(error));
    }
  });

  const connection = new Connection(server, config);
  return connection;
}

export class Connection {
  readonly server: Server;
  readonly context: Context;

  constructor(server: Server, config: FullConfig) {
    this.server = server;
    this.context = new Context(tools, config);
  }

  async connect(transport: Transport) {
    await this.server.connect(transport);
    await new Promise<void>((resolve) => {
      this.server.oninitialized = () => resolve();
    });
    // if (this.server.getClientVersion()?.name.includes("cursor"))
    // this.context.config.noImageResponses = true;
  }

  async close() {
    await this.server.close();
  }
}
