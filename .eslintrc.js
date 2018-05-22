module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 2018,
      experimentalObjectRestSpread: true,
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'airbnb',
  rules: {
    indent: [2, 2],
    'linebreak-style': [2, 'unix'],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'quote-props': [2, 'as-needed'],
    'comma-dangle': [2, 'always-multiline'],
    'no-cond-assign': 0,
    'space-before-blocks': [2, 'always'],
    'keyword-spacing': 2,
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-sequences': 0,
  },
}
