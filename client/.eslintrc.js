module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "react/jsx-indent": ["warn", 4],
    "indent": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off"
  },
  "ignorePatterns": ["serviceWorker.js", "*.test.js"]
};
