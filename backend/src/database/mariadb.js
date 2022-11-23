import maria from "mysql2";
import dev from "../model/dev.js";
import dbconf from "./dbconf.js";
// import config from "./db.conf";

let conn = null;

const connectionHandler = () => {
  // 재귀 함수 실행 시 변수 재정의
  conn = maria.createConnection(dbconf);

  conn.connect((error) => {
    conn.on("error", (errorEvent) => {
      if (errorEvent.code === "PROTOCOL_CONNECTION_LOST") {
        conn.destroy();
        dev.log("DB CONNECTION RESTART!!");
        connectionHandler();
      } else {
        throw errorEvent;
      }
    });
  });

  conn.on("connect", (connection) => {
    dev.log("master handshake id →", connection.connectionId);
    dev.log("DB Connected!");
  });

  return conn;
};

function keepAlive() {
  // NOTICE: mariadb.js 데이터베이스 유지 위한 ping 보내기 / 김경남 EM
  if (conn) {
    conn.ping((err) => {
      if (err) {
        dev.log("master ping!");
        if (err.fatal) {
          dev.error("MASTER DB 연결에 문제가 발생했습니다.");
        }
        connectionHandler();
      }
    });
  }
}

setInterval(keepAlive, 5000);

conn = connectionHandler();

export default conn;
