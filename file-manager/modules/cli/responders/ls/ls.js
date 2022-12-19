/*
 * CLI responder ls
 *
 */

// Dependencies
import { readdir } from "node:fs/promises";
import { cliDrawer } from "../../utils/cliDrawer.js";
import { isFile } from "../../utils/isFile.js";

// Logging all files and directories in console
export const lsResponder = async (callback) => {
  const padding = (mult, length) => {
    let line = "";
    for (let i = 0; i < mult * 30 - length; i++) {
      line += " ";
    }
    return line;
  };
  try {
    cliDrawer.horizontalLine();
    cliDrawer.centered("Table");
    cliDrawer.horizontalLine();
    cliDrawer.verticalSpace(1);
    let header = `\x1b[33m${"(index)"}\x1b[0m`;
    header += padding(1, header.length);
    header += "Name";
    header += padding(4, header.length + 9);
    header += "Type";
    console.log(header);
    cliDrawer.horizontalLine();
    cliDrawer.verticalSpace(1);
    const files = await readdir(process.cwd());
    files.forEach((file, index) => {
      let line = `\x1b[33m${index}\x1b[0m`;
      line += padding(1, line.length);
      line += `\x1b[27m${file}\x1b[0m`;
      line += padding(4, line.length);
      line += isFile(file) ? `\x1b[35mfile\x1b[0m` : `\x1b[36mdirectory\x1b[0m`;
      console.log(line);
    });
    cliDrawer.verticalSpace();
    cliDrawer.horizontalLine();
  } catch (err) {
    console.log("Invalid input");
    callback();
  }
};
