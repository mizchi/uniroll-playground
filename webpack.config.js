const webpack = require('webpack');
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MonacoEditorPlugin = require("monaco-editor-webpack-plugin");
const WorkerPlugin = require("worker-plugin");

module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".mjs", ".wasm"],
    alias: {
      process: "process/browser.js",
      buffer: "buffer",
      path: "path-browserify",
      stream: "stream-browserify",
      util: "util/util.js",
      assert: false,
      fs: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.worker.ts$/,
        use: [
          {
            loader: "comlink-loader",
            options: {
              singleton: true,
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        include: /pluginutils/, // for @rollup/pluginutils
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/fsevents/),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new MonacoEditorPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
    new WorkerPlugin({
      globalObject: "self"
    }),
  ],
};
