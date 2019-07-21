const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const isProd = true;

module.exports = webpackMerge(commonConfig(isProd), {
  mode: 'production',
  devtool: false,
});
