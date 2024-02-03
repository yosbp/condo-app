module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'max-len': [2, { code: 210, tabWidth: 4, ignoreUrls: true }],
    'vue/prop-name-casing': ['error'],
    'vue/multi-word-component-names': 0,
  },
};
