const lib = require('./serverLib');
const fs = require('fs');

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
      lib.respond(res,'<h1> NOT FOUND</h1>',404,header,'utf8')
      return;
    }
    lib.respond(res,data,200,header,encoding);
  });
  return;
}

module.exports=fileServer;
