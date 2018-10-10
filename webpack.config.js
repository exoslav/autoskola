var path = require('path');
var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEnv(env) {
  try {
    return env.prod ? 'prod' : 'dev';
  }
  catch(err) {
    console.log('Error is getting env in webpack.config.js.', err);

    return 'dev';
  }
}

module.exports = function (env) {
  console.log('<-- AUTOSKOLA startup... -->');

  var env = getEnv(env);

  var config = {
    entry: {
      'app': './src/js/app.js'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].min.js'
    },
    mode: env === 'prod' ? 'production' : 'development',
    devtool: env === 'prod' ? 'cheap-module-source-map' : 'inline-source-map', // viz.: https://webpack.js.org/configuration/devtool/
    plugins: [
      new ExtractText({
        filename: '[name].min.css',
        disable: false,
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        template: './www/index.html'
      })
    ],
    resolve: {
      extensions: ['.js', '.json']
    },
    devServer: {
      contentBase: './dist',
      compress: true,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.join(__dirname, '/src/js'),
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        {
          test: /\.(scss)$/,
          use: ExtractText.extract({
            "fallback": "style-loader",
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: env === 'prod' ? true : false
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    }
  };

  return config;
}