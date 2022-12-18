/*
 * Main file of file-manager
 *
 */

// Dependencies
import readline from "node:readline";
import { cli } from "../modules/index.js";

// Instantiate the app object
export const app = {};

// Init function
app.init = () => {
  // Get username from args
  const { username } = cli.args.parseInitArgs();
  // Colorize username
  const colorizedUsername = cli.colorizer.colorizeString(33, username);
  cli.cliDrawer.centered(`Welcome to the File Manager, ${colorizedUsername}!`);

  // Start the interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  // Create an initial prompt
  _interface.prompt(123);

  // Handle each line of input separately
  _interface.on("line", (string) => {
    // Send to the input processor
    app.processInput(string);
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
