import { Readable } from "node:stream";
import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer, createWebSocketStream } from "ws";
import { messageHandlers } from "./src/handlers/message-handler.js";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("connected");
  const stream = createWebSocketStream(ws, { encoding: "utf-8" });
  stream.on("data", (message) => {
    let returnMessage = message;
    try {
      returnMessage = messageHandler(message);
    } catch (err) {
      console.log(err);
    }
    ws.send(returnMessage);
  });

  ws.on("close", () => {
    console.log("disconnected");
  });
});
