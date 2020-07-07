const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BannerPlugin = require('webpack').BannerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const postcssNormalize = require('postcss-normalize');

const util = require('./util');

const shouldUseSourceMap = false;

const resolvePath = (_path) => path.resolve(__dirname, _path);
const paths = {
  entry: resolvePath('../src/index.ts'),
  publicPath: '.',
  srcPath: resolvePath('../src'),
  outputPath: resolvePath('../dist'),
};

const package = fs.readFileSync(resolvePath('../package.json'), {
  encoding: 'utf-8',
});
const { version } = JSON.parse(package);
const banner = `keep-alive\nversion: ${version}\nbuild: ${util.getTime()}`;

// TODO：
// 1、copy src/index.d.ts

module.exports = {
  mode: 'production',
  entry: paths.entry,
  output: {
    filename: 'index.js',
    library: 'KeepAlive',
    libraryTarget: 'umd',
    path: paths.outputPath,
    publicPath: paths.publicPath,
  },
  resolve: { extensions: ['.css', '.js', '.ts', '.tsx'] },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'React',
    },
    'react-router': {
      commonjs: 'react-router',
      commonjs2: 'react-router',
      amd: 'react-router',
      root: 'ReactRouter',
    },
  },
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/,
        loader: 'babel-loader',
        include: paths.srcPath,
        exclude: /node_modules/,
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
    new CleanWebpackPlugin(),
    new BannerPlugin(banner),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath('../src/index.d.ts'),
          to: resolvePath('../dist'),
        },
      ],
    }),
  ],
};
