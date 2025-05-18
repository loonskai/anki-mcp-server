import { Connection } from "./connection.js";
import { createConnection as createConnectionImpl } from "./connection.js";
import { FullConfig } from "./config.js";

export async function createConnection(userConfig: any): Promise<Connection> {
  const config = userConfig as FullConfig;
  return createConnectionImpl(config);
}
