const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//设置nodejs环境变量 不配置，默认使用生产环境  production
// process.env.NODE_ENV = 'development'

// optimize-css-assets-webpack-plugin 压缩插件
module.exports = {
    entry:'./src',
    output:{
        filename:'js/main.js',
        path:resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    // 提取js中的css成单独文件,取代style.loader 
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    // css兼容性处理：postcss --> postcss.loader postcss-press-env
                    //使用loader的默认配置
                    // 'postcss-loader'
                    // 修改loader配置
                    // "browserslist": {
                    //      默认走生产环境需启动兼容配置postcss-loader  开发环境需要设置环境变量 process.env.NODE_ENV = development
                    //     "development": [ 开发环境兼容最近的浏览器版本
                    //       "last 1 chrome version",
                    //       "last 1 firefox version",
                    //       "last 1 safari version"
                    //     ],
                    //     "production": [ 生产环境不兼容已经死掉 和mini 这类型浏览器  
                    //       ">0.2%",
                    //       "not dead",
                    //       "not op_mini all"
                    //     ]
                    //   }
                    {
                        loader:'postcss-loader',
                        // 当前 5.3.0 postcss-loader不支持直接在webpack.config.js中写入处理规则 我们需要在根目录新建一个postcss.config.js将配置写入到文件就可以了
                        // options:{
                        //     ident:'postcss',
                        //     plugins:() => {
                        //         //post-preset-env 帮postcss 找到browserslist的位置 在package.json文件中
                        //         require('postcss-preset-env')()
                        //     }
                        // }
                    }
                ],
            },
            // {
            //     /**
            //      * 语法检查 eslint-loader eslint 只检查源代码 ，第三方库不检查
            //      * 设置检查规则
            //      * package.json中eslintConfig中设置~
            //      * "eslintConfig":{
            //      *      "extends": "airbnb-base"
            //      * }
            //      * airbnb --> eslint-config-airbnb-base  eslint-plugin-import  eslint
            //      */
            //     test:/\.js$/,
            //     exclude:/node_modules/,
            //     loader:'eslint-loader',
            //     options:{
            //         fix:true
            //     }

            // },
            {
                /**
                 * 1.js兼容性处理 babel-loader|
                 * 只能转换基本的语法promiss 不能被转换
                 * 2. 全部的js兼容性处理 使用@bable/polyfill
                 * 3.需要做兼容性处理才执行：按需加载 corejs
                 */
                // test:/\.js$/,
                // exclude:/node_modules/,
                // loader:'babel-loader',
                // options:{
                //     // 预设环境兼容性处理
                //     presets:['@babel/preset-env']
                // }
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns:'usage',
                                // 制定core-js版本
                                corejs:{
                                    version:3
                                },
                                // 指定兼容浏览器版本
                                targets:{
                                    chrome:'60',
                                    firefox:'60',
                                    ie:'9',
                                    safari:'10',
                                    edge:'17'
                                }
                            }
                        ]   
                    ]
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new miniCssExtractPlugin({
            // 输出文件的存放位置和重命名
            filename:'css/built.css'
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    devServer:{
        contentBase:resolve(__dirname,'dist'),
        compress:true,
        port:3000,
        open:true
    },
    // 生产环境会自动压缩js代码 
    // process.env.NODE_ENV  是nodsjs环境变量，我们打包时会根据不同环境 打包代码  dev开发环境打包不会压缩代码  prod生产环境打包会压缩代码（css，js，img等其他文件，降低文件大小）  
    mode: process.env.NODE_ENV
}