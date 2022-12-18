/*
 * CLI console log drawer
 *
 */

// Instantiate the cliDrawer module object
export const cliDrawer = {};

// Get the available screen size
const width = process.stdout.columns;

// centered the given string for console
cliDrawer.centered = (string) => {
  string =
    typeof string == "string" && string.trim().length > 0 ? string.trim() : "";

  // Calculate the left padding there should be
  const leftPadding = Math.floor((width - string.length) / 2);

  // Put in left padded spaces before the string itself
  let line = "";
  for (let i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += string;
  console.log(line);
};
