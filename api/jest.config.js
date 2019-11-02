module.exports = {
  displayName: "api",
  preset: "@shelf/jest-mongodb",
  collectCoverageFrom: ["**/*!(.test).{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testMatch: ["<rootDir>/**/?(*.)(test).{js,jsx,ts,tsx}"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2305]
      }
    }
  }
};
