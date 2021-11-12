module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [2, { singleQuote: true }],
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars-experimental': 1,
    '@typescript-eslint/no-var-requires': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
}
