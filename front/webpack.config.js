module.exports = {
  devtool: 'source-map',
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/, 
        query: { presets: ['env', 'stage-0', 'react'] }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + '/dist/'
  }
}