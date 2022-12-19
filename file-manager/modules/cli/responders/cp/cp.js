/*
 * CLI responder cp
 *
 */

// Dependencies
import { copyFile } from "node:fs/promises";
import { constants } from "node:fs";
import { parse, resolve } from "node:path";

// Copy file to new place
export const cpResponder = async (string, callback) => {
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
    const outputDir =
      typeof array[2] === "string" && array[2].trim().length > 0
        ? array[2].trim()
        : false;

    if (fileName && outputDir) {
      try {
        const pathToFile = resolve(process.cwd(), fileName);
        const { base } = parse(pathToFile);

        const pathToDirectory = resolve(outputDir, base);

        await copyFile(pathToFile, pathToDirectory, constants.COPYFILE_EXCL);
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
