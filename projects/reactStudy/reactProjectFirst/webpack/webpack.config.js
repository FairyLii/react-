const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js', // 入口文件
    output: {
        path: path.resolve('dist'), // 定义输出目录
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 匹配.js文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: path.resolve( 'dist/index.html')
        })
    ]
};
