```md
# 🧩 Build Your Own JSX Parser

Welcome to the repository for **Building a JSX Parser from Scratch**, a learning-focused project that explores how JSX — the syntax extension behind React — is parsed and transformed into a valid DOM tree.

This project walks through how to **manually tokenize JSX code, parse it into an Abstract Syntax Tree (AST)**, and then **render the DOM** from that AST — all in pure JavaScript, without Babel or JSX compilers.

---

## 📚 Why This Project?

Have you ever wondered **how React transforms your JSX code into actual DOM elements**?

In production, tools like **Babel** handle this parsing and compilation behind the scenes. But here, we take a deep dive into the internals — building a lightweight JSX parser step-by-step to **demystify what goes on under the hood**.

---

## 🧠 Concepts Covered

- Tokenization of JSX: breaking JSX strings into manageable tokens
- Parsing: building an AST from tokens
- Recursive parsing for nested structures
- DOM rendering from an AST
- Handling props, JavaScript expressions, text nodes, and event listeners
- Understanding the link between JSX, ASTs, and the actual DOM

---

## 🗂️ Folder Structure
```

my-jsx-parser-project/
├── src/
│ ├── jsx-parser/
│ │ ├── index.js # Entry point for the parser
│ │ ├── tokenParser.js # AST builder from tokens
│ │ └── tokenizer.js # Converts JSX string into tokens
│ ├── webpage/
│ │ ├── index.js # Renders parsed AST in the browser
│ │ └── index.html # HTML shell for browser demo
├── package.json
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/jsx-parser.git
cd jsx-parser
````

### 2. Serve the `index.html` file

Since this is a browser-based parser:

- No build tools needed
- No dependencies required

You can simply use any static server (like VS Code Live Server or Python HTTP server) to open `src/webpage/index.html`:

#### Using Python:

```bash
cd src/webpage
python3 -m http.server
```

Then navigate to `http://localhost:8000` in your browser.

---

## 🧪 Sample JSX Input

Here's a sample JSX string parsed by the tool:

```jsx
<div id={"root"} aria-disabled className="root-element">
  <button onClick={() => console.log("Clicked!")}>Click me</button>
  <ul>
    <li>Item 1</li>
    Text between
    <li>Item 2</li>
  </ul>
  Final Text!
</div>
```

The parser handles:

- Boolean and string props
- JavaScript expression props (`{...}`)
- Event listeners like `onClick`
- Text nodes and nested children
- Self-closing and normal tags

---

## 🔨 How It Works

### Tokenizer

- Scans the JSX string and outputs an array of tokens
- Supports symbols like `<`, `</`, `/>`, `=`, `{`, `}`
- Distinguishes between prop keys, prop values, and children

### Token Parser

- Recursively builds an **Abstract Syntax Tree (AST)** from tokens
- Each JSX element becomes a node with `tag`, `props`, and `children`

### Renderer

- Converts AST nodes to DOM elements
- Recursively renders child nodes
- Attaches props and event listeners

---

## 📸 Demo

After loading the webpage, you’ll see the AST-rendered output in the browser. Open DevTools console to inspect tokens and AST for deeper debugging.

---

## 📦 Output AST Example

```json
{
  "type": "Element",
  "tag": "div",
  "props": { "id": "root", "className": "root-element" },
  "children": [
    {
      "type": "Element",
      "tag": "button",
      "props": { "onClick": "() => console.log('Clicked!')" },
      "children": [{ "type": "TEXT_NODE", "value": "Click me" }]
    },
    ...
  ]
}
```

---

## ✨ Features

✅ Tokenizes JSX string into tokens
✅ Builds a full AST tree with props and nested elements
✅ Handles JavaScript expressions as prop values
✅ Supports text nodes and inline text
✅ DOM rendering from AST — like React’s `createElement`

---

## 🔍 Limitations

This project is **meant for educational purposes**. It's not meant to be used in production and does not support:

- Spread attributes
- Fragments
- JSX conditionals (e.g., ternaries)
- Comments
- Performance optimizations

---

## 📌 Future Ideas

- Build support for JSX fragments (`<>...</>`)
- Add spread props (`{...props}`)
- Support TypeScript integration
- Convert AST back to JSX (reverse parser)
- Improve error handling and debugging

---

## 📚 Blog Post

You can read the full step-by-step breakdown of how this works on [my blog](https://medium.com/@ogunbodetimi/building-a-jsx-parser-from-scratch-understanding-the-foundations-of-reacts-syntax-16dc35dce7b6). It explains:

- How tokenization works
- Recursive parsing logic
- Handling props and expressions
- AST rendering with DOM API

---

## 👨🏽‍💻 Author

**Opeyemi Ogunbode**
Frontend Engineer & Software Enthusiast
[LinkedIn](https://www.linkedin.com/in/opeyemi-ogunbode/) • [GitHub](https://github.com/Timi-T)

> I’m currently working on building a React-like framework based on this parser.
> Follow the repo to stay updated and feel free to contribute or fork!

---

## 🙌 Contributions

Suggestions, bug reports, or ideas for improvement are welcome!
Feel free to open an [issue](https://github.com/<your-username>/jsx-parser/issues) or [pull request](https://github.com/<your-username>/jsx-parser/pulls).

---

## 📄 License

MIT © Opeyemi Ogunbode

---

```

```
