const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.join(__dirname),
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      /*  {
       enforce: 'pre',
       test: /\.(js|jsx)$/,
       include: [
       path.resolve(__dirname, 'start.js'),
       path.resolve('src')
       ],
       exclude: /node_modules/,
       options: {
       configFile: path.resolve('./.eslintrc.json')
       },
       loader: 'eslint-loader'
       }, */
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions: ['.js', '.jsx', '.webpack.js', '.web.js']
  },
  resolveLoader: {
    modules: [__dirname, 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REGISTRATION_LANGUAGE: JSON.stringify(process.env.REGISTRATION_LANGUAGE)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin(
      [
        { from: './src/assets/css/bootstrap*', to: './', flatten: true },
        { from: './src/assets/img/*', to: './img', flatten: true }
      ],
      {
        copyUnmodified: true
      }
    )
  ]
};
