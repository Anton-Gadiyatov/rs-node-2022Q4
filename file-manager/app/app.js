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
  const { username } = cli.args.parseInitArgs();
  console.log(username);
};
