require('regenerator-runtime/runtime');
const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src/client'),
  entry: ['regenerator-runtime/runtime', './index.tsx'],
  target: 'web',
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'bin/client'),
    filename: 'main.js'
  },
  plugins: [
    new DefinePlugin({
      CONFIG: JSON.stringify(require('config'))
    }),
    new HtmlWebPackPlugin({
      template: './index.html'
    }),
    new CopyPlugin([
      { from: 'main.css' },
      { from: '../../static', to: 'static' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
};
