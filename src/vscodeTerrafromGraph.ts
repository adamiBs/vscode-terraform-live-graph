import * as vscode from 'vscode';
import { promisify } from 'util';
import { execFile } from 'child_process';
import { toStream } from 'ts-graphviz/adapter';
const execFilePromise = promisify(execFile);

export default class VSCodeTerraformGraph {
    public static async graphExecutionWrapper(workspaceFolder: string | undefined): Promise<void> {
        if (!workspaceFolder) {
          vscode.window.showErrorMessage('No workspace folder found.');
          return;
        }
      
        const command = 'terraform';
        const args = ['graph'];
        const options = { cwd: workspaceFolder };
        try {
          const { stdout, stderr } = await execFilePromise(command, args, options) as { stdout: string, stderr: string };
      
          if (stderr) {
            vscode.window.showWarningMessage(`'terraform graph' produced some output on stderr: ${stderr}`);
          }
          this.drawGraph(stdout);
        } catch (err: any) {
          vscode.window.showErrorMessage(`Failed to run 'terraform graph'. Please double check that terraform CLI is installed. Visit [README.md](https://github.com/adamiBs/vscode-terraform-live-graph) for installation instructions. Error message: ${err.message}`);
        }
      }
    private static async drawGraph(graphData: string): Promise<void> {
      const panel = vscode.window.createWebviewPanel(
        'catCoding', // Identifies the type of the webview. Used internally
        'Terraform Live Graph', // Title of the panel displayed to the user
        vscode.ViewColumn.Two,
        {} // Webview options. More on these later.
      );
      const webViewContent = await this.getWebviewContent(graphData);
      panel.webview.html = webViewContent;
      vscode.window.showInformationMessage(`'terraform graph' output:\n${graphData}`);
    }

    private static async streamToString(stream: NodeJS.ReadableStream): Promise<string> {
      const chunks: Array<any> = []
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      })
    }

    private static async getWebviewContent(graphData: string): Promise<string> {
      let g = await this.streamToString(await toStream(graphData, { format: 'svg' }));
      g = g.replace(/width=\"[0-9]+pt\"/, "width=\"width\"");
      const webpage = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width-width, initial-scale=1.0">
          <title>Terraform Live Graph</title>
      </head>
      <body>
        ${g}
      </body>
      </html>`

      return webpage;
    }
}

