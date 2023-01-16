import { randomUUID } from "crypto";
import http from "http";
import { usersData } from "../database/data.js";
import { APPLICATION_JSON_TYPE } from "../types/constants/constants.js";
import { User } from "../types/user.js";
import { getPostData } from "../utils/getPostData.js";
import { validateUser } from "../utils/validateUser.js";

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
    const data = (await getPostData(request)) as Partial<User>;
    const { username, age, hobbies } = data;
    const userData = { username, age, hobbies } as User;
    const isUserDataValid = validateUser(userData);
    if (!isUserDataValid) {
      response.writeHead(400, APPLICATION_JSON_TYPE);
      response.end(JSON.stringify({ message: "User data is not valid" }));
    } else {
      userData.id = randomUUID();
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

export { getUsers, getUser, createUser };

// const createProduct = async (request, response) => {
//   try {
//     const body = await getPostData(request);

//     const { title, description, price } = JSON.parse(body);

//     const product = {
//       title,
//       description,
//       price,
//     };
//     const newProduct = await Product.create(product);

//     response.writeHead(201, { "Content-Type": "application/json" });
//     response.end(JSON.stringify(newProduct));
//   } catch (error) {
//     console.log(error);
//     response.end(JSON.stringify({ message: error.message }));
//   }
// };

// const updateProduct = async (request, response, id) => {
//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       response.writeHead(404, { "Content-Type": "application/json" });
//       response.end(
//         JSON.stringify({ message: "Product with given id not found" })
//       );
//     } else {
//       const body = await getPostData(request);
//       const { title, description, price, name } = JSON.parse(body);
//       const newProductData = {
//         title: title || product.title,
//         name: name || product.name,
//         description: description || product.description,
//         price: price || product.price,
//       };
//       const updProduct = await Product.update(id, newProductData);
//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.end(JSON.stringify(updProduct));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteProduct = async (request, response, id) => {
//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       response.writeHead(404, { "Content-Type": "application/json" });
//       response.end(
//         JSON.stringify({ message: "Product with given id not found" })
//       );
//     } else {
//       await Product.remove(id);

//       response.writeHead(200, { "Content-Type": "application/json" });
//       response.end(JSON.stringify(product));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
