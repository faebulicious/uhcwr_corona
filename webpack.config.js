const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]?[md5:hash:hex:10]'
            }
          }
        ],
        include: /img/,
        exclude: /node_modules/
      },
      {
        test: /\.(png|xml|ico|webmanifest)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '',
              name: '[name].[ext]'
            }
          }
        ],
        exclude: [/img/,/node_modules/]
      }
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/bundle.css"
    })
  ],
}