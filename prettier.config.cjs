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
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
