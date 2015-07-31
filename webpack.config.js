module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./build",
    publicPath: "",
    filename: "bundle.js"
  },
  module : {
    loaders: [ { 
        test   : /.js$/,
        loader : 'babel-loader?optional[]=runtime',
        exclude: /node_modules/
      }
    ]
  }
}