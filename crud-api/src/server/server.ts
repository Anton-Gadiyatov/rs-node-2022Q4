import http from "node:http";
import { handlers } from "../handlers/handlers.js";

const createServer = (port: number) => {
  const server = http.createServer(handlers).listen(port, () => {
    console.log(`Server is listening on PORT: ${port}`);
  });
  return server;
};

export { createServer };
