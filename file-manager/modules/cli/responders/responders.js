/*
 * CLI responders
 *
 */

// Dependencies
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import os from "node:os";
import { pipeline } from "node:stream";

// Instantiate the responders object
export const responders = {};

// Exiting CLI application
responders.exit = () => {
  process.exit(0);
};

// Moving one directory up
responders.up = (callback) => {
  const parsedPath = path.parse(process.cwd());
  // Check if in root directory
  if (parsedPath.base === "") {
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

// Moving to given directory
responders.cd = (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;

  if (string) {
    const array = string.split(" ");
    // Taking new_path from "cd new_path" input
    const pathToDirectory =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;
    if (pathToDirectory) {
      try {
        if (path.isAbsolute(pathToDirectory)) {
          // Absolute path
          process.chdir(path.normalize(pathToDirectory));
        } else {
          // Relative path
          const newPath = path.join(process.cwd(), pathToDirectory);
          process.chdir(newPath);
        }
      } catch (err) {
        console.log("Invalid input, no such directory");
      }
    }
  }
  callback();
};

responders.ls = (string) => {
  console.log(string);
};

responders.cat = (string) => {
  console.log(string);
};

responders.add = (string) => {
  console.log(string);
};

responders.rn = (string) => {
  console.log(string);
};

responders.cp = (string) => {
  console.log(string);
};

responders.mv = (string) => {
  console.log(string);
};

responders.rm = (string) => {
  console.log(string);
};

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
    console.log(cps);
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

responders.os = (string, callback) => {
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
// Calculate hash of the file and print to console
responders.hash = (string, callback) => {
  string =
    typeof string === "string" && string.trim().length > 0
      ? string.trim()
      : false;

  if (string) {
    const array = string.split(" ");
    // Taking path from "hash path" input
    const pathToDirectory =
      typeof array[1] === "string" && array[1].trim().length > 0
        ? array[1].trim()
        : false;
    if (pathToDirectory) {
      const readStream = fs.createReadStream(
        path.join(process.cwd(), pathToDirectory)
      );
      const hash = crypto.createHash("sha256");
      hash.setEncoding("hex");

      readStream.on("end", () => {
        hash.end();
        console.log(hash.read());
      });

      pipeline(readStream, hash, (err) => {
        if (err) {
          console.log("Operation failed ", err);
        }
        callback();
      });
    }
  } else {
    console.log("Invalid input");
    callback();
  }
};

responders.compress = (string) => {
  console.log(string);
};

responders.decompress = (string) => {
  console.log(string);
};
