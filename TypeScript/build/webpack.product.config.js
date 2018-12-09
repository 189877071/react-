const webpack = require('webpack')

const merge = require('webpack-merge')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpackBade = require('./webpack.base.config')

const { UglifyJsPluginConfig, MiniCssExtractPluginConfig, CleanWebpackPluginConfig } = require('./util')

module.exports = merge(webpackBade(), {
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            UglifyJsPluginConfig()
        ]
    },
    plugins: [
        MiniCssExtractPluginConfig(),
        CleanWebpackPluginConfig(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
})