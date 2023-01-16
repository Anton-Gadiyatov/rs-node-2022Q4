import { randomUUID } from "crypto";
import http from "http";
import { usersData } from "../database/data.js";
import { APPLICATION_JSON_TYPE } from "../types/constants/constants.js";
import { User } from "../types/user.js";
import { getPostData } from "../utils/getPostData.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../utils/validateUser.js";

const uuidRegexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getUsers = async (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  try {
    response.writeHead(200, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify(usersData));
  } catch (error) {
    console.log(error);
    response.writeHead(500, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
};

const getUser = (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  try {
    const id = request.url.split("/")[3];
    if (!id || !uuidRegexExp.test(id)) {
      response.writeHead(400, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify({ message: "userId is not a valid uuid" }));
    } else {
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
  } catch (error) {
    console.log(error);
    response.writeHead(500, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
};

const createUser = async (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  try {
    const data = await getPostData(request);
    const { username, age, hobbies } = JSON.parse(data) as Partial<User>;
    const isUserDataValid = validateCreateUser({ username, age, hobbies });
    if (!isUserDataValid) {
      response.writeHead(400, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify({ message: "User data is not valid" }));
    } else {
      const userData = { id: randomUUID(), username, age, hobbies } as User;
      usersData.push(userData);
      response.writeHead(200, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify(userData));
    }
  } catch (error) {
    console.log(error);
    response.writeHead(500, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
};

const updateUser = async (
  request: http.IncomingMessage,
  response: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) => {
  try {
    const id = request.url.split("/")[3];
    if (!id || !uuidRegexExp.test(id)) {
      response.writeHead(400, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify({ message: "userId is not a valid uuid" }));
    } else {
      const userIndex = usersData.findIndex((item) => item.id === id);
      const user = usersData[userIndex];
      if (!user) {
        response.writeHead(404, APPLICATION_JSON_TYPE);
        response.end(
          JSON.stringify({ message: `user with id: ${id} doesn't exist` })
        );
      } else {
        const data = await getPostData(request);
        const { username, age, hobbies } = JSON.parse(data) as Partial<User>;
        const isUserDataValid = validateUpdateUser({ username, age, hobbies });
        if (!isUserDataValid) {
          response.writeHead(400, APPLICATION_JSON_TYPE);
          response.end(JSON.stringify({ message: "User data is not valid" }));
        } else {
          const userData = {
            id,
            username: username || user.username,
            age: age || user.age,
            hobbies: hobbies || user.hobbies,
          } as User;
          usersData[userIndex] = userData;
          response.writeHead(200, APPLICATION_JSON_TYPE);
          response.end(JSON.stringify(userData));
        }
      }
    }
  } catch (error) {
    console.log(error);
    response.writeHead(500, APPLICATION_JSON_TYPE);
    response.end(JSON.stringify({ message: "Internal server error" }));
  }
};

export { getUsers, getUser, createUser, updateUser };
