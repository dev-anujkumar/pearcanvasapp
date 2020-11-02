/**
 * Module - Webpack Config
 * Description - webpack config for development built on v4
 */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const BrotliPlugin = require('brotli-webpack-plugin');
const USEHASH = '[hash]'; // Use [hash] in case of HMR is enabled and [contenthash] otherwise
const COMPRESSION = process.env.COMPRESSION && process.env.COMPRESSION == 'true' || false;
const DOTENV = require('dotenv').config({ path: __dirname + '/.env' });
const plugin = [
    // To cleanup dis folder every time with unwanted assets
    new HtmlWebpackPlugin({
        // All the JS resources will be placed at head element
        inject: 'head',
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
        excludeChunks: ['server']
    }),
    new ScriptExtHtmlWebpackPlugin({
        //To add defer property in script tags
        defaultAttribute: 'defer'
    }),
    new CopyPlugin({ 
        patterns:[
        {
            from: path.join(__dirname, 'src/favicon.ico'),
            to: path.join(__dirname, 'dist/'),
        },
        {
            from: path.join(__dirname, 'src/static/health.html'),
            to: path.join(__dirname, 'dist/')
        }
    ]}
    ),
    // To prevent vendor hash id to change everytime
    new webpack.HashedModuleIdsPlugin(),
    // This doesn't work with [contenthash] or [chunkhash] and uncomment it if HMR is needed
    new webpack.HotModuleReplacementPlugin(),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        "process.env": JSON.stringify(DOTENV.parsed)
    }),
    {
        apply: (compiler) => {
            
        }
    }
];

if (COMPRESSION) {
    plugin.push(
        new BrotliPlugin({
            asset: '[file].br',
            test: /\.(js|jsx)$/
        })
    )
}

module.exports = {
    mode: 'development',
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
    },
    output: {
        filename: `[name].${USEHASH}.bundle.js`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?[\s\S]+)?$/,
                loader: ['file-loader']
            }
        ]
    },
    plugins: plugin,
    // To show the console error with exact file name
    devtool: 'inline-source-map',
    // Webapck dev server basic configuration
    devServer: {
        // Webpack dev server will lookup for this dir
        contentBase: path.join(__dirname, 'dist'),
        // Enable gzip compression for everything served:
        compress: true,
        https: true,
        open: true,
        overlay: true,
        port: 9000,
        index: 'index.html',
        hot: true,
        proxy: [{
            context: ['**/configurationjs**', '/pluginwiris_engine/**'],
            target: 'https://dev-structuredauthoring.pearson.com/',
            secure: false,
            pathRewrite: {
                '^/static/js': '/tinywiris/tinymce4/js/tinymce'
            }
        }]
    },
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
        minimize: true
    }
}