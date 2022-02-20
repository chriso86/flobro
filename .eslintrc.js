/* Copyright (c) 2021 Tom Chen (tomchen.org) */

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['demo'],
}
