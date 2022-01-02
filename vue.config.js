const path = require("path")

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: require.resolve("./electron-loader")
        }
      ]
    }
  },
  chainWebpack: config => {
    config.plugin("copy").tap(args => {
      args[0].push({
        from: path.resolve(__dirname, "build/main.js"),
        to: path.resolve(__dirname, "dist/main.js"),
        toType: "file"
      })

      args[0].push({
        from: path.resolve(__dirname, "build/package.json"),
        to: path.resolve(__dirname, "dist/package.json"),
        toType: "file"
      })

      args[0].push({
        from: path.resolve(__dirname, "build/icon.ico"),
        to: path.resolve(__dirname, "dist/icon.ico"),
        toType: "file"
      })

      return args
    })
    config.plugin("html").tap(args => {
      args[0].title = "Simple Markdown"
      return args
    })
  }
}
