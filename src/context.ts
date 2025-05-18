import { YankiConnect } from "yanki-connect";
import { FullConfig } from "./config.js";
import { Tool } from "./tools/tool.js";

export class Context {
  readonly tools: Tool<any>[];
  readonly config: FullConfig;
  private _ankiConnectClient: YankiConnect | null = null;

  constructor(tools: Tool<any>[], config: FullConfig) {
    this.tools = tools;
    this.config = config;
  }

  client() {
    if (!this._ankiConnectClient) {
      this._ankiConnectClient = new YankiConnect();
    }
    return this._ankiConnectClient;
  }

  async run(tool: Tool, params: Record<string, unknown> | undefined) {
    const toolResult = await tool.handle(
      this,
      tool.schema.inputSchema.parse(params || {})
    );
    const { code, action } = toolResult;

    const actionResult = action ? await action() : undefined;
    const content = actionResult?.content ?? [];
    return { content };
  }
}
