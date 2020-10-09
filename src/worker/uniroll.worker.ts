/*
import { compile as uniroll } from "uniroll";
export async function compile(code: string) {
  const files = {
    '/index.tsx': code,
  }
  const rolled = await uniroll({
    files,
    input: "/index.tsx",
  });
  const out = await rolled.generate({ format: "esm" });
  return out.output[0].code;
}
*/
import { rollup } from "rollup";
import { getBaseConfig, createMemoryFs } from "uniroll";

export async function compile(code: string) {
  const files = {
    '/index.tsx': code,
  }
  const memfs = createMemoryFs(files)
  const { plugins } = getBaseConfig({ fs: memfs })
  const rolled = await rollup({
    input: "/index.tsx",
    onwarn(warnings) {
      console.warn("[warn]", warnings);
    },
    plugins: [...plugins],
  });
  const out = await rolled.generate({ format: "es" });
  return out.output[0].code;
}
