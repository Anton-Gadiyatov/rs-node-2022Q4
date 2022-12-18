/*
 * Main file of file-manager
 *
 */

// Dependencies
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
};
