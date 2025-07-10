// Only works in browser environment if all required scripts are loaded properly

/*
  Function to break down jsx into an array of token objects
  Each token object has a type and value.
  Example:
    [   { type: 'LSD', value: '<' } ]
    LSD stands for Less than
    GRTD stands for Greater than
    IDENTIFIER stands for Identifier (e.g. tag name, prop key)
    TEXT_NODE stands for plain text inside the element
    LSD_SLASH stands for closing tag (e.g. </tag>)
    SLASH_GRTD stands for self-closing tag (e.g. <tag />)
    EQ stands for equals sign (e.g. <tag attr="value">)
    PROP_VALUE stands for string value (e.g. "value")

  This is a basic tokenizer that does not handle all edge cases.
  It is meant to be a starting point for a more robust parser.
  It will tokenize the input string into an array of tokens.
  The tokens will be used to build a tree structure that represents the jsx.
  The tree structure will be used to render the jsx and buid the final output.
  The output will be a string that represents the jsx and used to render the jsx. 
*/
const tokenizeElement = (textStream) => {
  const tokens = [];
  let tokenPosition = 0;
  // inTag is a switch used to determine if the tokenPosition is in a tag
  let inTag = false;

  // Every jsx code should start with <
  if (textStream[0] !== "<") {
    throw new Error("Expected < at the start of the stream");
  }

  // Function to check if a character is not a special one.
  const isIdentifier = (char) => /[A-Za-z0-9_-]/.test(char);

  // Loop over textStream
  while (tokenPosition < textStream.length) {
    if (textStream[tokenPosition] === "<") {
      inTag = true;
      // Start of a closing tag
      if (textStream[tokenPosition + 1] === "/") {
        tokens.push({ type: "LSD_SLASH", value: "</" });
        tokenPosition += 2;
      } else {
        // Start of an opening tag
        tokens.push({ type: "LSD", value: "<" });
        tokenPosition += 1;
      }
    } else if (textStream[tokenPosition] === ">") {
      inTag = false;
      // when its an empty tag
      if (textStream[tokenPosition - 1] === "/") {
        tokens.push({ type: "GRTD_SLASH", value: "/>" });
        tokenPosition += 2;
      } else {
        // Close of tag
        tokens.push({ type: "GRTD", value: ">" });
        tokenPosition += 1;
      }
    } else if (
      // Checking for just string props
      (textStream[tokenPosition] === "'" ||
        textStream[tokenPosition] === '"') &&
      inTag
    ) {
      if (textStream[tokenPosition - 1] === "=") {
        // When we encounter a prop value
        let propPosition = tokenPosition + 1;
        const stringWrapper = textStream[tokenPosition];
        let propValue = "";
        while (textStream[propPosition] !== stringWrapper) {
          propValue = `${propValue}${textStream[propPosition]}`;
          propPosition += 1;
        }
        tokens.push({ type: "PROP_VALUE", value: propValue });
        tokenPosition = propPosition + 1;
      }
    } else if (isIdentifier(textStream[tokenPosition])) {
      // When we encounter a TEXT NODE or an identifier (PROP KEY or a TAG)
      let identifierPosition = tokenPosition;
      let identifierValue = "";
      while (
        isIdentifier(textStream[identifierPosition]) ||
        (textStream[identifierPosition] === " " && !inTag)
      ) {
        identifierValue = `${identifierValue}${textStream[identifierPosition]}`;
        identifierPosition += 1;
      }
      tokens.push({
        type: inTag ? "IDENTIFIER" : "TEXT_NODE",
        value: identifierValue,
      });
      tokenPosition = identifierPosition;
    } else if (
      !isIdentifier(textStream[tokenPosition]) &&
      !inTag &&
      textStream[tokenPosition] !== " "
    ) {
      // When we encounter a TEXT NODE
      let identifierPosition = tokenPosition;
      let identifierValue = "";
      if (textStream[identifierPosition] === "\n") {
        tokenPosition += 1;
        continue;
      }
      while (
        !isIdentifier(textStream[identifierPosition]) &&
        !inTag &&
        textStream[identifierPosition] !== "\n"
      ) {
        identifierValue = `${identifierValue}${textStream[identifierPosition]}`;
        identifierPosition += 1;
      }
      tokens.push({
        type: "TEXT_NODE",
        value: identifierValue,
      });
      tokenPosition = identifierPosition;
    } else if (textStream[tokenPosition] === "{" && inTag) {
      // When we encounter a javascript expression
      let newTokenPosition = tokenPosition + 1;
      let jsExpression = "";
      let openBracesCount = 1;
      let closedBracesCount = 0;
      while (closedBracesCount !== openBracesCount) {
        if (textStream[newTokenPosition] === "{") {
          openBracesCount++;
        } else if (textStream[newTokenPosition] === "}") {
          closedBracesCount++;
          if (closedBracesCount === openBracesCount) break;
        }
        jsExpression += textStream[newTokenPosition];
        newTokenPosition++;
      }
      tokenPosition = newTokenPosition + 1;
      tokens.push({
        type: "JS_EXPRESSION",
        value: jsExpression,
      });
    } else if (textStream[tokenPosition] === "=") {
      tokens.push({ type: "EQ", value: textStream[tokenPosition] });
      tokenPosition += 1;
    } else tokenPosition += 1;
  }

  return tokens;
};
