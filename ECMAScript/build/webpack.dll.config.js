const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const { dllEntry, dllOutput, manifestPath, root, UglifyJsPluginConfig } = require('./util')

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
        new CleanWebpackPlugin(['dist', 'manifest'], { root }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            context: root,
            path: manifestPath,
            name: dllOutput.library
        })
    ]
}
