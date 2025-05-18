import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import { type z } from "zod";
import { Context } from "../context.js";

export type ToolSchema<Input extends InputType> = {
  name: string;
  title: string;
  description: string;
  inputSchema: Input;
  type: "readOnly" | "destructive";
};

type InputType = z.Schema;

export type ToolCapability = "core";

export type ToolActionResult =
  | {
      content?: TextContent[];
    }
  | undefined
  | void;

export type ToolResult = {
  code: string[];
  action?: () => Promise<ToolActionResult>;
};

export type Tool<Input extends InputType = InputType> = {
  capability: ToolCapability;
  schema: ToolSchema<Input>;
  handle: (context: Context, params: z.output<Input>) => Promise<ToolResult>;
};

export function defineTool<Input extends InputType>(
  tool: Tool<Input>
): Tool<Input> {
  return tool;
}
