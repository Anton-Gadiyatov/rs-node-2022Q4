/*
 * CLI responders os
 *
 */

// Dependencies
import os from "node:os";

const commands = {
  eol: () => {
    if (os.EOL === "\n") {
      console.log("Your system End-Of-Line is: '\\n'");
    }
    if (os.EOL === "\r\n") {
      console.log("Your system End-Of-Line is: '\\r\\n'");
    }
  },
  cpus: () => {
    const cps = os.cpus();
    console.log(`Your system have ${cps.length} CPUs`);
    cps.forEach((cp, index) => {
      console.log(`${index + 1} - ${cp.model}`);
    });
  },
  homedir: () => {
    console.log(`Your system homedir is ${os.homedir()}`);
  },
  username: () => {
    console.log(`Your system username is ${os.userInfo().username}`);
  },
  architecture: () => {
    console.log(`Your system architecture is ${os.arch()}`);
  },
};

export const osResponder = (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;
  const array = string.split("--");
  const command =
    typeof array[1] === "string" && array[1].trim().length > 0
      ? array[1].trim()
      : false;
  if (command && Object.keys(commands).includes(command.toLowerCase())) {
    commands[command]();
    callback();
  } else {
    console.log("Invalid input");
    callback();
  }
};
