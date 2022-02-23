import * as prettier from "prettier";
import { LoggingService } from "./LoggingService";

interface IResolveConfigResult {
  config: prettier.Options | null;
  error?: Error;
}

export interface RangeFormattingOptions {
  rangeStart: number;
  rangeEnd: number;
}

export class ConfigResolver {
  constructor(private loggingService: LoggingService) {}

  public async getPrettierOptions(
    fileName: string,
    parser: prettier.BuiltInParserName,
    vsCodeConfig: prettier.Options,
    resolveConfigOptions: prettier.ResolveConfigOptions,
    rangeFormattingOptions?: RangeFormattingOptions
  ): Promise<{ options?: Partial<prettier.Options>; error?: Error }> {
    const { config: configOptions, error } = await this.resolveConfig(
      fileName,
      resolveConfigOptions
    );

    if (error) {
      return { error };
    }

    const fallbackToVSCodeConfig = configOptions === null;

    this.loggingService.logInfo(
      fallbackToVSCodeConfig
        ? "No local configuration (i.e. .prettierrc or .editorconfig) detected, falling back to VS Code configuration"
        : "Detected local configuration (i.e. .prettierrc or .editorconfig), VS Code configuration will not be used"
    );

    const options: prettier.Options = {
      ...(fallbackToVSCodeConfig ? vsCodeConfig : {}),
      ...{
        /* cspell: disable-next-line */
        filepath: fileName,
        parser: parser as prettier.BuiltInParserName,
      },
      ...(rangeFormattingOptions || {}),
      ...(configOptions || {}),
    };

    return { options };
  }

  /**
   * Check if a given file has an associated prettier config.
   * @param filePath file's path
   */
  public async checkHasPrettierConfig(filePath: string) {
    const { config, error } = await this.resolveConfig(filePath);
    if (error) {
      throw error;
    }
    return config !== null;
  }

  /**
   * Resolves the prettier config for the given file.
   *
   * @param filePath file's path
   */
  private async resolveConfig(
    filePath: string,
    options?: prettier.ResolveConfigOptions
  ): Promise<IResolveConfigResult> {
    try {
      const config = await prettier.resolveConfig(filePath, options);
      return { config };
    } catch (error) {
      return { config: null, error };
    }
  }
}
