import * as dotenv from "dotenv";
import { createServer } from "./server/server.js";
dotenv.config();

const PORT = Number.isSafeInteger(Number(process.env.PORT))
  ? Number(process.env.PORT)
  : 5000;

const server = createServer(PORT);
