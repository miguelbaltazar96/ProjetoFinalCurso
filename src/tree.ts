import * as vscode from "vscode";
import {NodeProvider} from './nodeProvider';

export interface Node {
    id: number;
    name: string;
    detached: boolean;
    parentId: number;
    type: string;
    proved: boolean;
}

/*FIXME export class NodeItem extends vscode.TreeItem{
    node: Node;

    constructor(collapsibleState: vscode.TreeItemCollapsibleState, label: string, node: Node){
        super(label,collapsibleState);
        this.node = node;
    }
}*/

export class Tree {
    static singleton = new Tree();
    /**
     * Event that is fired when an element is expanded*/


     constructor() {
         const nodeProvider = new NodeProvider();
         /*this,context = context;
         this.context.subscriptions.push(vscode.window.createTreeView('test-tree', {treeDataProvider: nodeProvider}) ;*/
         vscode.window.createTreeView('proof-tree',{treeDataProvider: nodeProvider});
     }


    nodes: Node[] = [];

    static get roots(): Node[] {
        return [Tree.getNode(0)];
    }

    static getChildren(node: Node) {
        return this.singleton.nodes.filter(n => n.parentId === node.id);
    }

    static getNode(id: number) {
        return this.singleton.nodes[id];
    }

    static setNode(node: Node) {
        this.singleton.nodes[node.id] = node;
    }

}