import * as net from 'net';

// if other properties are present besides id it means that we are in the presence of a finished task
export interface Answer {
  id: number;
  time?: number;
  timeout?: boolean;
  outFile?: string;
  exitCode?: number;
}

export function readSocket(socket: net.Socket, nb: number, cb: (buf: Buffer) => void) {
  var r = socket.read(nb);
  if (r === null) {
    socket.once('readable', function () {
      readSocket(socket, nb, cb);
    });
    return;
  }
  cb(r);
}

function readLinesBlocking(socket: net.Socket) {
  const buf: Buffer = socket.read();
  const s = buf.toString();
  if (s === "") {
    return [];
  }
  else {
    if (s.includes("\n")) {

    }
  }
}

//type id exitCode; timeout e
//F;0;1;0.00;0;CENAS
export function readAnswer(response: String): Answer {
  let splitted = response.split(";", 5);
  let id: number = Number.parseInt(splitted[1]);
  let exitCode: number, time: number, timeout: boolean;
  if (splitted[0] === "S") {
    return { id: id };
  } else {
    let splittedName = response.split(";");
    let outFile: string = "";
    for (let i = 0; i < splittedName.length - splitted.length; i++) {
      outFile += splittedName[i + splitted.length];
    }
    exitCode = +splitted[2];
    time = +splitted[3];
    if (splitted[4] === "1") {
      timeout = true;
    } else {
      timeout = false;
    }
    return { id: id, time: time, timeout: timeout, outFile: outFile, exitCode: exitCode };
  }
}

export function printAnswer(a: Answer): string {
  let res = "id: " + a.id + "\n";
  if (a.time && a.exitCode && a.outFile) {
    res = "--- Finished ---\n" + res;
    res += "Exit Code: " + a.exitCode + "\n";
    res += "Time: " + a.time + "\n";
    res += "OutputFile: " + a.outFile + "\n";
    //res += "Timeout: " +
  } else {
    res = "--- Started ---\n" + res;
  }

  return res;
}
