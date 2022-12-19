/*
 * CLI responder cat
 *
 */

// Dependencies
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

// Read file and log it to console
export const catResponder = async (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;
  if (string) {
    const array = string.split(" ");
    const fileName =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;

    const pathToFile = join(process.cwd(), fileName);
    const readableStream = createReadStream(pathToFile, "utf-8");
    try {
      await pipeline(readableStream, process.stdout);
      callback();
    } catch (err) {
      console.log("Operation failed");
      callback();
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};
