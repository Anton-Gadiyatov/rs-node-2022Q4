/*
 * CLI responder cd
 *
 */

// Dependencies
import path from "node:path";

export const cdResponder = (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;

  if (string) {
    const array = string.split(" ");
    // Taking new_path from "cd new_path" input
    const pathToDirectory =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;
    if (pathToDirectory) {
      try {
        if (path.isAbsolute(pathToDirectory)) {
          // Absolute path
          process.chdir(path.normalize(pathToDirectory));
        } else {
          // Relative path
          const newPath = path.join(process.cwd(), pathToDirectory);
          process.chdir(newPath);
        }
      } catch (err) {
        console.log("Invalid input, no such directory");
      }
    }
  }
  callback();
};
