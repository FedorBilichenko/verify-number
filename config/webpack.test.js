const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

const isProd = true;

module.exports = webpackMerge(commonConfig(isProd), {
  mode: 'production',
  devtool: false,
  output: {
    path: path.join(__dirname, '..', '/test-build')
  }
});
