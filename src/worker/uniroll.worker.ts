import { compile as uniroll } from "uniroll";

export async function compile(code: string) {
  const rolled = await uniroll({
    useInMemory: true,
    files: {
      "/index.tsx": code,
    },
    input: "/index.tsx",
  });
  const out = await rolled.generate({ format: "es" });
  return out.output[0].code;
}
