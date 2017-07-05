const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 设置输入和输出根目录
const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: BUILD_PATH, // 编译到当前目录
        filename: '[name].js', // 编译后的文件名字
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    devServer: {
        contentBase: ROOT_PATH,
        historyApiFallback: true,
        hot: true,
        open: true,
        inline: true,
        port: 8888
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules$/,
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }, {
                test: /\.css$/,
                exclude: /node_modules$/,
                loaders: [
                    'style-loader', 'css-loader', 'autoprefixer-loader'
                ],
                include: [APP_PATH]
            }, {
                test: /\.scss$/,
                exclude: /node_modules$/,
                loaders: [
                    'style-loader', 'css-loader?sourceMap', 'autoprefixer-loader', 'sass-loader?sourceMap'
                ],
                include: [APP_PATH]
            }, {
                test: /\.(png|jpg|gif|jpeg)$/, // 处理css文件中的背景图片
                loader: 'url-loader?limit=1&name=./static/assets/[name].[hash:4].[ext]'
                // 当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
            }, {
                test: /\.html$/, // 获取html里面的图片
                loader: 'html-loader'
            }, {
                test: /\.(js|jsx)$/, // 用babel编译jsx和es6
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        'es2015', 'react'
                    ],
                    plugins: [['transform-object-rest-spread'], ['transform-runtime']
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.sass',
            '.scss',
            '.less',
            'jsx',
            '.vue'
        ],
        alias: {
            'assets': path.resolve(APP_PATH, './assets'),
            'components': path.resolve(APP_PATH, './components')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的html存放路径，相对于 path
            template: './index.html',
            inject: true, // 允许插件修改哪些内容，包括head与body
            hash: true // 为静态资源生成hash值
        })
    ],
    watch: false
}
