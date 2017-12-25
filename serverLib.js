const lib={};

lib.handlers = {
  "POST": {},
  "GET": {}
}

lib.logRequest = function() {
  let date = new Date().toLocaleString()
  console.log(`method: ${this.method } url: ${this.url}  Date: ${date} `);
}

lib.logResponse = function() {
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
  lib.logResponse.call(res);
  res.end();
}

module.exports=lib;
