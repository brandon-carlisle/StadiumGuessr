// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginRouter from "@tanstack/eslint-plugin-router";
import react from "@eslint-react/eslint-plugin";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  ...pluginRouter.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [react.configs["recommended"]],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Put rules you want to override here
    },
  },
);
