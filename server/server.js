const express = require('express')
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000 // HEROKU provide dynamic port for our app, so if there isn't any port we make it to '3000' by default

var app = express()
app.use(express.static(publicPath)) // to register some middleware

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log('Server is up!')
})