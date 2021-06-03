const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//设置nodejs环境变量 不配置，默认使用生产环境  production
process.env.NODE_ENV = 'development'

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
  
    mode:'development'
}