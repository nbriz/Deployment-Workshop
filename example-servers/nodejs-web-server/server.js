const http = require('http') // load the http module
const url = require('url') // load the url module
const path = require('path') // load the path module
const fs = require('fs') // load the file system module
const port = process.argv[2] || 80 // if user doesn't specify a port, use 80

// this creates the server, it automatically starts listening for requests
http.createServer((request, response) => {
  let uri = url.parse(request.url).pathname
  let filepath = `${__dirname}/www${uri}`
  console.log(`URI requested: ${uri}`)

  let contentTypesByExtension = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
  }

  // let's try to grab the file the user requested...
  fs.stat(filepath, (err) => {
    // ...if it doesn't exist return a 404 message...
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.write('404 Not Found\n')
      response.end()
      return
    }

    // if they asked for a folder, add 'index.html' to the path
    if (fs.statSync(filepath).isDirectory()) filepath += '/index.html'

    // open up the file they asked for...
    fs.readFile(filepath, 'binary', (err, file) => {
      // ...if we can't open it, send them back a server error
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' })
        response.write(err + '\n')
        response.end()
        return
      }

      // otherwise send them back a 200 OK, w/the contents of that file
      let headers = {}
      let contentType = contentTypesByExtension[path.extname(filepath)]
      if (contentType) headers['Content-Type'] = contentType
      response.writeHead(200, headers)
      response.write(file, 'binary')
      response.end()
    })
  })
}).listen(parseInt(port, 10))

console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
