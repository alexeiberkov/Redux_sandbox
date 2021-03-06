var path = require('path');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var precss = require('precss');

let loadersSetup = [
    {
        loader: 'babel-loader',
        options: {
            plugins: ['transform-runtime'],
            presets: ["es2015", "stage-0", "react"]//[['es2015', { modules: false }], 'stage-3'],
        }
    },
    {
      loader: 'eslint-loader'
    },
];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
      'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),
    new NpmInstallPlugin()
  ],
  module: {
        rules: [
            {
                test: /\.jsx?$/,
                // Skip any files outside of `src` directory
                include: /src/,
                exclude: /node_modules/,
                // loaders depending on target (ES6 or ES5)
                use: loadersSetup
            },
            {
              test: /\.css$/,
              use: [{
                   loader: 'style-loader', // inject CSS to page
                 }, {
                   loader: 'css-loader', // translates CSS into CommonJS modules
                 }, {
                   loader: 'postcss-loader', // Run post css actions
                   options: {
                     plugins: function () { // post css plugins, can be exported to postcss.config.js
                       return [precss];
                     }
                   }
                 }]
            }
        ]
  }
}
