const webpack = require('webpack')

const merge = require('webpack-merge')

const webpackBase = require('./webpack.base.config')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { ReactLoadablePlugin } = require('react-loadable/webpack')

const { join } = require('path')

const { UglifyJsPluginConfig, MiniCssExtractPluginConfig, CleanWebpackPluginConfig } = require('./util')

module.exports = merge(webpackBase(), {
    entry: join(__dirname,'../src/ssrMain.tsx'),
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
        new ReactLoadablePlugin({
            filename: join(__dirname, '../manifest/react-loadable.json'),
        })
    ]
})