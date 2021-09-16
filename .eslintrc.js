module.exports = {
  extends: [`eslint:recommended`],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: `module`,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  globals: {},
  rules: {
    "comma-dangle": [`off`],
    quotes: [`warn`, `backtick`],
    semi: [`off`],
    "no-empty-pattern": [`off`],
    "no-unused-vars": [`warn`],
    "array-callback-return": [`off`],
    indent: [`off`],
    "multiline-ternary": [`off`],
    "no-loss-of-precision": [`off`],
    "no-undef": [`off`],
    "no-async-promise-executor": [`off`],
  },
};
