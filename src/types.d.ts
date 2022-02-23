import * as prettier from "prettier";

type PrettierModule = typeof prettier;

type TrailingCommaOption = "none" | "es5" | "all";

export type PackageManagers = "npm" | "yarn" | "pnpm";

/**
 * prettier-vscode specific configuration
 */
interface IExtensionConfig {
  /**
   * Path to '.prettierignore' or similar.
   */
  ignorePath: string;
  /**
   * Path to prettier module.
   */
  prettierPath: string | undefined;
  /**
   * Path to prettier configuration file.
   */
  configPath: string | undefined;
  /**
   * If true will skip formatting if a prettier config isn't found.
   */
  requireConfig: boolean;
  /**
   * The package manager to use when resolving global modules.
   */
  packageManager: PackageManagers;
  /**
   * Array of language IDs to ignore
   */
  disableLanguages: string[];
  /**
   * If true, take into account the .editorconfig file when resolving configuration.
   */
  useEditorConfig: boolean;
  /**
   * If true, this extension will attempt to use global npm or yarn modules.
   */
  resolveGlobalModules: boolean;
  /**
   * If true, this extension will process files in node_modules
   */
  withNodeModules: boolean;
}
/**
 * Configuration for prettier-vscode
 */
export type PrettierVSCodeConfig = IExtensionConfig & prettier.Options;

type LogLevel = "error" | "warn" | "info" | "debug" | "trace";
