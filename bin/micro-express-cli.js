#!/usr/bin/env node
const fs = require('fs');
const Command = require('../Command');
let cliArguments = require('./cliParser');

const showHelp = function () {
  console.log('micro-express [-n | --help] [projectName]');
}

let serverContent =`
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
`;

let indexContent =`<h1>hello</h1>`;

let createProject = function (parsedArguments) {
<<<<<<< HEAD
  if(Object.keys(parsedArguments.flags.length<=0)|| !parsedArguments.arguments[0]) {
=======
  if(Object.keys(parsedArguments.flags.length<=0)) {
>>>>>>> 5870207c2657ac8b8b0873e7286b1a4341c0055c
    showHelp();
    return;
  }
  let path=parsedArguments.flags['n'] || parsedArguments.arguments[0];
  fs.mkdirSync(path);
  fs.mkdirSync(path+'/public');
  fs.writeFileSync(path+'/public/index.html',indexContent,'utf8');
  fs.writeFileSync(path+'/server.js',serverContent,'utf8');
}

let CLI = new Command('cli','n');
CLI.addOption('n',createProject,null,'');
CLI.addOption('--help',showHelp,null,'to show help');

let main = function () {
  let parsedArguments = cliArguments(process.argv.slice(2))
  let result =CLI.execute(parsedArguments);
}

main();
