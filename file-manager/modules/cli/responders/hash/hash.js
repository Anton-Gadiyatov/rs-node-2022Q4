/*
 * CLI responders os
 *
 */

// Dependencies
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { pipeline } from "node:stream";

export const hashResponder = (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;

  if (string) {
    const array = string.split(" ");
    // Taking path from "hash path" input
    const pathToDirectory =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;
    if (pathToDirectory) {
      const readStream = fs.createReadStream(
        path.join(process.cwd(), pathToDirectory)
      );
      const hash = crypto.createHash("sha256");
      hash.setEncoding("hex");

      readStream.on("end", () => {
        hash.end();
        console.log(hash.read());
      });

      pipeline(readStream, hash, (err) => {
        if (err) {
          console.log("Operation failed ", err);
        }
        callback();
      });
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};
