/** @type {import('eslint').Linter.Config} */

modulo.exports = {
  extends: ["@rocketseat/eslint-config/next"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error"
  }
}