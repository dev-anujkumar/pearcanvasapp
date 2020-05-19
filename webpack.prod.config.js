/**
 * Module - Webpack Config
 * Description - webpack config for production built on v4
 */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const USEHASH = '[contenthash]'; // Use [hash] in case of HMR is enabled and [contenthash] otherwise
const DOTENV = require('dotenv').config({ path: __dirname + '/.env' });

const _env = process.env.NODE_ENV;
let devtool = (_env === 'production') ? 'source-map' : 'inline-source-map';

module.exports = {
    mode: _env,
    entry: { main: './src/index.js' },
    output: {
        filename: `[name].${USEHASH}.bundle.js`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/, // This may not be needed since we supplied `include`.
                include: path.resolve(__dirname, 'src'),
                /*              
                Loaders will be applied from right to left.              
                E.x.: loader3(loader2(loader1(data)))            
                */
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                /*
                                  To get tree shaking working, we need the `modules: false` below.
                                */
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            browsers: [
                                                'last 2 versions'
                                            ]
                                        },
                                        modules: false // Needed for tree shaking to work.
                                    }
                                ],
                                '@babel/preset-react'
                            ],
                            //  List of Babel plugins.
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-transform-async-to-generator'
                            ]
                        }
                    }
                ]
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                // Loads images into CSS and Javascript files
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ loader: "url-loader" }]
            },
            {
                // Loads CSS into a file when you import it via Javascript
                // Rules are set in MiniCssExtractPlugin
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        // To cleanup dis folder every time with unwanted assets
        new HtmlWebpackPlugin({
            // All the JS resources will be placed at head element
            inject: 'head',
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ScriptExtHtmlWebpackPlugin({
            //To add defer property in script tags
            defaultAttribute: 'defer'
        }),
        new CopyPlugin([
            {
                from: path.join(__dirname, 'src/favicon.ico'),
                to: path.join(__dirname, 'dist/')
            },
            {
                from: path.join(__dirname, 'src/static/health.html'),
                to: path.join(__dirname, 'dist/')
            }
        ]),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        // To prevent vendor hash id to change everytime
        new webpack.HashedModuleIdsPlugin(),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(DOTENV.parsed)
        })
    ],
    // To show the console error with exact file name
    devtool: devtool,
    optimization: {
        runtimeChunk: 'single', // To extract the manifest and runtime
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        sideEffects: false,
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}