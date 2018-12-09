const webpack = require('webpack')

const { join } = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const nodeExternals = require('webpack-node-externals')

const { extensions, rulesConfig, HappyPackConfig, MiniCssExtractPluginConfig } = require('./util')

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
    target: 'node',
    mode: 'production',
    devtool: false,
    entry: join(__dirname, '../src/ssrServerMain.tsx'),
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
    optimization: {
        minimizer: [
            // new OptimizeCSSAssetsPlugin({}),
            // UglifyJsPluginConfig()
        ]
    },
    plugins: [
        // new HardSourceWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                dev: JSON.stringify(false),
                ssr: JSON.stringify(true),
                browser: JSON.stringify(false), 
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