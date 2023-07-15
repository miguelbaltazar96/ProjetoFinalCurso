import * as net from 'net';
import * as notifa from './notificationsClient';

const hostname = 'localhost';
const port = 6789;

export interface TaskObject {
  locList?: Loclist[];
  nodeID?: number;
  notification?: string;
  task: string;
}

interface Loclist {
  color: string;
  loc: Loc;
}

interface Loc {
  col1: number;
  col2: number;
  file: string;
  line: number;
}

export enum Scripts {
  request = 'request',
  getNotifications = 'getNotifications',
}

export enum Requests {
  listProvers = 'list-provers',
  getTask = 'gettask_',
  reload = 'reload',
  command = 'command=',
}

export enum Commands {
  interrupt = 'interrupt',
  listTransforms = 'list-transforms',
  listProvers = 'list-provers',
  listStrategies = 'list-strategies',
  print = 'print',
  search = 'search',
  searchAll = 'search_all',
}

function createRequest(uri: string): Promise<any> {
  console.log(`Sending request to ${hostname}:${port}${uri}`);
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: hostname, port: port }, () => {
      const request = `GET /${uri} HTTP/1.1\r\nHost: ${hostname}:${port}\r\nConnection: close\r\n\r\n`;
      //console.log(request);
      socket.write(request);
    });

    let responseData = '';

    socket.on('data', (data) => {
      responseData += data.toString();
    });

    socket.on('end', () => {
        let json = JSON.parse(responseData.toString().split("\n\n")[1]);
        console.log(JSON.stringify(json));
        resolve(json);
    });

    socket.on('error', (error) => {
      reject(error);
    });
  });
}

export async function sendWebRequest(
  script: Scripts,
  request?: Requests,
  task?: number,
  command?: { id: number; command: Commands }
) {
  let uri = script.toString();
  if (request) {
    uri += '?' + request;
    if (request === Requests.getTask && task) {
      uri += task;
    } else if (request === Requests.command && command) {
      uri += command.id + ',' + command.command;
    }
  }

  try {
    const result = await createRequest(uri);
    notifa.processNotifications(result);
  } catch (error) {
    console.error(error);
  }
}

export async function getNotifications() {
  return createRequest(Scripts.getNotifications);
}
