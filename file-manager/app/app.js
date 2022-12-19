/*
 * Main file of file-manager
 *
 */

// Dependencies
import readline from "node:readline";
import os from "node:os";
import { cli, eventEmitter } from "../modules/index.js";

// Instantiate the app object
export const app = {};

// Init function
app.init = () => {
  // Get user home directory
  const homeDir = os.homedir();

  // Move to user home directory
  try {
    process.chdir(homeDir);
  } catch (err) {
    console.error(`Cannot move into user home directory: ${err}`);
  }

  // Get username from args
  const username = cli.args.parseInitArgs().username
    ? cli.args.parseInitArgs().username
    : "Mr(s) inkognito";
  // Colorize username
  const colorizedUsername = cli.colorizer.colorizeString(33, username);
  cli.cliDrawer.centered(`Welcome to the File Manager, ${colorizedUsername}!`);
  // Loging current working directory
  console.log(
    cli.colorizer.colorizeString(32, `You are currently in ${process.cwd()}`)
  );

  // Start the interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on("line", (string) => {
    // Send to the input processor
    eventEmitter.processInput(string);
    // Loging current working directory
  });

  // On killing the interface with CTRL + C
  _interface.on("close", () => {
    process.exit(0);
  });

  // On killing the process
  process.on("exit", () => {
    cli.cliDrawer.centered(
      `Thank you for using File Manager, ${colorizedUsername}, goodbye!`
    );
  });
};
