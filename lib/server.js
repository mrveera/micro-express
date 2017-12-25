const http = require('http');
const fs = require('fs');
const url = require('url');
let games ={
  lastId:"01"
}
const GameHandler = require('./gameHandler.js');
const PORT = process.env.PORT||8080;

let handlers = {
  "POST": {},
  "GET": {}
}

let createGame = function (req,res) {
  let game=new GameHandler();
  let header={'content-type':'text/html'};
  let content='';
  let queryParams =url.parse(`http://localhost${req.url}`,true).query;
  if(queryParams.name){
    game.id=games.lastId;
    games.lastId++;
    games[game.id]=game;
    game.addPlayer(queryParams.name,'x');
    content+=`${game.id} created ask your friend to join`;
    content+=`your board ${game.board.toString()} `;
    respond(res,content,200,header);
    return ;
  }
  content='Invalid data';
  respond(res,content,200,header);
}

let joinGame = function (req,res) {
  let content=''
  let queryParams =url.parse(`http://localhost${req.url}`,true).query;
  let header={'content-type':'text/html'};
  if(!queryParams.id&&!queryParams.name){
    content='<h1>Invalid data</h1>';
    respond(res,content,200,header);
    return;
  }
  let game=games[queryParams.id];
  let status=game.addPlayer(queryParams.name,'O');
  if(status){
    content=`${game.board.toString()} , hey ${queryParams.name} joined`;
    respond(res,content,200,header);
    return;
  }
  content=`Maximum players reached`;
  respond(res,content,200,header);
}

let play=function (req,res) {
  let content=''
  let queryParams =url.parse(`http://localhost${req.url}`,true).query;
  let header={'content-type':'text/html'};
  if(!queryParams.id&&!queryParams.name&&!queryParams.move){
    content='<h1>Invalid data</h1>';
    respond(res,content,200,header);
    return;
  }
  let game=games[queryParams.id];
  content+=game.play(queryParams.name,queryParams.move);
  content+=game.board;
  respond(res,content,200,header);
}

handlers.GET['/slack']=(req,res)=>{
  console.log(req);
  debugger;
  respond(res,'hello',200,{'content-type':'text/html'});
}
handlers.POST['/slack']=(req,res)=>{
  console.log(req);
  debugger;
  respond(res,'POST HELLO',200,{'content-type':'text/html'});
}
handlers.GET['/play']=play;
handlers.GET['/join']=joinGame;
handlers.GET['/game']=createGame ;
const fileContentTypeAndEncoding = {
  '.html': {
    contentType: 'text/html',
    encoding: 'utf-8'
  },
  '.css': {
    contentType: 'text/css',
    encoding: 'utf-8'
  },
  '.pdf': {
    contentType: 'appliation/pdf',
    encoding: 'base64'
  },
  '.gif': {
    contentType: 'base64',
    encoding: 'base64'
  },
  '.png': {
    contentType: 'base64',
    encoding: 'base64'
  },
  '.jpg': {
    contentType: 'base64',
    encoding: 'base64'
  },
  '.js': {
    contentType: 'text/javascript',
    encoding: 'utf-8'
  },
  '.ico': {
    contentType: 'base64',
    encoding: 'base64'
  }
}

const getFileEncoding = function(path) {
  let fileExtension = path.substr(path.lastIndexOf('.'));
  let encoding = 'utf-8'
  if (fileContentTypeAndEncoding[fileExtension])
    encoding = fileContentTypeAndEncoding[fileExtension].encoding;
  return encoding;
}

const getFileContentType = function(path) {
  let fileExtension = path.substr(path.lastIndexOf('.'));
  let contentType = 'text/html'
  if (fileContentTypeAndEncoding[fileExtension])
    contentType = fileContentTypeAndEncoding[fileExtension].contentType;
  return contentType;
}

const logRequest = function() {
  let date = new Date().toLocaleString()
  console.log(`method: ${this.method } url: ${this.url}  Date: ${date} `);
}

const logResponse = function() {
  console.log(`statusCode: ${this.statusCode} for:${this.for}`);
  console.log(`---------------`)
}

const fileServer = function(req, res) {
  let path = req.url.split('?')[0];
  if (path == "/")
    path = '/index.html';
  path = './public' + path;
  let encoding = getFileEncoding(path);
  let contentType = getFileContentType(path);
  let header ={'content-type':contentType};
  res.for = path;
  fs.readFile(path, encoding, function(err, data) {
    if (err) {
      header['content-type']='text/html';
      respond(res,'<h1> NOT FOUND</h1>',404,header,'utf8')
      return;
    }
    respond(res,data,200,header,encoding);
  });
  return;
}

const respond = function (res,content,statusCode,header,encoding) {
  let headerKeys = Object.keys(header);
  headerKeys.forEach(function (key) {
    res.setHeader(key,header[key]);
  });
  res.statusCode=statusCode;
  res.write(content,encoding);
  logResponse.call(res);
  res.end();
}

const getHandler = function(method, path) {
  let handler = fileServer;
  if (handlers[method][path])
    handler = handlers[method][path];
  return handler;
}

const requestHandler = function(req, res) {
  logRequest.call(req);
  let url=req.url.split('?')[0];
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
