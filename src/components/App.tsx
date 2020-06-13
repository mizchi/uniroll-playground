import React, { Suspense } from "react";

const MonacoEditor = React.lazy(() => import("./MonacoEditor"));

export function App() {
  return (
    <Suspense fallback="loading...">
      <MonacoEditor />
    </Suspense>
  );
}
