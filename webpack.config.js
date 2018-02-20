var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.js',
        vendor: [
            'jquery',
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 8081,
    },
    plugins: [
        // Generate index.html in /dist 
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: 'index.html', //Name of template in ./src
            hash: true,
        }),
        // Allow use jQuery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Place third party libraries in separate js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
    ],
};