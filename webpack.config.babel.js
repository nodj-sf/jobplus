import Webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';


module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/app')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/i,
      exclude: /node_modules/,
      // include: path.join(__dirname, 'app')
      loaders: ['react-hot', 'babel'],
    }, {
      test: /\.json$/i,
      loader: 'json'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file?name=/public/img/[name].[ext]'
    }]
  },
  devServer: {
    contentBase: __dirname,
    // contentBase: 'dist/',
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
