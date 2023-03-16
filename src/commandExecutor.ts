import * as vscode from 'vscode';
import { spawn, ChildProcess } from 'child_process';

export default class CommandExecutor {
    private static async executeCommand(command: string, args: string, workingDirectory?: string, stdin?: string): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        let cwd = ''
        if (workingDirectory) {
            cwd = workingDirectory;
        }
        const childProcess: ChildProcess = spawn(command, args.split(' '), { cwd });

        let stdoutData = '';
        let stderrData = '';

        if (stdin && childProcess.stdin) {
            childProcess.stdin.write(stdin);
            childProcess.stdin.end();
        }

        if (childProcess.stdout) {
            childProcess.stdout.on('data', (data) => {
                stdoutData += data.toString();
            });
        }
        
        if (childProcess.stderr) {
            childProcess.stderr.on('data', (data) => {
                stderrData += data.toString();
            });
        }

        childProcess.on('error', (error) => {
            stderrData+= error.message;
        });

        childProcess.on('close', (code) => {
        if (code === 0) {
            resolve(stdoutData.trim());
        } else {
            vscode.window.showErrorMessage(`Unexpected error: ${stderrData.trim()}`);
        }
        });
      });
    }


    public static async executeTerraformGraphCommand(workspaceFolder: string | undefined): Promise<string> {
        return await this.executeCommand('terraform', 'graph', workspaceFolder);
      }

      public static async executeDotGraphCommand(graphData: string): Promise<string> {
        return await this.executeCommand('dot', '-Tsvg', undefined, graphData);
    }
}

