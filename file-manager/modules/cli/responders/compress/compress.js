/*
 * CLI responder compress
 *
 */

// Dependencies
import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { join, parse, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";

// Compress file and save to new file
export const compressResponder = async (string, callback) => {
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
        const fileStat = await lstat(fileName);
        if (!fileStat.isFile()) {
          throw new Error("Invalid input");
        }
        const dirStat = await lstat(outputDir);
        if (!dirStat.isDirectory()) {
          throw new Error("Invalid input");
        }
        const pathToFile = join(process.cwd(), fileName);
        const { base } = parse(pathToFile);
        const newFileName = `${base}.br`;

        const pathToDirectory = resolve(outputDir, newFileName);

        const brotliCompress = createBrotliCompress();
        const readableStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToDirectory);
        await pipeline(readableStream, brotliCompress, writeStream);
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
