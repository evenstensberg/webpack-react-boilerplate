const { join } = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = false;
const isHmr = process.env.NODE_ENV === "hot";

module.exports = {
  devtool: false,
  entry: {
    main: "./src/index.js",
    vendor: ["react", "react-dom"]
  },
  mode: "production",
  output: {
    path: join(__dirname, "..", "public"),
    filename: "js/[name].bundle.[hash].js",
    chunkFilename: "chunks/[name].chunk.[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$|sass$|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isHmr,
              reloadAll: isHmr
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: isDev,
              plugins: function() {
                return [
                  require("precss")(),
                  require("autoprefixer")({
                    browsers: ["last 3 versions", "> 1%", "IE 10"]
                  }),
                  require("postcss-preset-env")()
                ];
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              limit: 10 * 1024,
              noquotes: true
            }
          },
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024
            }
          },
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images/",
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            passes: 3,
            pure_getters: true,
            unsafe: true
          },
          ecma: undefined,
          warnings: false,
          parse: {
            html5_comments: false
          },
          mangle: true,
          module: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: false,
          keep_fnames: false,
          safari10: false,
          unsafe_Function: true
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        },
        canPrint: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: join(__dirname, "..", "index.html"),
      inject: true,
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.[hash].css",
      chunkFilename: "chunks/[id].chunk.[hash].css"
    })
  ]
};
