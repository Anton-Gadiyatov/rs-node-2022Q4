/*
 * CLI responders
 *
 */

// Dependencies
import path from "node:path";

// Instantiate the responders object
export const responders = {};

// Exiting CLI application
responders.exit = () => {
  process.exit(0);
};

// Moving one directory up
responders.up = () => {
  const parsedPath = path.parse(process.cwd());
  // Check if in root directory
  if (parsedPath.base === "") {
    return;
  }
  const oneStepBack = path.join(process.cwd(), "../");
  process.chdir(oneStepBack);
};

// Moving to givem directory
responders.cd = (string) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;

  if (string) {
    const array = string.split(" ");
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
};
