const path = require("path");
const resolve = require("resolve");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");
const safePostCssParser = require("postcss-safe-parser");

const babelConfig = require("./babel.config");

const paths = {
  index: path.resolve(__dirname, "../src/index.tsx"),
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
  html: path.resolve(__dirname, "../public/index.html"),
  nodeModules: path.resolve(__dirname, "../../node_modules"),
  public: "/"
};

const NODE_ENV = process.env.NODE_ENV;

function selectEnv(options) {
  return options[NODE_ENV] === undefined
    ? options["default"]
    : options[NODE_ENV];
}

function ifProd(option) {
  return NODE_ENV === "production" ? option() : undefined;
}

function ifDev(option) {
  return NODE_ENV === "development" ? option() : undefined;
}

module.exports = {
  mode: selectEnv({
    production: "production",
    development: "development"
  }),
  context: path.resolve(__dirname, '../'),
  bail: ifProd(() => true),
  devtool: selectEnv({
    production: "source-map",
    development: "cheap-module-source-map"
  }),
  entry: paths.index,
  output: {
    path: ifProd(() => paths.dist),
    pathinfo: ifDev(() => true),
    filename: selectEnv({
      production: "static/js/[name].[contenthash:8].js",
      development: "static/js/bundle.js"
    }),
    chunkFilename: selectEnv({
      production: "static/js/[name].[contenthash:8].chunk.js",
      development: "static/js/[name].chunk.js"
    }),
    futureEmitAssets: true,
    publicPath: paths.public,
    devtoolModuleFilenameTemplate: selectEnv({
      production: info =>
        path.relative(paths.src, info.absoluteResourcePath).replace(/\\/g, "/"),
      development: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
    }),
    globalObject: "this"
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelConfig
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          selectEnv({
            development: "style-loader",
            production: MiniCssExtractPlugin.loader,
          }),
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    minimize: ifProd(() => true),
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ],
    splitChunks: {
      chunks: "all",
      name: false
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  },
  plugins: [
    // Builds HTML template.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.html,
      ...ifProd(() => ({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }))
    }),
    // Inlines webpack runtime in production.
    ifProd(
      () => new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/])
    ),
    // Add context to module not found errors.
    new ModuleNotFoundPlugin(paths.src),
    // Add environment variables to bundle.
    new DefinePlugin({
      "process.env": {
        // Required for React to use production build.
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Warn when importing incorrect paths
    ifDev(() => new CaseSensitivePathsPlugin()),
    // Watch node_modules for changes in watch mode.
    ifDev(() => new WatchMissingNodeModulesPlugin(paths.nodeModules)),
    // Extract css to their own files in production.
    ifProd(
      () =>
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
        })
    ),
    // Generate asset manifest.
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: paths.public,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith(".map")
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    // Check typescript types.
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync("typescript", {
        basedir: paths.appNodeModules
      }),
      async: ifDev(() => true),
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: [
        "**",
        "!**/__tests__/**",
        "!**/?(*.)(spec|test).*",
        "!**/src/setupProxy.*",
        "!**/src/setupTests.*"
      ],
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: ifProd(() => typescriptFormatter)
    }),
    ifProd(() => new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../public'), to: paths.dist, ignore: ['index.html'] }
    ]))
  ].filter(Boolean)
};
