//引入一个包
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    //配置入口文件
    entry: "./src/index.ts",
    //配置打包后的文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        //配置打包坏境 不适用箭头函数
        environment: {
            arrowFunction: false,
        }
    },
    //配置webpack打包时使用的模块
    module: {
        rules: [{
            //test 指定规则生效文件所有后缀为.ts的文件
            test: /\.ts$/,
            //使用ts-loader处理 .ts文件 babel-loader处理兼容性
            use: [
                // 'babel-loader',
                {
                    loader: "babel-loader",
                    //设置babel 预定义的坏境在哪些浏览器运行
                    options: {
                        presets: [
                            [
                                //指定坏境插件
                                "@babel/preset-env",
                                //配置信息
                                {
                                    //targets指定兼容的浏览器版本 corejs指定corejs版本
                                    targets: {
                                        "chrome": "58",
                                        "ie": "11",
                                    },
                                    //
                                    "corejs": "3",
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader',
            ],
            //要排除的文件
            exclude: /node_modules/,
        }]
    },
    //配置Webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}