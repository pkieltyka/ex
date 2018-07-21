const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const main = [
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
  './src/index.ts'
]

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main: main
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
      watch: ['./src'] // optional but improves performance (fewer stat calls)
    }),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin(shared.appEnvVars('config/app.dev.env')),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [{
      test: /.tsx?$/,
      use: [{
        loader: 'ts-loader', options: { transpileOnly: true }
      }],
      exclude: path.resolve(process.cwd(), 'node_modules'),
      include: path.resolve(process.cwd(), 'src'),
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.join(process.cwd(), 'src')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    disableHostCheck: true
  }
}
