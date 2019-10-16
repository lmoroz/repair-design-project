const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

if (process.env.NODE_ENV === 'production') {
  config.module.rules[7].options.magic = true;
}
module.exports = {
  target:    'web',
  mode:      'production',
  entry:     {app: './src/app.js'},
  output:    {
    filename: '[name].js',
    path:     path.resolve(__dirname, './build/'),
  },
  devServer: {
    contentBase:      path.resolve(__dirname, './src'),
    watchContentBase: true,
    compress:         true,
  },
  plugins:   [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject:   true,
      hash:     false,
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/fonts',
        to:   './assets/fonts',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),

  ],
  module:    {
    rules: [
      {
        test:    /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader:  'file-loader',
        options: {
          publicPath: '/assets/fonts/',
          outputPath: './assets/fonts/',
          name:       '[name].[ext]'
        }
      },
      {
        test:    /\.(png|jpe?g|gif|svg)$/,
        loader:  'file-loader',
        options: {
          publicPath: '/assets/images/',
          outputPath: './assets/images/',
          name:       '[name].[ext]'
        }
      },
      {
        test: /\.(html)$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      },
      {
        test: /\.css$/,
        use:  [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader:  'css-loader',
            options: {importLoaders: 1}
          },
          {
            loader:  'postcss-loader',
            options: {sourceMap: true, config: {path: 'src/postcss.config.js'}}
          }
        ]
      }
    ]
  },
};
