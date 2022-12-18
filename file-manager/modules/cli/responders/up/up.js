/*
 * CLI responder up
 *
 */

// Dependencies
import path from "node:path";

// Moving one directory up
export const upResponder = (callback) => {
  const parsedPath = path.parse(process.cwd());
  // Check if in root directory
  if (parsedPath.base === "") {
    callback();
    return;
  }
  const oneStepBack = path.join(process.cwd(), "../");
  try {
    process.chdir(oneStepBack);
  } catch (err) {
    console.log("This was really unexpected error ", err);
  }
  callback();
};
