const webpack = require("webpack"),
  path = require("path"),
  HTMLWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin");
//   WebpackPWAManifest = require("webpack-pwa-manifest"),
//   { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|tff)$/,
        use: "file-loader",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],

              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-class-properties",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    new HTMLWebpackPlugin({
      title: "RustyMovies",
      meta: {
        author: "K.T Motshoana",
        applicationName: "RustyMovies",
        description: "watch movies, binge series and chat with strangers",
        robots: "index,follow",
        googlebot: "index,follow",
        keywords: "RustyMovies, K.T motshoana,Rustenburg Tv, rustenburg online",
      },
    }),
  ],
};
