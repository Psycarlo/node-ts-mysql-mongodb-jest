module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier'
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: {
      extends: './tsconfig.json',
      includes: ['src/**/*.ts']
    },
    tsconfigRootDir: './'
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  plugins: ['@typescript-eslint', 'prettier'],

  ignorePatterns: ['**/migrations', 'build'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'warn',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
