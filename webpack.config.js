const path = require ('path')

module.exports = {
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output:{
    path: path.join(__dirname, '/client/build'),
    filename: 'bundle.js'
  },
  module:{
    rules:[
      {test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '/node_modules')}
    ]
  }
}
