module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc',
    'digitalbazaar/module',
    'digitalbazaar/vue3'
  ],
  ignorePatterns: ['node_modules/']
};
