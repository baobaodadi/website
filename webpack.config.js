const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'public'),
  entry: {
    react: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]/bundle.js',
    chunkFilename: 'chunks/[name]-[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['happypack/loader?id=jsx'],
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader','postcss-loader'] },
      { test: /\.styl/, use: ['style-loader', 'css-loader','postcss-loader','stylus-loader'] },
      { test: /\.png$/, use: 'url-loader' },
      { test: /\.svg$/, use: 'raw-loader' },
    ],
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader'],
    }),
    new HtmlWebpackPlugin({
      title: null,
      hash: true,
      chunks: ['react'],
      template: 'template.html',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: '#cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    host: '0.0.0.0',
    port: 8001,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://10.36.129.255/',
      },
    },
  },
};
