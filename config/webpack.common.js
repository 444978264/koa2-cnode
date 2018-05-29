const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
console.log(process.env)
module.exports = {
    // context: path.resolve(__dirname, "../app"),
    entry: path.resolve(__dirname, '../source/app.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
};