const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    filename: '[name].[contenthash].js',// 输出文件
    path: path.resolve(__dirname, '../dist'),// 输出文件存放地址
  },
  resolve: {
    extensions: ['.vue', '.js'], //表示在import 文件时文件后缀名可以不写
    alias: {
      '@': path.join(__dirname, '../src')
      //import的文件在src下的时候可以直接写成 @/component/...
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' //css打包输出出口及文件名称
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // type: 'asset',//在导出一个 data URI 和发送一个单独的文件之间自动选择
        // 构建工具通过url-loader来优化项目中对于资源的引用路径，并设定大小限制，当资源的体积小于limit时将其直接进行Base64转换后嵌入引用文件，体积大于limit时可通过fallback参数指定的loader进行处理。
        // 打包后可以看到小于8k的资源被直接内嵌进了CSS文件而没有生成独立的资源文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8129,//小于limit限制的图片将转为base64嵌入引用位置
            fallback: 'file-loader',//大于limit限制的将转交给指定的loader处理，开启这里后就无需再单独配置file-loader
            outputPath: 'images/'//options会直接传给fallback指定的loader
          }
        }]
      },
      {
        test: /\.scss$/,
        // include: [path.resolve(__dirname, 'src')],   // 限制打包范围，提高打包速度
        // exclude: /node_modules/,                     // 排除node_modules文件夹
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  // https://webpack.docschina.org/guides/caching/
  optimization: {
    // deterministic 选项有益于长期缓存
    moduleIds: 'deterministic',
    // 使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk
    runtimeChunk: 'single',
    splitChunks: {
      // 利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，
      // 同时还能保证 client 代码和 server 代码版本一致。 这可以通过
      // 使用SplitChunksPlugin 插件的 cacheGroups 选项来实现。
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
