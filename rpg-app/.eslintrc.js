const { rules } = require('eslint-config-prettier');

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 0,
  },
};
