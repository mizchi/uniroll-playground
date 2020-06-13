import React, { Suspense, useState } from "react";
import { Preview } from "./Preview";

const MonacoEditor = React.lazy(() => import("./MonacoEditor"));

const initialCode = `
import React from "react";
import ReactDOM from "react-dom";
function App(props: {text: string}){
  return <div>Hello, {props.text}</div>
}

// const root = document.querySelector("#root") as HTMLElement;
const el = document.createElement("div");
document.body.append(el);
ReactDOM.render(<App text="john doe" />, el);
`;

export function App() {
  const [code, setCode] = useState(initialCode);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: 3 }}>
        <Suspense fallback="loading...">
          <MonacoEditor
            initialCode={initialCode}
            onChange={(value) => setCode(value)}
          />
        </Suspense>
      </div>
      <div style={{ flex: 2 }}>
        <Preview code={code} />
      </div>
    </div>
  );
}
