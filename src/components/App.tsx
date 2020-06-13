import React, { Suspense } from "react";
import { Preview } from "./Preview";

const MonacoEditor = React.lazy(() => import("./MonacoEditor"));

export function App() {
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
          <MonacoEditor />
        </Suspense>
      </div>
      <div style={{ flex: 2 }}>
        <Preview />
      </div>
    </div>
  );
}
