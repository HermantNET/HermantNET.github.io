const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
    "service-worker": path.resolve(__dirname, "src", "service-worker.js"),
  },
  devServer: {
    contentBase: "./",
    port: 4000,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["env", "flow", "react", "stage-0"],
        },
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        }),
      },
      {
        test: /\.(txt|rtf)$/,
        loader: "file-loader?limit=10000&name=[name].[ext]",
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: "file-loader?limit=10000&name=images/[name].[ext]",
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: "url-loader?limit=10000&name=fonts/[name].[ext]",
      },
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery",
          },
          {
            loader: "expose-loader",
            options: "$",
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.ProvidePlugin({
      Popper: ["popper.js", "default"],
    }),
  ],
}
