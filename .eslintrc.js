module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier'],
  // extends: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  // plugins: ['prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never'
      }
    ],
    'import/prefer-default-export': 'off',
    'prettier/prettier': 2,
    'class-methods-use-this': false
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue']
      }
    }
  }
};
