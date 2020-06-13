import React, { useRef, useEffect } from "react";

export function Preview(props: { code?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (iframeRef.current) {
      const code = `export default () => { document.body.innerHTML = "hello iframe" }`;
      const encoded = btoa(code);
      const blob = new Blob([template(encoded)], { type: "text/html" });
      iframeRef.current.src = URL.createObjectURL(blob);
    }
  }, [iframeRef]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe style={{ width: "100%", height: "100%" }} ref={iframeRef} />
    </div>
  );
}

const template = (encoded: string) =>
  `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  <script type=module>
    import("data:text/javascript;base64,${encoded}").then(mod => mod.default());
  </script>
  </body>
</html>`;
