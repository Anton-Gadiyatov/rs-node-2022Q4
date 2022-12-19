/*
 * CLI responder add
 *
 */

// Dependencies
import { join } from "node:path";
import { open } from "node:fs/promises";

// Creating empty file or folder in current working directory
export const addResponder = async (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;
  if (string) {
    let fileHandle;
    const array = string.split(" ");
    const fileName =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;

    try {
      const pathToFile = join(process.cwd(), fileName);
      fileHandle = await open(pathToFile, "w");
      callback();
    } catch (err) {
      console.log("Operation failed");
      callback();
    } finally {
      fileHandle?.close();
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};
