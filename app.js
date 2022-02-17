const fs = require("fs");
const express = require("express");
const http = require("http");
const history = require("connect-history-api-fallback");
const webpack = require('webpack');
const middleware = require("webpack-dev-middleware");
const compiler = webpack(require("./.webpack/webpack.client.dev"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// content to be served from
const publicPath = __dirname + "/public";
const app = express();


// Fallback to index.html
app.use(
  history({
    verbose: true,
  })
);

app.use(middleware(compiler));
// Static assets
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);

// Serve index on homepage
app.get("/", function(req, res) {
  res.sendFile(publicPath + "/index.html");
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, function() {
  console.log(
    `App listening on port ${PORT}`
  );
});
