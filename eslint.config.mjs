import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint"; // 1. Import tseslint

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // --- 2. [สำคัญ] เพิ่ม Object นี้เข้าไป ---
  {
    // กำหนดให้กฎนี้ใช้กับไฟล์ .js และ .cjs เท่านั้น
    files: ["**/*.{js,cjs}"],
    // ใช้ tseslint.configs.disableTypeChecked เพื่อปิดกฎที่ต้องใช้ Type Information
    ...tseslint.configs.disableTypeChecked,
    rules: {
      // ปิดกฎที่ห้ามใช้ require()
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  // ------------------------------------

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // --- [สำคัญ] เพิ่ม 2 บรรทัดนี้เข้าไป ---
    "jest.config.js",
    "jest.setup.js",
  ]),
]);

export default eslintConfig;
