const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ 'path': '.env.test'})
}
else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ 'path': '.env.development'})
}

module.exports = (env) => {
  const CSSExtract = new ExtractTextPlugin('styles.css') // extracts css to 'styles.css'
  const isProduction = env === 'production'
  return {
    entry: ['babel-polyfill', './src/app.js'],  // here first element in array(babel-polyfill) would support new features (like [].includes('manas) which are not tranpiled by babel; next element would be entry point)
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
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), // this will set 'process.env.FIREBASE_API_KEY' to actual key in firebase.js cause we do not directly set those value here to make it secure excluding .env files.
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
      publicPath: '/dist/'  // tells which .js file to serve for 'index.html' file
    }
  }
}