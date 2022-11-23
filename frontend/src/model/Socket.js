import dev from "./dev";

const host = import.meta.env.V_SOCKET_HOST;
const port = import.meta.env.V_SOCKET_PORT;

const sockets = new Map();
const users = new Map();

let retry = false;

class Socket {
  ws;
  constructor() {
    this.connection.call(this);
  }
  connection() {
    if (retry) {
      dev.log("retry connection");
    } else {
      dev.log("first connection");
    }
    const ws = new WebSocket(`ws://${host}:${port}/${location.search}`);
    ws.binaryType = "arraybuffer";
    ws.onopen = (e) => {
      dev.log(e);
    };
    ws.onmessage = (e) => {
      dev.log(e);
    };
    ws.onerror = (e) => {
      retry = true;
      dev.error(e);
      dev.error("socket error");
      this.connection();
    };
    ws.onclose = (e) => {
      retry = true;
      dev.error("socket is closed");
      this.connection();
    };
    this.ws = ws;
  }

  send(message) {
    this.ws.send(message);
  }
}

export default Socket;
export { sockets, users };
