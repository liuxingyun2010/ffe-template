const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolveAutosPath, resolveProjectPath } = require('../libs/utils')

const isDev = process.env.NODE_ENV === 'development'

const styleRules = [
  isDev
    ? {
        loader: 'style-loader',
        options: {
          esModule: false,
          injectType: 'singletonStyleTag',
          attributes: { id: `${syscode}Style` },
        },
      }
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false,
        },
      },
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: /\.mcss$/,
        localIdentName: '[local]_[hash:base64:6]',
      },
    },
  },
  {
    loader: 'px2rem-loader',
    // options here
    options: {
      remUni: 100,
      remPrecision: 8,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: { plugins: [require('autoprefixer')()] },
    },
  },
]

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: {
    app: path.resolve(__dirname, '../src/app.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: 'static/[name].[contenthash:7][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /(\.(eot|ttf|woff|woff2|otf)|font)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name].[contenthash:7][ext]',
        },
      },
      {
        test: /\.css$/,
        use: styleRules,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [...styleRules, 'sass-loader'],
      },
      {
        test: /\.[jt]sx$/,
        use: [
          'thread-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              configFile: resolveProjectPath('tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      hash: true,
      inject: 'body',
    }),

    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : './css/[name].[contenthash:7].css',
      chunkFilename: isDev ? 'css[id].css' : './css/[id].[contenthash:7].css',
      ignoreOrder: true,
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
    alias: {
      '*': resolveProjectPath('src'),
      '@': resolveProjectPath('src'),
      $assets: resolveProjectPath('src/assets'),
      $components: resolveProjectPath('src/components'),
      $pages: resolveProjectPath('src/pages'),
      $utils: resolveProjectPath('src/utils'),
    },
    modules: ['node_modules', resolveAutosPath('node_modules'), resolveProjectPath('node_modules')],
  },
}
