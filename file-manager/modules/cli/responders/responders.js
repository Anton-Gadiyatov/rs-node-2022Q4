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
