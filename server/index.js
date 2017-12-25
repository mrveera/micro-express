const http = require('http');
const fileServer = require('./fileServer');
const lib = require('./serverLib');

const Server = function (port=8080,options={}) {
  this.handlers={
    "POST": {},
    "GET": {}
  };
  this.options=options;
  this.PORT=process.env.PORT||port;
}


Server.prototype.addHandler = function (method,path,callback) {
  this.handlers[method][path]=callback;
};

Server.prototype.get = function (path,callback) {
  this.addHandler('GET',path,callback);
};

Server.prototype.post = function (path,callback) {
  this.addHandler('POST',path,callback);
};

Server.prototype.addDefaulthandler = function (handler) {
  this.defaultHandler=handler;
};

Server.prototype.getHandler = function(method, path) {
  let handler = this.defaultHandler||fileServer;
  if (this.handlers[method][path])
    handler = this.handlers[method][path];
  return handler;
}

Server.prototype.requestHandler = function(req, res) {
  lib.logRequest.call(req);
  let url=req.url.split('?')[0];
  let handler = this.getHandler(req.method, url);
  lib.ServerEvents.once('data collected',handler.bind(this,req,res));
  let queryData = lib.getQueryData[req.method](req);
}

Server.prototype.respond = lib.respond;

Server.prototype.start = function () {
  this.server=http.createServer(this.requestHandler.bind(this));
  let server=this.server;
  this.server.on('listening', function() {
    console.log('Dude I am listening on port:', server.address().port);
  })
  this.server.on('error', function(err) {
    console.log(err.message)
  })
  this.server.listen(this.PORT,this.options);
};

module.exports=Server;
