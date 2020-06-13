import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import react_d_ts from "!!raw-loader!@types/react/index.d.ts";

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
  jsxFactory: "React.createElement",
  reactNamespace: "React",
  allowNonTsExtensions: true,
  allowJs: true,
  typeRoots: ["./types"],
  target: monaco.languages.typescript.ScriptTarget.Latest,
});

// load types
monaco.editor.createModel(
  react_d_ts,
  "typescript",
  monaco.Uri.parse("file:///types/react/index.d.ts")
);

const code = `
import React from "react";
function App(props: {text: string}){
  return <div>Hello, {props.text}</div>
}

<App text="john doe" />
`;

export default function MonacoEditor() {
  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  useEffect(() => {
    if (ref.current) {
      const model = monaco.editor.createModel(
        code,
        "typescript",
        monaco.Uri.parse("file:///index.tsx")
      );

      const ed = monaco.editor.create(ref.current, {
        model,
        language: "typescript",
        lineNumbers: "off",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        fontSize: 18,
        theme: "vs-dark",
        minimap: {
          enabled: false,
        },
      });
      setEditor(ed);
    }
  }, [ref]);
  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
}
