const webpack = require('webpack')

const { join } = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const { dllEntry, dllOutput, UglifyJsPluginConfig } = require('./util')

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: dllEntry,
    output: dllOutput,
    optimization: {
        minimizer: [UglifyJsPluginConfig()]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(['dist', 'manifest'], { root: join(__dirname, '..') }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            context: join(__dirname, '..'),
            path: join(__dirname, '../manifest', '[name].json'),
            name: dllOutput.library
        })
    ]
}