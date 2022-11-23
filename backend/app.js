import uWs from "uWebSockets.js";
import dotenv from "dotenv";
import path from "path";
import dev from "./src/model/dev.js";
import conn from "./src/database/mariadb.js";

/* 기본 변수 */
/** @type {'development'|'production'} mode test */
const __dirname = path.resolve();
dotenv.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const { HOST: host, PORT: port } = process.env;

const app = uWs
  .App({})
  .ws("/*", {
    compression: uWs.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    upgrade(res, req, context) {
      console.log(res);
      console.log(req);
      console.log(context);
      res.upgrade(
        {
          url: req.getUrl(),
        },
        /* Spell these correctly */
        req.getHeader("sec-websocket-key"),
        req.getHeader("sec-websocket-protocol"),
        req.getHeader("sec-websocket-extensions"),
        context
      );
    },
    open(ws) {
      console.log(ws);
      console.log("open socket server!");
      // conn.query("select * from user");
    },
    message(ws, message, isBinary) {
      if (isBinary) {
        console.log(message, isBinary);
      } else {
        console.log(message);
      }
    },
    drain(ws) {
      console.log("backpressure:", ws.getBufferedAmount(), "bytes");
    },
    close(ws) {
      console.log(ws);
    },
  })
  .get("/", (res, req) => {
    res
      .writeHeader("Content-Type", "text/html; charset=utf-8")
      .end("서버 열림");
  })
  .listen(Number(port), (token) => {
    if (token) {
      dev.log("token", token);
      console.log("listening on port:", port);
    } else {
      console.log("fail to open the socket server!");
    }
  });
