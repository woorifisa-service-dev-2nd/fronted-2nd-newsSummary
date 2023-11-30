module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'operator-linebreak': off,
    'no-unused-expressions': ['error', { allowTernary: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'func-names': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.js'] },
    ],
    'no-plusplus': 'off',
  },
};
