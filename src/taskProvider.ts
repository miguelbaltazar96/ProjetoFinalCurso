import * as vscode from 'vscode';

export default class TaskProvider implements vscode.TextDocumentContentProvider {
    static taskScheme = 'task';

    // emitter and its event
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
        // // connect to why3server socket
        // let client: net.Socket = net.createConnection("/tmp/whycenas");
        // client.on("connect", function () {
        // 	vscode.window.showInformationMessage('Liguei-me ao servidor do Porquê3!');
        // });
        // client.on('data', function (data) {
        // 	let coisas: socketComm.Answer = socketComm.readAnswer(data.toString());
        // 	vscode.window.showInformationMessage(data.toString());
        // 	console.log(socketComm.printAnswer(coisas));
        // 	vscode.window.showInformationMessage(socketComm.printAnswer(coisas));
        // });
        // client.on('error', function (exception) {
        // 	vscode.window.showErrorMessage(exception.message);
        // });
        // // run;<id>;<timelimit>;<memlimit>;<CMD>+\n;
        // // runstdin;<id>;<timelimit>;<memlimit>;<CMD>+;<s>\n;
        // // client.write("run;0;5;1000;ls\n");
        // client.write("{\"} \"open file /home/hollowman/wtf/goal/main.mlw\"\n");
        // client.write("command \"list-prover\"\n");


        //return uri.path;
        return uri.query;
    }
}