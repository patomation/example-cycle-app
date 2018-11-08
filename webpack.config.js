const { resolve } = require('path')

const distPath = resolve(__dirname, 'dist')

module.exports = {
  context: __dirname,
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: distPath,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    contentBase: distPath
  }
}
