import * as vscode from 'vscode';
import { getNotifications, sendWebRequest } from './webRequests';
import { Tree, Node } from './tree';
import { NodeProvider } from './nodeProvider';
import * as TaskProvider from './taskProvider';

declare namespace Notification {
    export interface Loc {
        col1: number;
        col2: number;
        file: string;
        line: number;
    }

    export interface RelLoc {
        col1: number;
        col2: number;
        file: string;
        line: number;
    }

    export interface Message {
        information: string;
        mess_notif: string;
        error: string;
        loc: Loc;
        rel_loc: RelLoc;
        node_ID?: number;
        qinfo: string;
        qerror: string;
    }

    export interface Update {
        proved: boolean;
        update_info: string;
    }

    export interface RootObject {
        notification: string;
        message: Message;
        detached?: boolean;
        name: string;
        node_ID?: number;
        node_type: string;
        parent_ID?: number;
        update: Update;
        content: string;
        file: string;
        loc_list: any[];
        task: string;
    }
}

export async function processNotifications(nodeProvider: NodeProvider): Promise<void> {
    let notifications;
    let flag = true;
    while (flag) {
        try {
            notifications = await getNotifications();
            flag = false;
        } catch (_) {
            flag = true;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    notifications.forEach(async (n: Notification.RootObject) => {
        switch (n.notification) {
            case "New_node":
                console.log("New node");
                console.log("parent->" + n.parent_ID);
                console.log("node->" + n.node_ID);
                console.log("name->" + n.name);
                console.log("type->" + n.node_type);
                console.log("detached->" + n.detached);

                if ((n.node_ID !== undefined) && (n.parent_ID !== undefined) && (n.detached !== undefined)) {
                    Tree.setNode({
                        id: n.node_ID,
                        parentId: n.parent_ID,
                        name: n.name,
                        type: n.node_type,
                        detached: n.detached,
                        proved: false
                    });
                }
                break;
            case "Node_change":
                console.log("Node change");
                console.log("->" + n.node_ID);
                if ((n.node_ID !== undefined) && (n.update !== undefined)) {
                    switch (n.update.update_info) {
                        case "Proved":
                            let node = Tree.getNode(n.node_ID);
                            node.proved = n.update.proved;
                            Tree.setNode(node);
                            break;
                    }
                }
                break;
            case "Message":
                vscode.window.showInformationMessage('Message: ' + n.message.information);
                break;
            case "File_contents":
                console.log("File contents"); /*FIXME: do something here xD */
                Tree.setNode({
                    id: 0,
                    parentId: -1,
                    name: n.file,
                    type: 'file',
                    detached: true,
                    proved: false
                });
                console.log("->" + n.node_ID);
                break;
            case "Reset_whole_tree":
                console.log("->" + n.node_ID);
                console.log("Reset Whole Tree"); /*FIXME: do something here xD */
                break;
            case "Task":
                let task = n.task;
                let uri = vscode.Uri.parse(TaskProvider.default.taskScheme + ":Task?" + task);
                let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
                vscode.languages.setTextDocumentLanguage(doc, 'whyml');
                await vscode.window.showTextDocument(doc, { preserveFocus: true, preview: false, viewColumn: vscode.ViewColumn.Beside });
                break;
        }
    });
    nodeProvider.refresh();
}