import * as vscode from 'vscode';
import { Node, Tree } from './tree';
import * as path from 'path';


export class NodeProvider implements vscode.TreeDataProvider<Node> {
    private _onDidChangeTreeData: vscode.EventEmitter<Node | undefined> = new vscode.EventEmitter<Node | undefined>();
    readonly onDidChangeTreeData: vscode.Event<Node | undefined> = this._onDidChangeTreeData.event;

    public refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    private getIconForNode(node: Node) {
        let lightIcon: string;
        let darkIcon: string;
        console.log("----->" + node.type);
        switch(node.type){
            case "NFile":
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', 'package.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', 'package.png');
                break;
            case "NTheory":
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', 'folder.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', 'folder.png');
                break;
            case "NTransformation":
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', 'multitool.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', 'multitool.png');
                break;
            case "NGoal":
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', node.proved ? 'accept.png' : 'help.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', node.proved ? 'accept.png' : 'help.png');
                break;
            case "NProofAttempt": /* TODO: incomplete */
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', 'magic_wand_2.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', 'magic_wand_2.png');
                break;
            default:
                lightIcon = path.join(__filename,'..','..', 'media', 'fatcow', 'script.png');
                darkIcon  = path.join(__filename,'..','..', 'media', 'fatcow', 'script.png');
        }

        return { light: lightIcon, dark: darkIcon };
    }

    public getTreeItem(node: Node): vscode.TreeItem {
        let item: vscode.TreeItem =
         {
            id: String(node.id),
            label: node.name,
            iconPath: this.getIconForNode(node),
            collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
            contextValue: 'goal'
        };
        item.command = {
            command: "why3.getTask",
            title: "Get Task for Node",
            arguments: [node.id]
        };
        // item.command = {
        //     command:"why3.transformation",
        //     title:"Transformation for selected node",
        //     arguments:[node.id]
        // };

        return item;
    }

    public getChildren(node?: Node): Node[] {
        return node ? Tree.getChildren(node) : Tree.roots;
    }

    public getParent(node: Node): Node | null {
        return node.id === 0 ? null : Tree.getNode(node.parentId);
    }
}