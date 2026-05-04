import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { ignores: ["build/", "dist/", ".vercel/"] },

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },

  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,

  eslintConfigPrettier,
];
