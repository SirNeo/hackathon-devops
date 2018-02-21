var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './index.js',
        appStyles: [
            './styles.css',
        ],
        vendor: [
            'jquery',
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[chunkhash].[name].js'
    },
    module: {
        rules: [
            // Transpilate ES6 code
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
            },
            // Load the custom css to index.html
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                    },
                }),
            },
        ],
    },
    // Debug ES6 code
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
            names: ['vendor', 'manifest'],
        }),
        // Generate bundle with css extension.
        new ExtractTextPlugin({
            filename: '[chunkhash].[name].css',
            disable: false,
            allChunks: true,
        }),
    ],
};