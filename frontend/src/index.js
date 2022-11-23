import dev from "./model/dev";
import Socket, { sockets, users } from "./model/Socket";
import protobuf from "protobufjs";

/* Use Protobuf Fields */
const { Field, Message } = protobuf;
Field.d(1, "fixed64", "required")(Message.prototype, "id");
Field.d(2, "fixed64", "required")(Message.prototype, "nickname");
Field.d(3, "fixed64", "required")(Message.prototype, "grant");
Field.d(4, "fixed64", "required")(Message.prototype, "pox");
Field.d(5, "fixed64", "required")(Message.prototype, "poy");
Field.d(6, "fixed64", "required")(Message.prototype, "poz");
Field.d(7, "fixed64", "required")(Message.prototype, "roy");

/* variables */
let wrap;
let input;
let button;
let socket;

const initializer = (e) => {
  showLoginModal();
  createSocket();
};
window.addEventListener("load", initializer);
window.addEventListener("click", handleLogin);

/* About View / Render */
function createSocket() {
  socket = new Socket();
}
function showLoginModal() {
  wrap = document.createElement("div");
  input = document.createElement("input");
  button = document.createElement("button");
  wrap.append(input, button);
  input.id = "nickname";
  input.placeholder = "nickname";
  button.id = "submit";
  button.innerText = "로그인";
  wrap.id = "login";
  document.body.insertAdjacentElement("beforeend", wrap);
}

/* EventHandlers */
function handleLogin(e) {
  e.preventDefault();
  const target = e.target;
  if (target.id !== "submit") return;

  if (socket && input.value !== "") {
    socket.send(input.value);
    wrap.remove();
    wrap = null;
    input = null;
    button = null;
  }
}

/* About Canvas Rendering */
function updateUserRender() {
  for (const user of users.values()) {
  }
}
function render(time) {
  const frame = (time += 0.001);
  updateUserRender();
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
