module.exports = {
  presets: [["react-app", { "flow": false, "typescript": true }]],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ],
  env: {
    production: {
      plugins: ["emotion"]
    },
    development: {
      plugins: [["emotion", { sourceMap: true }]]
    }
  }
};
