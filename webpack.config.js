var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    path.join(__dirname, 'app/index')
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'main.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    }, { 
      test: /\.json$/, 
      loader: 'json'
    }]
  }
};
