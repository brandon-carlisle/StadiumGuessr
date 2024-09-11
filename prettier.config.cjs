// Disable type for now - this is because of the import order
// /** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  importOrder: [
    "^@core/(.*)$",
    "^@/styles/(.*)$",
    "^@/server/(.*)$",
    "^@/utils/(.*)$",
    "^@/store/(.*)$",
    "^@/components/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    // "prettier-plugin-tailwindcss",
    //"@trivago/prettier-plugin-sort-imports",
  ],
};

module.exports = config;
