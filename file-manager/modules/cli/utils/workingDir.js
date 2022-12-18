/*
 * CLI working dir log
 *
 */

// Dependencies
import { colorizer } from "./colorizer.js";

// Instantiate the workingDir module object
export const workingDir = {};

// prints colorize current workingDir
workingDir.print = () => {
  console.log(
    colorizer.colorizeString(32, `You are currently in ${process.cwd()}`)
  );
};
