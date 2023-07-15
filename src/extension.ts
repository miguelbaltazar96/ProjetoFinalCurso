// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as server from './server';
import TaskProvider from './taskProvider';
import * as commands from './commands';
import { NodeProvider } from './nodeProvider';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('Congratulations, your extension "panoramix" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const nodeProvider: NodeProvider = new NodeProvider();
	const taskProvider = new TaskProvider();


	let disposable = [
		/* commands */
		vscode.commands.registerCommand('why3.command', commands.commands,nodeProvider),
		vscode.commands.registerCommand('why3.start', commands.sessionStart, nodeProvider),
		vscode.commands.registerCommand('why3.stop', commands.sessionStop),
		vscode.commands.registerCommand('why3.save', commands.sessionSave),

		/* task provider */
		vscode.workspace.registerTextDocumentContentProvider(TaskProvider.taskScheme, taskProvider),
		/* tree provider */

		vscode.window.registerTreeDataProvider('proof-tree', nodeProvider),
		vscode.commands.registerCommand('why3.getTask', commands.getTaskForNode, nodeProvider),
	];

	disposable.forEach(d => {
		context.subscriptions.push(d);
	});

	//context.subscriptions.push(vscode.window.createTreeView('proof-tree', {treeDataProvider: nodeProvider}));

	/*context.subscriptions.push(vscode.window.registerTreeDataProvider('proof-tree', nodeProvider));
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(TaskProvider.taskScheme, taskProvider));*/

	//context.subscriptions.push(vscode.window.registerTreeDataProvider('proof-tree',nodeProvider));


	/*let result = await webReq.sendWebRequest(webReq.scripts.request, webReq.requests.getTask, 3);

	let task;
	for (let i = 0; i < result.length; i++) {
		if (result[i].task !== undefined) {
			task = result[i].task;
			break;
		}
	}
	let uri = vscode.Uri.parse(TaskProvider.taskScheme + ":Task?" + task);
	let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
	vscode.languages.setTextDocumentLanguage(doc, 'whyml');
	await vscode.window.showTextDocument(doc, { preserveFocus: true, preview: false, viewColumn: vscode.ViewColumn.Beside });*/
}

// this method is called when your extension is deactivated
export function deactivate() {
	// stop the server when the extension is deactivated
	server.stop();
}
