const express = require('express')
const app = express() // create a server app with the express library
const port = process.argv[2] || 80 // if they didn't specify a port, use 80

// serve up the www folder for all static files (HTML, CSS, images, etc)
app.use(express.static(`${__dirname}/www`))

// run the server, it automatically starts listening for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
