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

// Validation operations
eventEmitter.processInput = (string) => {
  string = typeof string === "string" && string.trim().length > 0 ? string : "";

  if (string) {
    let matchFound = false;

    config.availableOperations.some((operation) => {
      if (string.toLowerCase().includes(operation)) {
        matchFound = true;
        eventEmitter.e.emit(operation, string);
        return true;
      }
    });

    if (!matchFound) {
      console.log("Invalid input");
    }
  }
};

// Handling events

eventEmitter.e.on(".exit", () => {
  cli.responders.exit();
});

eventEmitter.e.on("up", () => {
  cli.responders.up();
});
