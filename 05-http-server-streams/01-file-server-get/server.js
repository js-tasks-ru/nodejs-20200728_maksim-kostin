const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);
  const isHasDir = pathname.includes('/');

  switch (req.method) {
    case 'GET':
      if (isHasDir) {
        res.statusCode = 400;
        return res.end('Not found!');
      } else {
        const streamRead = fs.createReadStream(filepath);
        streamRead.on('error', (err) => {
          res.statusCode = 404;
          res.end('Not found!');
        });
        streamRead.pipe(res);
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
