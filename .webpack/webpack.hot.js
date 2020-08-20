const {merge} = require("webpack-merge");
const devConfig = require("./webpack.client.dev");

module.exports = merge(devConfig, {
  devServer: {
    hot: true,
    contentBase: "/public/",
    port: 8090,
    inline: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    open: true
  },
  output: {
    publicPath: "/"
  }
});
