import Webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import Autoprefixer from 'autoprefixer';
import PostCSS from './postcss.config';
import path from 'path';


const VENDOR_LIBS = [ "body-parser", "connect-redis", "dotenv",
  "express", "express-session", "express-validator", "googleplaces",
  "lodash", "lusca", "react", "react-dom", "react-google-maps",
  "react-modal", "react-promise", "react-redux", "react-router",
  "react-router-redux", "react-tabs", "redis", "redux", "request",
  "skeleton-css", "util", "webpack", "webpack-dev-server", "yelp"
];

const BASE_CONFIG = {
  devtool: 'cheap-eval-source-map',
  entry: {
    bundle: path.resolve(__dirname, 'app/app'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
    // publicPath: 'http://oliver.jobplus.online/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules|bower_components)/,
        use: 'babel'
      }, {
        test: /\.(scss|sass)$/i,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: ['css', 'postcss', 'sass']
        })
      }, {
        test: /\.json$/i,
        use: 'json'
      }, {
        test: /\.(pdf|doc[mstx]?|ppt[mstx]?|od[fpst])$/i,
        use: 'file?name=/docs/[name].[ext]'
      }, {
        test: /\.(jpe?g|png|gif|bmp|svg|ttif)$/i,
        use: [
          {
            loader: 'url',
            options: { limit: 40000 }
          },
          'file?name=/images/[name].[ext]',
          'image-webpack'
        ]
      }
    ]
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: { PostCSS }
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HTMLWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
};

const DEV_SERVER = {
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    colors: {
      bold: '\u001b[1m',
      cyan: '\u001b[1m\u001b[36m',
      green: '\u001b[1m\u001b[32m',
      magenta: '\u001b[1m\u001b[35m',
      red: '\u001b[1m\u001b[31m',
      yellow: '\u001b[1m\u001b[33m'
    },
    errorDetails: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: true,
    timings: true,
    version: false,
    warnings: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
};


if (process.env.NODE_ENV === 'production') {
  module.exports = WebpackMerge(BASE_CONFIG, DEV_SERVER);
} else {
  module.exports = BASE_CONFIG;
}


// 'webpack-dev-server/client?http://localhost:3000',
// 'webpack/hot/only-dev-server',
