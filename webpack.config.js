const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
import DotEnv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  DotEnv.config({ 'path': '.env.test'})
}
else if (process.env.NODE_ENV === 'development') {
  DotEnv.config({ 'path': '.env.development'})
}

module.exports = (env) => {
  const CSSExtract = new ExtractTextPlugin('style.css')
  const isProduction = env === 'production'
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true // will give sourceMappingURL(you can see by selecting any element in devtool and see it's styles, it would show you something like abc.css)
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENTID': JSON.stringify(process.env.FIREBASE_MEASUREMENTID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',  // to know console.log()/errors output is comming from which file...
    devServer: {
      contentBase: path.join(__dirname, 'public'),  // to serve 'index.html' file
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
}