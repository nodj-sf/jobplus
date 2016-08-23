const webpack = require('webpack');
const path = require('path');


module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/app')
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'main.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }, { 
      test: /\.json$/, 
      loader: 'json'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file-loader?name=/public/img/[name].[ext]'
    }]
  },
  devServer: {
  contentBase: "./public",
    noInfo: false,
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
};
