// Run with node

import { readFileSync } from "fs";
import { jsxParser } from "../jsx-parser/index.js";

(() => {
  const file = process.argv[2];
  const text = readFileSync(file, "utf-8");
  const ast = jsxParser?.(text);
  console.dir(ast, { depth: null });

  return ast;
})();
