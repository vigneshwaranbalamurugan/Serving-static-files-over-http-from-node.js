var http = require("http");
var fs = require("fs");
const path = require('path');


var server = http.createServer(function (request, response) {
    if (request.url == '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                console.error("Error reading index.html:", err);
                response.writeHead(404);
                response.write("File not found");
                response.end();
            } else {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(data);
                response.end();
            }
        });
    }
    else if (request.url.match(/^\/(images\/)?[^\/]+\.(png|jpg|jpeg|gif)$/i)) {
        serveImage(request.url, response);
    }else if (request.url.endsWith('.css')) {
        const cssFile = request.url.slice(1);
        serveStaticFile(response,cssFile,'text/css');
    }else if (request.url.endsWith('.js')) {
        const jsFile = request.url.slice(1);
        serveStaticFile(response,jsFile,'application/javascript');
    }
    else {
        response.writeHead(404);
        response.write("<h1>Invalid response</h1>");
        response.end();
    }

});

function serveStaticFile( response, filePath,contentType) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.error(`Error reading file: ${error.message}`);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
        return;
      }
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(data);
    });
}

  function getContentType(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
      case '.css':
        return 'text/css';
      case '.js':
        return 'application/javascript';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      default:
        return 'text/plain';
    }
  }

function serveImage(request, response) {
    var imagePath = path.join(__dirname, request);
    var fileStream = fs.createReadStream(imagePath);
    const contentType = getContentType(imagePath);
    response.writeHead(200, { "Content-Type": contentType });
    fileStream.pipe(response);
}

server.listen(3001);

console.log("Server is running at localhost:3001");
