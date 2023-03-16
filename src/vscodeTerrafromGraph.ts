import * as vscode from 'vscode';
import CommandExecutor from './commandExecutor';

export default class VSCodeTerraformGraph {
    public static async graphExecutionWrapper(workspaceFolder: string | undefined, graphWebviewPanel: vscode.WebviewPanel): Promise<void> {
        if (!workspaceFolder) {
          vscode.window.showErrorMessage('No workspace folder found.');
          return;
        }
        await this.updateWebviewContent(workspaceFolder, graphWebviewPanel);

        this.registerFileWatcher(workspaceFolder, graphWebviewPanel);
      }

      private static registerFileWatcher(workspaceFolder: string | undefined, graphWebviewPanel: vscode.WebviewPanel): void {
        const fileWatcher = vscode.workspace.createFileSystemWatcher("**/*.tf");
        fileWatcher.onDidChange(async () => {
          await this.updateWebviewContent(workspaceFolder, graphWebviewPanel);
        });
      }
    
    private static async updateWebviewContent(workspaceFolder: string | undefined, graphWebviewPanel: vscode.WebviewPanel): Promise<void> {
      graphWebviewPanel.webview.html = await this.getWebviewContent(workspaceFolder);
    }

    private static async getWebviewContent(workspaceFolder: string | undefined): Promise<string> {
      const graphData = await CommandExecutor.executeTerraformGraphCommand(workspaceFolder);
      const dotSvg = await CommandExecutor.executeDotGraphCommand(graphData);
      return this.buildWebViewHTML(dotSvg);
    }

    private static buildWebViewHTML(svgGraph: string) : string {
      svgGraph = svgGraph.replace(/width=\"[0-9]+pt\"/, "width=\"width\"");
      const webpage = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Terraform Live Graph</title>
        </head>
        <body>
          ${svgGraph}
        </body>
        </html>`;

      return webpage;
    }
}

