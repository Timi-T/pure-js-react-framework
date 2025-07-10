// Only works in browser environment if all required scripts are loaded properly

const jsxParser = (textStream) => {
  const tokens = tokenizeElement(textStream);
  // Parse the tokenized result to get an Abstract syntax tree
  const ast = parseTokens(tokens);

  return ast;
};
