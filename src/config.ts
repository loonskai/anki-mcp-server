export type FullConfig = {};

export type CLIOptions = {
  host?: string;
  port?: number;
};

export async function resolveCLIConfig(
  cliOptions: CLIOptions
): Promise<FullConfig> {
  return cliOptions;
}
