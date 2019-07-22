const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const isProd = false;
const HOST = '0.0.0.0';
const PORT = '9001';

module.exports = webpackMerge(commonConfig(isProd), {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    publicPath: '/',
    host: HOST,
    port: PORT,
    compress: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
});
