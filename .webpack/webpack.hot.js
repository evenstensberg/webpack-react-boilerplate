const {merge} = require("webpack-merge");
const devConfig = require("./webpack.client.dev");

module.exports = merge(devConfig, {
  devServer: {
    hot: true,
    port: 8090,
    headers: { "Access-Control-Allow-Origin": "*" },
    open: true,
  },
  output: {
    publicPath: "/"
  }
});
