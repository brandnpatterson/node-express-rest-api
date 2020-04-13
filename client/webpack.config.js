const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            failOnError: true
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      inject: true
    })
  ]
};
