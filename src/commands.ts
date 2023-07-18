import * as vscode from 'vscode';
import * as server from './server';
import { NodeProvider } from './nodeProvider';
import * as TaskProvider from './taskProvider';
import * as webReq from './webRequests';
import * as basicInput from './basicInput';
import * as notifca from './notificationsClient';

export async function transformation() {
    basicInput.showInputBox();
}

export async function sessionStart(this: NodeProvider) {
     //server.start();
     await (async () => new Promise(resolve => {
         setTimeout(resolve, 2000);
     }))();
     console.log("Starting notifications daemon");
     server.notificationsDaemon(this);
    vscode.window.showInformationMessage(`Proofing session started`);
}

export function sessionStop() {
    server.stop();
    vscode.window.showInformationMessage(`Proofing session stopped`);
}

export function sessionSave() {
    /*FIXME: not implemented yet */
    vscode.window.showInformationMessage(`Proofing session saved`);
}

export async function getTaskForNode(id: number){
    webReq.sendWebRequest(webReq.Scripts.request, webReq.Requests.getTask, id);
    //console.log(result);

    /*let task;
	for (let i = 0; i < result.length; i++) {
		if (result[i].task !== undefined) {
			task = result[i].task;
			break;
		}
	}xx
    let uri = vscode.Uri.parse(TaskProvider.default.taskScheme + ":Task?" + task);
	let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
	vscode.languages.setTextDocumentLanguage(doc, 'whyml');
    await vscode.window.showTextDocument(doc, { preserveFocus: true, preview: false, viewColumn: vscode.ViewColumn.Beside });*/
}

export async function commands(id: number){
    let commandName = basicInput.commandPick();
    //let commandId = basicInput.subCommandPick();
    webReq.sendWebRequest(webReq.Scripts.request, webReq.Requests.command, id,{id:0,command:webReq.Commands.listProvers});

    /*let task;
	for (let i = 0; i < result.length; i++) {
		if (result[i].task !== undefined) {
			task = result[i].task;
			break;
		}
	}xx
    let uri = vscode.Uri.parse(TaskProvider.default.taskScheme + ":Task?" + task);
	let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
	vscode.languages.setTextDocumentLanguage(doc, 'whyml');
    await vscode.window.showTextDocument(doc, { preserveFocus: true, preview: false, viewColumn: vscode.ViewColumn.Beside });*/
}

