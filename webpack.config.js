const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

const config = {
  entry: {
    app: './src/js/application.js',
    app1: './src/js/app1/app1.js',
    app2: './src/js/app2/app2.ts',
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
  },
  plugins: [
    // new CleanWebpackPlugin(),
  ],
};

module.exports = config;