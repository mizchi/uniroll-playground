import React, { useRef, useEffect, useState, useCallback } from "react";
import { compile } from "../worker/uniroll.worker";

let timeoutId: null | number = null;

export function Preview(props: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [building, setBuilding] = useState(false);
  const [debounce, setDebounce] = useState(1000);
  const [autorun, setAutorun] = useState(false);

  // click run
  const run = useCallback(async () => {
    if (iframeRef.current) {
      console.log("start build");
      try {
        setBuilding(true);
        const output = await compile(props.code);
        const encoded = btoa(output);
        const blob = new Blob([template(encoded)], { type: "text/html" });
        iframeRef.current.src = URL.createObjectURL(blob);
      } catch (err) {
        console.error(err);
        const blob = new Blob([errorTemplate(err?.message ?? "error")], {
          type: "text/html",
        });
        iframeRef.current.src = URL.createObjectURL(blob);
      } finally {
        timeoutId = null;
        setBuilding(false);
      }
    }
  }, [props.code]);

  // ctrl+r to run
  useEffect(() => {
    const fn = (ev: KeyboardEvent) => {
      console.log(ev.key);
      if (ev.ctrlKey && ev.key.toLowerCase() === "r") {
        run();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [props.code]);

  // autorun
  useEffect(() => {
    if (!autorun) {
      return;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(async () => {
      if (iframeRef.current) {
        try {
          setBuilding(true);
          const output = await compile(props.code);
          const encoded = btoa(output);
          const blob = new Blob([template(encoded)], { type: "text/html" });
          iframeRef.current.src = URL.createObjectURL(blob);
        } catch (err) {
          console.error(err);
          const blob = new Blob([errorTemplate(err?.message ?? "error")], {
            type: "text/html",
          });
          iframeRef.current.src = URL.createObjectURL(blob);
        } finally {
          timeoutId = null;
          setBuilding(false);
        }
      }
    }, debounce);
  }, [iframeRef, props.code, debounce, autorun]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ height: "36px", width: "100%" }}>
        <button onClick={run}>run(ctrl-r)</button>
        | autorun:
        <input
          type="checkbox"
          checked={autorun}
          onChange={(ev) => setAutorun(!!ev.target.checked)}
        />
        {autorun && (
          <>
            | debounce:
            <input
              type="number"
              value={debounce}
              style={{ width: "4em" }}
              onChange={(ev) => setDebounce(Number(ev.target.value))}
            />
            ms
          </>
        )}
      </div>
      <div
        style={{
          height: "calc(100% - 36px)",
          width: "100%",
          position: "relative",
        }}
      >
        {building && fog}

        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          ref={iframeRef}
        />
      </div>
    </div>
  );
}

const fog = (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      background: "black",
      opacity: 0.5,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      building...
    </div>
  </div>
);

const template = (encoded: string) =>
  `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  <script type=module>
    import("data:text/javascript;base64,${encoded}");
  </script>
  </body>
</html>`;

const errorTemplate = (errorMessage: string) =>
  `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  ${errorMessage}
  </body>
</html>`;
