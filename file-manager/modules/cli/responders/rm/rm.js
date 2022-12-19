/*
 * CLI responder rm
 *
 */

// Dependencies
import { unlink } from "node:fs/promises";
import { resolve } from "node:path";

// Deletes file on a given path
export const rmResponder = async (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;
  if (string) {
    const array = string.split(" ");
    const pathToFileArg =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;

    if (pathToFileArg) {
      try {
        const pathToFile = resolve(pathToFileArg);
        await unlink(pathToFile);
        callback();
      } catch (err) {
        console.log("Operation failed");
        callback();
      }
    } else {
      console.log("Invalid input");
      callback();
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};
