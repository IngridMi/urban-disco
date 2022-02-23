import { Uri } from "vscode";
import { LoggingService } from "./LoggingService";
import { getConfig, getWorkspaceRelativePath } from "./util";

export class IgnorerResolver {
  constructor(private loggingService: LoggingService) {}

  public getIgnorePath(fsPath: string): string | undefined {
    const absolutePath = this.getIgnorePathForFile(
      fsPath,
      getConfig(Uri.file(fsPath)).ignorePath
    );
    this.loggingService.logInfo(
      `Using ignore file (if present) at ${absolutePath}`
    );
    return absolutePath;
  }

  private getIgnorePathForFile(
    filePath: string,
    ignorePath: string
  ): string | undefined {
    // Configuration `prettier.ignorePath` is set to `null`
    if (!ignorePath) {
      return;
    }
    return getWorkspaceRelativePath(filePath, ignorePath);
  }
}
