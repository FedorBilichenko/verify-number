const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = isProd => ({
  entry: {
    main: './src/index.ts',
    demo: './demo.ts',
  },
  resolve: {
    extensions:  ['.js', '.ts', '.css', '.html'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {loader: 'html-loader'}
      },
      {
        test: /.css$/,
        exclude: /\.modules\.(s?css|sass)$/,
        use: [
          'to-string-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
        ]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: 'tslint.json'
            }
          }
        ]
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      title: 'Verify Number Demo',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    })
  ],
});
