/*
 * CLI responder add
 *
 */

// Dependencies
import { readdir } from "node:fs/promises";
import { cliDrawer } from "../../utils/cliDrawer.js";
import { isFile } from "../../utils/isFile.js";

// Creating empty file in current working directory
export const lsResponder = async (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;
  if (string) {
    try {
    } catch (err) {
      console.log("Invalid input");
      callback();
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};
