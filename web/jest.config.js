const path = require("path");

module.exports = {
  displayName: "web",
  collectCoverageFrom: ["src/**/*!(.test).{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testMatch: ["<rootDir>/src/**/?(*.)(test).{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/../node_modules/babel-jest",
    "^.+\\.css$": path.resolve(__dirname, "test/css-transform.js")
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
