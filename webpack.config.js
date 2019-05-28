const path = require('path');

module.exports = {
  entry: './test/test.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
      rules:[
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            }
        ]
  }
};