const Server = require('../server');

let server=new Server(8080);

server.get('/hi',function (req,res) {
  console.log(req.queryParams);
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.post('/hi',function (req,res) {
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.start();
