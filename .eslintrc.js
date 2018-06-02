module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    import: 0,
    semi: 0,
    'comma-dangle': 0,
    'no-console': 1,
    'react/display-name': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/no-did-mount-set-state': 0,
  },
}
