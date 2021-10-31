const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',//在导出一个 data URI 和发送一个单独的文件之间自动选择
      }
    ],
    resolve: {
      extensions: ['.vue', '.js'], //表示在import 文件时文件后缀名可以不写
      alias: {
        '@': path.join(__dirname, 'src')
        // 这里的别名配置需与 jsconfig 中的 paths 别名一致
        // import的文件在src下component里的时候可以直接写成 @/component/...
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '我是webpack.config配置的标题',
        template: './public/index.html',
        //压缩HTML
        minify: {
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true // 删除空白符与换行符
        }
      })
    ],
    devServer: {
      contentBase: '../dist',
      hot: true
    },
  },
};
