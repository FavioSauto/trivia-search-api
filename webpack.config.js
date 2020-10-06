const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const ManifestPlugin = require('webpack-manifest-plugin');

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, 'src/frontend/index.js'),
  mode: process.env.NODE_ENV,
  output: {
    path: isProd ? path.join(process.cwd(), './src/server/client') : '/',
    filename: 'assets/app.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|styl)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isProd ? new ManifestPlugin() : () => {},
    new MiniCssExtractPlugin({
      filename: 'assets/app.css'
    })
  ]
};
