module.exports = function (context, options) {
  return {
    name: 'webpack-config-plugin',
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            path: require.resolve('path-browserify'),
            assert: false,
            fs: false,
            process: false,
          },
        },
      };
    },
  };
};