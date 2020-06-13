import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

export default function MonacoEditor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      monaco.editor.create(ref.current, {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript",
        lineNumbers: "off",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        theme: "vs-dark",
        minimap: {
          enabled: false,
        },
      });
    }
  }, [ref]);
  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
}
