module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "jest": true,
    "es6": true
    // "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "files": ["*.jsx", "*.js"]
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
