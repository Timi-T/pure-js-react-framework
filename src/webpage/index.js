// Only works in browser environment if all required scripts are loaded properly

const jsxString = `<div id={"root"} aria-disabled className="root-element">
  <button
    type="button"
    onClick={() => {
      console.log("Button clicked");
      const newFunc = () => console.log("Nested function!");
      newFunc();
    }}
    style={{color: "white", backgroundColor: 'red'}}
  >
    Click me
  </button>
  <ul id="list" tabIndex="0">
    <li id="one">1</li>
    <li id="two">2</li>
    Text in between
    <li id="three">3</li>
    <li id="four">4</li>
    <li id="five">5</li>
  </ul>
  Last text in tree & % @ $ # ! **$(@#*$^) ( )
</div>;
`;

function renderAstNode(node) {
  if (node.type === "TEXT_NODE") {
    return document.createTextNode(node.value);
  }
  const el = document.createElement(node.tag);
  // Set props
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      if (key === "style") {
        el.style.cssText = value;
      } else if (key.startsWith("on") && typeof value === "function") {
        // Attach event listeners like onClick, onMouseOver, etc.
        const eventType = key.slice(2).toLowerCase();
        el.addEventListener(eventType, value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  // Render children
  if (node.children) {
    node.children.forEach((child) => {
      el.appendChild(renderAstNode(child));
    });
  }
  return el;
}

const ast = jsxParser(jsxString);

const container = document.getElementById("root");
ast.forEach((node) => {
  container.appendChild(renderAstNode(node));
});
