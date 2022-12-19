/*
 * CLI args parser
 *
 */

// Instantiate the args module object
export const args = {};

// args parser
args.parseInitArgs = () => {
  const args = process.argv;

  const parsedArgs = {};

  args.forEach((arg) => {
    if (typeof arg === "string" && arg.startsWith("--") && arg.includes("=")) {
      //removing -- and =, making from arg string an array [key, value];
      const parsedArray = arg.replace("--", "").split("=");
      parsedArgs[parsedArray[0]] = parsedArray[1];
    }
  });
  return parsedArgs;
};
