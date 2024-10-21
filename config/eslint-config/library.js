/** @type {import('eslint').Linter.Config} */

modulo.exports = {
  extends: ["@rocketseat/eslint-config/react"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error"
  }
}