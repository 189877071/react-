const webpack = require('webpack')

const { join } = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const { rulesConfig, extensions, HtmlWebpackPluginConfig, DllReferencePlugin, HappyPackConfig } = require('./util')

module.exports = (isDev) => ({
    entry: join(__dirname, '../src/main.tsx'),
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
        // new HardSourceWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                dev: JSON.stringify(!!isDev),
                ssr: JSON.stringify(false),
                browser: JSON.stringify(true),
            }
        }),
        ...DllReferencePlugin(),
        ...HappyPackConfig(),
        HtmlWebpackPluginConfig(),
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
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