import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Downloaded source-site scripts kept only as research evidence.
    "docs/research/**",
    // Node helper scripts used for cloning (CommonJS, run outside the app).
    "scripts/clone-tools/**",
    "scripts/*.js",
  ]),
]);

export default eslintConfig;
