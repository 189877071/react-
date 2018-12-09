const webpack = require('webpack')

const merge = require('webpack-merge')

const webpackBase = require('./webpack.base.config')

module.exports = merge(webpackBase(true), {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        historyApiFallback:true,
        hot:true,
        inline:true,
        port: 8080,
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})