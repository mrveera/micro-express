const url = require('url');
const EventEmitter = require('events').EventEmitter;
const lib={};

let ServerEvents=new EventEmitter();

lib.ServerEvents=ServerEvents;
lib.logRequest = function() {
  let date = new Date().toLocaleString()
  console.log(`method: ${this.method } url: ${this.url}  Date: ${date} `);
}

const logResponse = function() {
  console.log(`statusCode: ${this.statusCode} for:${this.for}`);
  console.log(`---------------`)
}

lib.respond = function (res,content,statusCode,header,encoding) {
  let headerKeys = Object.keys(header);
  headerKeys.forEach(function (key) {
    res.setHeader(key,header[key]);
  });
  res.statusCode=statusCode;
  res.write(content,encoding);
  logResponse.call(res);
  res.end();
}

lib.getQueryData={};

lib.getQueryData['GET'] = function (req) {
  let queryData = url.parse(`http://localhost${req.url}`,true).query;
  debugger;
  ServerEvents.emit('data collected',queryData);
}

lib.getQueryData['POST'] = function (req) {
  let queryData='';
  req.on('data',function (data) {
    queryData+=data;
  });
  req.on('end',function () {
    queryData=url.parse(`http://localhost${queryData}`,true).query;
    ServerEvents.emit('data collected',queryData);
  })
}

lib.logResponse=logResponse;
module.exports=lib;
