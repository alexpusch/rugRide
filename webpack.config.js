module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: "./build",
    publicPath: "",
    filename: "bundle.js"
  },
  module : {
    loaders: [ {
        test   : /.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015']
        }
      }
    ]
  }
}