module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "react", "react-hooks", "jsx-a11y", "import"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:eslint-comments/recommended",
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    polyfills: ["Promise", "navigator.mediaDevices"],
    "import/resolver": {
      typescript: {
        project: "./",
      },
    },
  },
  rules: {
    "react/no-children-prop": "off",
    // turn on errors for missing imports
    "import/no-unresolved": "error",
    "react/prop-types": "off",
  },
}
