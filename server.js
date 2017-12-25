const http = require('http');
const fileServer = require('./fileServer');
const url = require('url');
const lib = require('./serverLib');
const PORT = process.env.PORT||8080;


const handlers = {
  "POST": {},
  "GET": {}
}

const getHandler = function(method, path) {
  let handler = fileServer;
  if (handlers[method][path])
    handler = handlers[method][path];
  return handler;
}

const requestHandler = function(req, res) {
  lib.logRequest.call(req);
  let url=req.url.split('?')[0];
  let queryParams
  let handler = getHandler(req.method, url);
  handler(req, res);
}

const server = http.createServer(requestHandler);

server.on('listening', function() {
  console.log('Dude I am listening on port:', server.address().port);
})

server.on('error', function(err) {
  console.log(err.message)
})

const startServer = function() {
  port = process.argv[2] || PORT;
  server.listen(port);
}

startServer();
