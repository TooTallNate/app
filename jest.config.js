module.exports = {
  projects: ['api/jest.config.js', 'web/jest.config.js'],
  watchPlugins: ["jest-watch-select-projects"],
  collectCoverageFrom: [
    "{api,web}/src/**/*.{js,jsx,ts,tsx}"
  ]
}