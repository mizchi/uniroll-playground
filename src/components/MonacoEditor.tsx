import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import react_d_ts from "!!raw-loader!@types/react/index.d.ts";
import react_global_d_ts from "!!raw-loader!@types/react/global.d.ts";
import react_dom_d_ts from "!!raw-loader!@types/react-dom/index.d.ts";

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
  jsxFactory: "React.createElement",
  reactNamespace: "React",
  allowNonTsExtensions: true,
  allowJs: true,
  typeRoots: ["./types"],
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  allowSyntheticDefaultImports: true,
  target: monaco.languages.typescript.ScriptTarget.Latest,
});

// load types
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  react_d_ts,
  "file:///node_modules/@types/react/index.d.ts"
);

monaco.languages.typescript.typescriptDefaults.addExtraLib(
  react_global_d_ts,
  "file:///node_modules/@types/react/global.d.ts"
);

monaco.languages.typescript.typescriptDefaults.addExtraLib(
  react_dom_d_ts,
  "file:///node_modules/@types/react-dom/index.d.ts"
);

// load types
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `declare module "*";`,
  "file:///decls.d.ts"
);

export default function MonacoEditor(props: {
  initialCode: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  useEffect(() => {
    if (ref.current) {
      const model = monaco.editor.createModel(
        props.initialCode,
        "typescript",
        monaco.Uri.parse("file:///index.tsx")
      );
      model.updateOptions({
        tabSize: 2,
      });

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
      ed.onDidChangeModelContent((_ev) => {
        props.onChange(ed.getValue());
      });
      setEditor(ed);
    }
  }, [ref]);
  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
}
