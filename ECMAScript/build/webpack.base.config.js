const webpack = require('webpack')

const { join } = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const { rulesConfig, DllReferencePlugin, extensions, HappyPackConfig, HtmlWebpackPluginConfig } = require('./util')

module.exports = (isDev) => ({
    entry: join(__dirname, '../src/main.jsx'),
    output: {
        publicPath: '/',
        path: join(__dirname, '../dist'),
        filename: 'js/bundle_[name].js',
        chunkFilename: 'js/bundle_[name]_[chunkhash:5].js'
    },
    module: {
        rules: rulesConfig(isDev)
    },
    resolve: {
        extensions
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                dev: JSON.stringify(!!isDev),
                ssr: JSON.stringify(false)
            }
        }),
        HtmlWebpackPluginConfig(),
        ...DllReferencePlugin(),
        ...HappyPackConfig(),
        new CopyWebpackPlugin([
            { from: join(__dirname, '../assets/**/*') }
        ]),
        new HtmlWebpackIncludeAssetsPlugin({
            files: '*.html',
            assets: [{ path: 'lib', glob: '*.dll.js', globPath: join(__dirname, '../dist/lib') }],
            append: false
        })
    ]
})