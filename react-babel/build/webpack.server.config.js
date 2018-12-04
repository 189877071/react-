const webpack = require('webpack')

const { join } = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const nodeExternals = require('webpack-node-externals')

const { extensions, rulesConfig, HappyPackConfig, MiniCssExtractPluginConfig } = require('./util')

module.exports = {
    target: 'node',
    mode: 'production',
    devtool: false,
    entry: join(__dirname, '../src/ssrServerMain.jsx'),
    output: {
        publicPath: '/',
        path: join(__dirname, '../serverDist'),
        filename: 'index.js',
        chunkFilename: 'js/bundle_[name]_[chunkhash:5].js',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    
    resolve: {
        extensions
    },
    module: {
        rules: rulesConfig()
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                dev: JSON.stringify(false),
                ssr: JSON.stringify(true)
            }
        }),
        ...HappyPackConfig(),
        MiniCssExtractPluginConfig(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(['serverDist'], {
            root: join(__dirname, '..')
        })
    ]
}