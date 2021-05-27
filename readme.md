## 基于ts的贪吃蛇游戏

### 1. 首先是项目坏境的搭建
* 1. 可以参考地址 https://juejin.cn/editor/drafts/6961039407012904997
* 2. 首先是新建一个文件夹part2(名字自己取类不要带中文)需要全局安装typesript的 `npm i -g typescript` 
* 3. `tsc --init` 生成`tsconfig.json`文件并且进行相应配置,我这里就是更改了下面内容，指定使用ES6语法,ES6模块

```javascript
"target": "ES2015",
"module": "ES2015",
```

* 4. 配置webpack打包坏境 初始化项目——`npm init -y`生成`package.json`文件。
* 5. 下载一些webpack打包需要的插件  `npm i -D webpack webpack-cli typescript ts-loader`,并且新建一个`webpack.config.js`文件进行对应配置,配置之前先新建一个`src dist`文件夹
<p>
  <img src="./images/dist.jpg">
</p>

- 配置`webpack.config.js`文件详细过程见`webpack.config.js`文件有详细注释
`webpack.config.js`基本配置如下：
```javascript
//引入一个包
const path = require('path');
module.exports = {
    //配置入口文件
    entry: "./src/index.ts",
    //配置打包后的文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        environment: {
            arrowFunction: false,
        }
    },
    //配置webpack打包时使用的模块
    module: {
        rules: [{
            //test 指定规则生效文件所有后缀为.ts的文件
            test: /\.ts$/,
            //使用ts-loader处理 .ts文件
            use: 'ts-loader',
            //要排除的文件
            exclude: /node_modules/,
        }]
    }
}
```

- 配置完之后在`package-json`文件里面写入
```javascript
"scripts": {
        ...
        "build": "webpack"
    },
```
- 之后在当前目录下执行`npm run build`测试`webpack`基本配置是否生效,出现如下：即成功
<p>
  <img src="./images/webpack.jpg">
</p>

- 继续配置`webpack.config.js`,下载`npm i -D html-webpack-plugin`插件自动生成html文件并在`webpack.config.js`里面配置
```javascript
//引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
...
//配置Webpack插件
plugins: [
        new HTMLWebpackPlugin(),
    ]
```
- 当前目录下执行`npm run build`测试插件是否配置成功;配置成功则会在dist目录下面生成index.html文件,也可以自己提供index.html模板：
```javascript
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
  ]
```
配置自动构建 `npm i -D webpack-dev-server`,并且在package.json文件中配置：
```javascript
   "scripts": {
        ...
        "start": "webpack serve --open"
    },
```
- 配置完成之后在当前目录下面执行`npm start`,打开网页的控制台如果有错误刷新一下;
- 继续配置每次更新前删除旧的dist文件：配置方式和`npm i -D html-webpack-plugin`一样不在赘述;参照文件引入吧
- 设置引用模块
```javascript
resolve: {
        extensions: ['.ts', '.js']
    }
```
- 配置babel解决兼容性 `npm i -D @babel/core @babel/preset-env babel-loader core-js`
配置`webpack.config.js`文件
```javascript
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
                ...
            ],
```
> 完了之后把代码上传到gitHub仓库,注意不要上传那行node_modules dist下面的文件。

