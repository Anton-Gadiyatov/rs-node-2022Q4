import { extname } from "node:path";

export const isFile = (string) => {
  return !!extname(string);
};
