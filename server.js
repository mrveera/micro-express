const http = require('http');

const url = require('url');
const lib = require('./serverLib');
const PORT = process.env.PORT||8080;


lib.handlers.GET['/slack']=(req,res)=>{
  console.log(req);
  debugger;
  respond(res,'hello',200,{'content-type':'text/html'});
}
lib.handlers.POST['/slack']=(req,res)=>{
  console.log(req);
  debugger;
  respond(res,'POST HELLO',200,{'content-type':'text/html'});
}

lib.handlers.GET['/play']=play;
lib.handlers.GET['/join']=joinGame;
lib.handlers.GET['/game']=createGame ;





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
