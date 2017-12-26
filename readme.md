
# Micro-Expres

[![CircleCI](https://circleci.com/bb/veera83372/command-line-argumnets-parser/tree/master.svg?style=shield&circle-token=a723bccdc76d4581bf70d5a59b590244067fa307)](https://circleci.com/bb/veera83372/command-line-argumnets-parser/tree/master)       ![](https://travis-ci.org/veera83372/command-line-arguments-parser.svg?branch=master) [![Join the chat at https://gitter.im/command-line-arguments-parser/Lobby](https://badges.gitter.im/command-line-arguments-parser/Lobby.svg)](https://gitter.im/command-line-arguments-parser/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/command-line-arguments-parser)

This is a basic http server framework written in Javascript that helps in implementing a basic server which handles GET and POST request .


## Installation

`npm install micro-express`

## Usage

```javascript
const Server = require('micro-express');

let server=new Server(8080);

//You can add GET request handler by using get method
//You can add POST request handler by using post method


//It will take two parameters first one path and callback to call when request arrived at that path
//You can access query parameters through req.queryParams in GET request

server.get(path,callback);

//You can access query parameters through req.body in POST request

server.get(path,callback);

//you can start the server
server.start();

//if you want serve files then create a public directory and put your files there
//whenever you got that request without adding handler your server will serve those files


//In your callback you can access this.respond method to serve data
this.respond(res, content, statusCode, headerOptions, [encoding]);

```


# Examples

#### Basic '/' Handling server
```javascript
const Server = require('micro-express');

let server=new Server(8080);

server.get('/',function (req,res) {
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.post('/',function (req,res) {
  this.respond(res,'hello',200,{'content-type':'text/html'});
});

server.start();

```
