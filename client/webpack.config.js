const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: './src/js/home',
    auth: './src/js/auth',
    messages: './src/js/messages',
    profile: './src/js/profile'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
