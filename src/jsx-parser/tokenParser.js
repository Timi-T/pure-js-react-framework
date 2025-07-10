// Only works in browser environment if all required scripts are loaded properly

/*
  Function to parse the tokens into an AST (Abstract Syntax Tree)
  The AST will be an array of objects that represent the jsx elements.
  Each object will have a type, tag name, props and children.
  Example:
    [
      {
        type: 'LSD',
        tag: 'div',
        props: { id: 'ope', 'aria-disabled': true, className: 'test' },
        children: [
          {
            type: 'LSD',
            tag: 'ul',
            props: {},
            children: [
              { type: 'TEXT_NODE', value: '1' },
              { type: 'TEXT_NODE', value: '2' },
              { type: 'TEXT_NODE', value: 'in between' },
              { type: 'TEXT_NODE', value: '3' },
              { type: 'TEXT_NODE', value: '4' },
              { type: 'TEXT_NODE', value: '5' }
            ]
          },
          { type: 'TEXT_NODE', value: 'Opeyemi' }
        ]
      }
    ]
  This function will parse the tokens into an AST that can be used to render the jsx.
  It will handle self-closing tags, nested elements, text nodes, props and attributes.
  The AST will be used to render the jsx and build the final output.
  The output will be a string that represents the jsx and used to render the jsx.
  This is a basic parser that does not handle all edge cases.
  It is meant to be a starting point for a more robust parser.
*/
const parseTokens = (tokens) => {
  let ast = [];
  let tokenIndex = 0;

  while (tokenIndex < tokens.length) {
    if (tokens[tokenIndex].type === "LSD") {
      const [domNode, newTokenIdndex] = parseElement(tokens, tokenIndex);
      ast.push(domNode);
      tokenIndex = newTokenIdndex;
    } else {
      tokenIndex += 1;
    }
  }

  return ast;
};

const parseElement = (tokens, tokenIndex) => {
  if (tokens[tokenIndex].type !== "LSD") throw new Error("Expected < token");

  tokenIndex++;
  const htmlTag = tokens[tokenIndex].value;
  tokenIndex++;

  const elementProps = {};

  while (tokens[tokenIndex].type === "IDENTIFIER") {
    const key = tokens[tokenIndex].value;
    tokenIndex += 1;
    if (tokens[tokenIndex].type === "EQ") {
      tokenIndex += 1;
      if (
        tokens[tokenIndex].type !== "PROP_VALUE" &&
        tokens[tokenIndex].type !== "JS_EXPRESSION"
      ) {
        throw new Error("Unexpected token");
      } else {
        if (tokens[tokenIndex].type === "JS_EXPRESSION") {
          elementProps[key] = Function(`return ${tokens[tokenIndex].value}`)();
        } else {
          elementProps[key] = tokens[tokenIndex].value;
        }
        tokenIndex++;
      }
    } else {
      // Boolean props
      elementProps[key] = true;
    }
  }

  if (tokens[tokenIndex].type === "SLASH_GRTD") {
    return [
      {
        type: "Element",
        tag: htmlTag,
        props: elementProps,
        children: [],
      },
      tokenIndex + 1,
    ];
  }

  if (tokens[tokenIndex].type !== "GRTD") throw new Error("Expected token >");
  tokenIndex += 1;

  const children = [];
  while (
    tokens[tokenIndex].type !== "LSD_SLASH" &&
    tokens[tokenIndex + 1].value !== htmlTag
  ) {
    if (tokens[tokenIndex].type === "LSD") {
      const [node, newTokenIdndex] = parseElement(tokens, tokenIndex);
      children.push(node);
      tokenIndex = newTokenIdndex;
    } else if (tokens[tokenIndex].type === "TEXT_NODE") {
      children.push({
        type: "TEXT_NODE",
        value: tokens[tokenIndex].value,
      });
      tokenIndex += 1;
    } else {
      throw new Error("Unexpected token " + tokens[tokenIndex].value);
    }
  }

  tokenIndex += 2; // skip LSD_SLASH + IDENTIFIER/TAG
  if (tokens[tokenIndex].type !== "GRTD") throw new Error("Expected >");
  tokenIndex++;

  return [
    {
      type: "Element",
      tag: htmlTag,
      props: elementProps,
      children,
    },
    tokenIndex,
  ];
};
