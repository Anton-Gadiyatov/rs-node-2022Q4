/*
 * CLI console log colorizer
 *
 */

// Instantiate the args module object
export const colorizer = {};

// colorize string with given colorNumber
colorizer.colorizeString = (colorNumber, string) => {
  colorNumber =
    typeof colorNumber === "number" && colorNumber % 1 === 0 ? colorNumber : 0;
  string =
    typeof string === "string" && string.trim().length > 0 ? string.trim() : "";

  return `\x1b[${colorNumber}m${string}\x1b[0m`;
};
