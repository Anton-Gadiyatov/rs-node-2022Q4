import http from "node:http";
import * as usersController from "../controllers/usersController.js";
import { usersData } from "../database/data.js";
import { APPLICATION_JSON_TYPE } from "../types/constants/constants.js";
import { getPostData } from "../utils/getPostData.js";

const handlers = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  if (request.url === "/api/users" && request.method === "GET") {
    usersController.getUsers(request, response);
  } else if (
    request.url.startsWith("/api/users/") &&
    request.method === "GET"
  ) {
    usersController.getUser(request, response);
  } else if (request.url === "/api/users" && request.method === "POST") {
    usersController.createUser(request, response);
  } else if (
    request.url.startsWith("/api/users/") &&
    request.method === "PUT"
  ) {
    usersController.updateUser(request, response);
  } else {
    response.writeHead(404, APPLICATION_JSON_TYPE);
    response.end(
      JSON.stringify({ message: "You tried to access not existing route" })
    );
  }
};

export { handlers };
