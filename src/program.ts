import { program } from "commander";
import type { Connection } from "./connection.js";
import { resolveCLIConfig } from "./config.js";
import { startStdioTransport, startHttpTransport } from "./transport.js";

program
  .version(`Version 1.0.0`)
  .name("Anki Connect MCP server")
  .option("--port <port>", "port to listen on for SSE transport.")
  .action(async (options) => {
    const config = await resolveCLIConfig(options);
    const connectionList: Connection[] = [];
    setupExitWatchdog(connectionList);
    if (options.port) {
      startHttpTransport(config, +options.port, options.host, connectionList);
    } else {
      await startStdioTransport(config, connectionList);
    }
  });

function setupExitWatchdog(connectionList: Connection[]) {
  const handleExit = async () => {
    setTimeout(() => process.exit(0), 15000);
    for (const connection of connectionList) await connection.close();
    process.exit(0);
  };

  process.stdin.on("close", handleExit);
  process.on("SIGINT", handleExit);
  process.on("SIGTERM", handleExit);
}

program.parse(process.argv);
