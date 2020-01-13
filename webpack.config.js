const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const path = require("path");

const frontendConfig = prod => ({
  name: "app",
  devtool: "source-map",
  target: "web",
  resolve: {
    extensions: [".ts", "tsx", ".js"],
    alias: {
        "components$": path.resolve(__dirname, "./src/front-end/components/index.tsx")
    }
  },
  entry: {
    app: "./src/front-end/main.tsx"
  },
  output: {
    path: path.resolve(__dirname, "./dist/public"),
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader" },
          {
            loader: "css-loader",
            options: {
              modules: prod
                ? { localIdentName: "[sha1:hash:hex:4]" }
                : { localIdentName: "[name]__[local]--[hash:base64:5]" },
              localsConvention: "camelCase"
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader", "babel-loader"]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
            /\.js$/,
            /\.d.ts$/
    ]),
    new HTMLWebpackPlugin({
      title: "Application",
      filename: "index.html",
      favicon: "./src/front-end/assets/favicon-16x16.png",
      inject: true,
      hash: true
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});

const backendConfig = prod => ({
  name: "server",
  target: "node",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
        "components$": path.resolve(__dirname, "./src/front-end/components/index.tsx")
    }
  },
  entry: {
    server: "./src/server/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "./dist/server"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader", "babel-loader"]
      },
      {
        test: /\.ts(x?)$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [
      nodeExternals({
          modulesFromFile: true
      })
  ]
});

module.exports = (env, { mode }) =>
  env.FRONTEND
    ? frontendConfig(mode === "production")
    : backendConfig(mode === "production");
