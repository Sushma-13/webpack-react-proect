const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // file to compile and all the files and dependencies it imports
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.[contenthash].js',
    clean: true, // cleaning hash files, as whenever we will run build cmd, every time a new hash file will get generated, thats why we use clean to remove other hash files
    assetModuleFilename: 'assets/[name][ext]',
  },
  devtool: 'source-map', // create .map files of the bundles separately to make debugging easy
  devServer: {
    static: './dist',
    port: 8080, // default 8000
    open: true, // open webpage when we run npm run dev
    hot: true, // allow hot-reloading
    compress: true, // compress the build folder for development
  },
  module: {
    rules: [
      // all loaders
      {
        // loader for transpiling latest js and react codes
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // loader for understanding css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // serve this html file to browser in dev mode, and create an HTML entry file to build folder for production
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
    // load .env files in project
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      prefix: 'env.', // The prefix to use before the name of your env variables. (default - process.env.)
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'src/assets', to: 'assets' }, //to the dist root directory
    //   ],
    // }),
  ],
};
