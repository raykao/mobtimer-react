var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      options: webpackConfig,
      build: {
        plugins: [
          new webpack.DefinePlugin({
            "process.env": {
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin({minimize: true, compress: { warnings: false }})
        ]
      }
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig
      },
      start: {
        keepAlive: true,
        contentBase: 'public',
        webpack: {
          devtool: 'eval',
          debug: true
        }
      }
    }
  });

  grunt.registerTask('default', ['webpack-dev-server:start']);
  grunt.registerTask('build', ['webpack:build']);
};
