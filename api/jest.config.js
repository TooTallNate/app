module.exports = {
  displayName: "api",
  collectCoverageFrom: ["**/*!(.test).{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  testMatch: ["<rootDir>/**/?(*.)(test).{js,jsx,ts,tsx}"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/../node_modules/babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
