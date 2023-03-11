import * as vscode from 'vscode';
import VSCodeTerraformGraph from './vscodeTerrafromGraph';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('terraform-live-graph.generateGraphView', async () => {
		const workspaceFolderPath = vscode.workspace.workspaceFolders?.[0].uri.path;
		
		const panel =  vscode.window.createWebviewPanel(
			'tfGraphView',
			'Terraform Live Graph',
			vscode.ViewColumn.Beside,
			{}
		);

		await VSCodeTerraformGraph.graphExecutionWrapper(workspaceFolderPath, panel);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
