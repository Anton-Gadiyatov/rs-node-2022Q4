import { Readable } from "node:stream";
import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { messageHandlers } from "./src/handlers/message-handlers.js";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("connected");
  ws.on("message", (data) => {
    let message = "";
    const readable = Readable.from(data);

    readable.on("data", (chunk) => {
      message += chunk;
    });

    readable.on("end", () => {
      try {
        const returningMessage = messageHandlers(message);
        ws.send(returningMessage);
      } catch (err) {
        console.log(err);
        ws.send(message);
      }
    });
    //     console.log(message.toString());
    //     (async () => {
    //       await mouse.move(left(10));
    //     })();
    //
  });
});
