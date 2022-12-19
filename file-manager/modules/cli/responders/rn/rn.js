/*
 * CLI responder rn
 *
 */

// Dependencies
import { createReadStream, createWriteStream } from "node:fs";
import { rename, unlink } from "node:fs/promises";
import { parse, resolve } from "node:path";
import { pipeline } from "node:stream/promises";

// Renames the file
export const rnResponder = async (string, callback) => {
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
    const outputFileName =
      typeof array[2] === "string" &&
      !["\\", "/"].includes(array[2]) &&
      array[2].trim().length > 0
        ? array[2].trim()
        : false;

    if (pathToFileArg && outputFileName) {
      try {
        const pathToFile = resolve(pathToFileArg);
        const { dir } = parse(pathToFile);

        const pathToDirectory = resolve(dir, outputFileName);

        await rename(pathToFile, pathToDirectory);
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
