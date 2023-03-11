import * as vscode from 'vscode';
import { promisify } from 'util';
import { execFile } from 'child_process';
import { toStream } from 'ts-graphviz/adapter';
const execFilePromise = promisify(execFile);

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
      const graphData = await this.getTerraformGraphData(workspaceFolder);
      let svgGraph = await this.streamToString(await toStream(graphData, { format: 'svg' }));
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

    private static async getTerraformGraphData(workspaceFolder: string | undefined): Promise<string> {
      const command = 'terraform';
      const args = ['graph'];
      const options = { cwd: workspaceFolder };
      let res: string = '';
      try {
        const { stdout, stderr } = await execFilePromise(command, args, options) as { stdout: string, stderr: string };
        res = stdout;
    
        if (stderr) {
          vscode.window.showWarningMessage(`'terraform graph' produced some output on stderr: ${stderr}`);
        }
        
      } catch (err: any) {
        res = err;
        vscode.window.showErrorMessage(`Failed to run 'terraform graph'. Please double check that terraform CLI is installed. Visit [README.md](https://github.com/adamiBs/vscode-terraform-live-graph) for installation instructions. Error message: ${err.message}`);
      } finally {
        return res;
      }
    }

    private static async streamToString(stream: NodeJS.ReadableStream): Promise<string> {
      const chunks: Array<any> = []
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      })
    }
}

