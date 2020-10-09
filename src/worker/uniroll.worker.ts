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
