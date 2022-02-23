import { writeFile } from "fs";
import * as path from "path";
import { format, Options } from "prettier";
import { promisify } from "util";
import { Uri } from "vscode";
import { LoggingService } from "./LoggingService";

const writeFileAsync: (
  filePath: string,
  data: string,
  encoding: "utf8"
) => Promise<void> = promisify(writeFile);

export class TemplateService {
  constructor(private loggingService: LoggingService) {}
  public async writeConfigFile(folderPath: Uri) {
    const settings = { tabWidth: 2, useTabs: false };

    const outputPath = path.join(folderPath.fsPath, ".prettierrc");

    const formatterOptions: Options = {
      /* cspell: disable-next-line */
      filepath: outputPath,
      tabWidth: settings.tabWidth,
      useTabs: settings.useTabs,
    };

    const templateSource = format(
      JSON.stringify(settings, null, 2),
      formatterOptions
    );

    this.loggingService.logInfo(`Writing .prettierrc to '${outputPath}'`);
    await writeFileAsync(outputPath, templateSource, "utf8");
  }
}
