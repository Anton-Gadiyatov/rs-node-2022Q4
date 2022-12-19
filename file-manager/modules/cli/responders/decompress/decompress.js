/*
 * CLI responder decompress
 *
 */

// Dependencies
import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { join, parse, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

// Decompress file and save to new file
export const decompressResponder = async (string, callback) => {
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
        const { name, ext } = parse(pathToFile);
        if (!ext.includes(".br")) {
          throw new Error("Invalid input");
        }
        const pathToDirectory = resolve(outputDir, name);

        const brotliDecompress = createBrotliDecompress();
        const readableStream = createReadStream(pathToFile);
        const writeStream = createWriteStream(pathToDirectory);
        await pipeline(readableStream, brotliDecompress, writeStream);
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
