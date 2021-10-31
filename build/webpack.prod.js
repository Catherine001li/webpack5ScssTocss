const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  // devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // 无损设置
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    // 压缩js
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true // 使用多进程并发执行，提升构建速度
      }),
      // 压缩js
      new TerserPlugin({
        parallel: true // 使用多进程并发执行，提升构建速度
      })
    ],
  },
});
