/*
 * Event emitter of the file-manager
 *
 */

// Dependencies
import { EventEmitter } from "node:events";
import { config } from "../../config/index.js";
import { cli } from "../index.js";

// Instantiate the eventEmitter object
export const eventEmitter = {};

// Instantiate event emitter
class _emitter extends EventEmitter {}
eventEmitter.e = new _emitter();
eventEmitter.e.setMaxListeners(0);

// Validation operations
eventEmitter.processInput = (string) => {
  string = typeof string === "string" && string.trim().length > 0 ? string : "";
  if (string) {
    let matchFound = false;

    config.availableOperations.some((operation) => {
      if (
        string.toLowerCase().startsWith(operation) &&
        (string[operation.length] === " " ||
          string[operation.length] === undefined)
      ) {
        matchFound = true;
        eventEmitter.e.emit(operation, string);
        return true;
      }
    });

    if (!matchFound) {
      console.log("Invalid input");
      cli.workingDir.print();
    }
  }
};

// Handling events

eventEmitter.e.on(".exit", () => {
  cli.responders.exit();
});

eventEmitter.e.on("up", () => {
  cli.responders.up(cli.workingDir.print);
});

eventEmitter.e.on("cd", (string) => {
  cli.responders.cd(string, cli.workingDir.print);
});

eventEmitter.e.on("ls", () => {
  cli.responders.ls(cli.workingDir.print);
});

eventEmitter.e.on("cat", (string) => {
  cli.responders.cat(string, cli.workingDir.print);
});

eventEmitter.e.on("add", (string) => {
  cli.responders.add(string, cli.workingDir.print);
});

eventEmitter.e.on("rn", (string) => {
  cli.responders.rn(string);
});

eventEmitter.e.on("cp", (string) => {
  cli.responders.cp(string);
});

eventEmitter.e.on("mv", (string) => {
  cli.responders.mv(string, cli.workingDir.print);
});

eventEmitter.e.on("rm", (string) => {
  cli.responders.rm(string);
});

eventEmitter.e.on("os", (string) => {
  cli.responders.os(string, cli.workingDir.print);
});

eventEmitter.e.on("hash", (string) => {
  cli.responders.hash(string, cli.workingDir.print);
});

eventEmitter.e.on("compress", (string) => {
  cli.responders.compress(string, cli.workingDir.print);
});

eventEmitter.e.on("decompress", (string) => {
  cli.responders.decompress(string, cli.workingDir.print);
});
