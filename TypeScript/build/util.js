const webpack = require('webpack')

const { join } = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HappyPack = require('happypack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const dllEntry = exports.dllEntry = {
    react: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'react-transition-group', 'react-loadable'],
    axios: ['axios'],
    redux: ['redux', 'redux-thunk'],
    core: ['core-js/es6']
}

exports.dllOutput = {
    publicPath: '/',
    path: join(__dirname, '../dist'),
    library: '[name]_[hash:5]',
    filename: `lib/[name]_[hash:5].dll.js`
}

exports.UglifyJsPluginConfig = function UglifyJsPluginConfig() {
    return new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
            compress: {
                drop_console: true,
                keep_infinity: true,
            },
            output: {
                comments: false,
                beautify: false,
            }
        }
    })
}

exports.rulesConfig = function rulesConfig(isDiv) {
    return [
        {
            test: /\.(tsx|ts)?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "awesome-typescript-loader",
                    options: {
                        forceIsolatedModules: true,
                        useCache: true,
                        useBabel: true,
                        babelCore: '@babel/core',
                        babelOptions: {
                            "presets": [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            "plugins": [
                                "@babel/plugin-transform-runtime",
                                [
                                    "@babel/plugin-proposal-decorators",
                                    {
                                        "legacy": true
                                    }
                                ],
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-function-bind",
                                "@babel/plugin-proposal-export-namespace-from",
                                "@babel/plugin-syntax-dynamic-import",
                                "react-loadable/babel"
                            ]
                        }
                    }
                }
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'happypack/loader?id=js'
        },
        {
            test: /\.less/,
            use: isDiv ? ['style-loader', 'happypack/loader?id=less'] : [MiniCssExtractPlugin.loader, 'happypack/loader?id=less']
        },
        {
            test: /\.css/,
            use: isDiv ? ['style-loader', 'happypack/loader?id=css'] : [MiniCssExtractPlugin.loader, 'happypack/loader?id=css']
        },
        {
            test: /.(gif|jpg|png)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/images/[name].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/font/[name].[ext]'
                    }
                }
            ]
        }
    ]
}

exports.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json']

exports.HtmlWebpackPluginConfig = function HtmlWebpackPluginConfig() {
    return new HtmlWebpackPlugin({
        template: join(__dirname, '../index.html'),
        alwaysWriteToDisk: true,
        filename: 'index.html',
        title: 'react脚手架'
    })
}

exports.DllReferencePlugin = function DllReferencePlugin() {
    return Object.keys(dllEntry).map(item => {
        return new webpack.DllReferencePlugin({
            context: join(__dirname, '..'),
            manifest: require(`../manifest/${item}.json`)
        })
    })
}

exports.HappyPackConfig = function HappyPackConfig() {
    return [
        new HappyPack({
            id: 'js',
            loaders: [
                { loader: 'source-map-loader', enforce: 'pre' }
            ]
        }),
        new HappyPack({
            id: 'less',
            loaders: [
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
                        localIdentName: '[name]-[hash:base64:5]'
                    }
                },
                { loader: 'postcss-loader' },
                { loader: 'less-loader' },
            ]
        }),
        new HappyPack({
            id: 'css',
            loaders: [
                { loader: 'css-loader' },
                { loader: 'postcss-loader' }
            ]
        })
    ]
}

exports.MiniCssExtractPluginConfig = function MiniCssExtractPluginConfig() {
    return new MiniCssExtractPlugin({
        filename: "css/[name]_[hash:5].css",
        chunkFilename: "css/[name]_[hash:5].css"
    })
}

exports.CleanWebpackPluginConfig = function CleanWebpackPluginConfig() {
    return new CleanWebpackPlugin(['js', 'assets', 'css'], {
        root: join(__dirname, '../dist'),
        exclude: ['lib']
    })
}