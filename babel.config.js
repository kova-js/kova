module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      // ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      // ['@babel/plugin-proposal-class-properties', { loose: true }],
      // ['@babel/plugin-proposal-private-methods', { loose: true }],
    ],
  }
}
