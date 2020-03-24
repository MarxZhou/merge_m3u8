module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:jest/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['module-resolver'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'module-resolver/use-alias': 2,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
