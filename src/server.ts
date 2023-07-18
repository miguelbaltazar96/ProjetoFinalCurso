import * as vscode from 'vscode';
import { execFile, ChildProcess } from 'child_process';
import * as cron from 'cron';
import { processNotifications } from './notificationsClient';
import { NodeProvider } from './nodeProvider';


var process: ChildProcess | undefined;

export function start() {
  if (!process) {
    console.log("Starting server...");
    if (vscode.window.activeTextEditor) {
      const args = ["webserver", "-L", ".", vscode.window.activeTextEditor.document.fileName];
      let why3Path: string | undefined = vscode.workspace.getConfiguration().get('why3.path');
      let why3;
      if (why3Path) {
        why3 = why3Path;
      } else {
        why3 = 'why3';
      }
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders && workspaceFolders.length > 0) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        process = execFile(why3, args, { cwd: rootPath });
      }
    }
  }
}

export function stop() {
  if (process) {
    process.kill();
    process = undefined;
  }
}

export function notificationsDaemon(nodeProvider: NodeProvider) {
  if (process=== undefined) {
    //console.log("Starting notifications daemon:" + process);
    //let job = new cron.CronJob('* * * * * *', function () {
    processNotifications(nodeProvider);
    //nodeProvider.refresh();
    //   }, null, true, 'Europe/Lisbon');
    //   job.start();
  }
}