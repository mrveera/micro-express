const Server = require('./server');

let server=new Server(8080);

server.get('/hi',function (req,res,queryData) {
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.post('/hi',function (req,res,queryData) {
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.start();
