import http from "node:http";
import { usersData } from "../database/data.js";

const APPLICATION_JSON_TYPE = { "Content-Type": "application/json" };

const handlers = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  if (request.url === "/api/users" && request.method === "GET") {
    response.writeHead(200, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify(usersData));
  } else if (
    request.url.startsWith("/api/users/") &&
    request.method === "GET"
  ) {
    if (!request.url.match(/\/api\/users\/([a-z]+)/)) {
      response.writeHead(400, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify({ message: "userId is not a valid uuid" }));
    } else {
      const id = request.url.split("/")[3];

      const user = usersData.find((item) => item.id === id);
      if (!user) {
        response.writeHead(404, APPLICATION_JSON_TYPE);
        response.end(
          JSON.stringify({ message: `user with id: ${id} doesn't exist` })
        );
      } else {
        response.writeHead(200, APPLICATION_JSON_TYPE);
        response.end(JSON.stringify(user));
      }
    }
  } else if (request.url === "/api/users" && request.method === "POST") {
    response.writeHead(200, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify(usersData));
  } else {
    response.writeHead(404, APPLICATION_JSON_TYPE);
    response.end(
      JSON.stringify({ message: "You tried to access not existing route" })
    );
  }
};

export { handlers };
