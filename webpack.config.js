const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: './src/index.js',  
  output: { path: path.resolve(__dirname, 'dist'), 
  filename: 'bundle.js', publicPath: '/' 
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
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
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  devServer: { 
    historyApiFallback: true,
  } 
};
