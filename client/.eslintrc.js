module.exports = {
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'react/no-unknown-property': [2, {ignore: ['class']}],
  },

  plugins: [
    'react',
  ],
}
