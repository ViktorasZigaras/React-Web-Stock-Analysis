module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        /*{
            {// Loader for webpack to process CSS with PostCSS
              loader: 'postcss-loader',
              options: {plugins: function () {return [require('autoprefixer')];}}},
        },*/
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        {
          test: /\.(css|sass|scss)$/,
          loader: "style-loader!css-loader!sass-loader"
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }, {
          test: /\.txt$/,
          loader: 'raw-loader'
        }, {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader?limit=10000'
        }, {
          test: /\.(eot|ttf|wav|mp3)$/,
          loader: 'file-loader'
        }
      ]
    }
};