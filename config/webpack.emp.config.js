const path = require('path');
const postcssNormalize = require('postcss-normalize');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const package = require('../package.json');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const shouldUseSourceMap = isEnvDevelopment ? true : false;

const resolvePath = (_path) => path.resolve(__dirname, _path);
const paths = {
  entry: resolvePath('../example/index.tsx'),
  publicPath: '.',
  srcPath: resolvePath('../example'),
  outputPath: resolvePath('../docs'),
  appHtml: resolvePath('../example/index.html'),
};

const { homepage } = package;

const config = {
  mode: isEnvProduction ? 'production' : 'development',
  entry: paths.entry,
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    path: paths.outputPath,
    publicPath: isEnvDevelopment ? '/' : './',
  },
  resolve: {
    extensions: ['.css', '.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: shouldUseSourceMap ? 'source-map' : false,
  devServer: {
    port: '2333',
    quiet: true,
    hot: true,
  },
  externals: isEnvProduction
    ? {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    : undefined,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: paths.srcPath,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                postcssNormalize(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isEnvProduction ? new CleanWebpackPlugin() : undefined,
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      templateParameters: {
        isEnvProduction,
        homepage,
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean),
};

module.exports = config;
