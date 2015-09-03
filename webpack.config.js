'use strict';

//---- Webpack requires --------------------------------------------------------
var webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


//---- Path options ------------------------------------------------------------
var path      = require('path'),
    srcPath   = path.join(__dirname, 'src'),
    buildPath = 'build',
    appModule = 'app.js';

module.exports = {
  target: 'web',
  entry: {
    // Path to the main app file. (/app.js)
    app: path.join(srcPath, appModule),

    // Common modules that can be included only on pages that need them
    common: ['react', 'react-router']
  },
  output: {
    // Build directory (./build)
    path: path.join(__dirname, buildPath),

    // The output.path from the view of the Javascript / HTML page. (cool.com/<publicPath>)
    publicPath: '',

    // Name of the file based on entry point (app.js | common.js)
    filename: '[name].js'
  },
  resolve: {
    // Absolute path of your modules
    root: srcPath,
    // Allows files of a specific extension to be discovered.
    extensions: ['', '.js'],

    // An array of directory names to be resolved to the current directory as well as
    // its ancestors, and searched for modules. This functions similarly to how node
    // finds "node_modules" directories. For example, if the value is ["mydir"],
    // webpack will look in "./mydir", "../mydir", "../../mydir", etc.
    modulesDirectories: ['node_modules', 'src']
  },
  module: {
    loaders: [
      {
        // Name of loader
        loader: 'babel',

        // Regex that matches file extensions to the loader
        test: /\.js?$/,

        // Directories to exclude
        exclude: /node_modules/,

        // Params sent to the loader
        query: {
          cacheDirectory: true,
          optional: ['runtime'],
          // Enable ES7 decorators, exportExtensions and trailingFunctionCommas
          stage: 0
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: srcPath + '/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],
  // Turns debug mode on in loaders
  debug: true,

  // Used for debugging.
  /**
   * 'eval-cheap-module-source-map' offers SourceMaps that only maps lines
   * (no column mappings) and are much faster.
   */
  devtool: 'eval-cheap-module-source-map',

  // webpack-dev-server config.
  devServer: {
    contentBase: './' + buildPath,
    historyApiFallback: true
  }
};
