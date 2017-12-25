const lib = require('../../serverLib');

let games ={
  lastId:"01"
}
const GameHandler = require('./gameHandler.js');


let createGame = function (req,res,queryData) {
  let game=new GameHandler();
  let header={'content-type':'text/html'};
  let content='';
  if(queryData.name){
    game.id=games.lastId;
    games.lastId++;
    games[game.id]=game;
    game.addPlayer(queryData.name,'x');
    content+=`${game.id} created ask your friend to join`;
    content+=`your board ${game.board.toString()} `;
    lib.respond(res,content,200,header);
    return ;
  }
  content='Invalid data';
  lib.respond(res,content,200,header);
}

let joinGame = function (req,res,queryData) {
  let content=''
  let header={'content-type':'text/html'};
  if(!queryData.id&&!queryData.name){
    content='<h1>Invalid data</h1>';
    lib.respond(res,content,200,header);
    return;
  }
  let game=games[queryData.id];
  let status=game.addPlayer(queryData.name,'O');
  if(status){
    content=`${game.board.toString()} , hey ${queryData.name} joined`;
    lib.respond(res,content,200,header);
    return;
  }
  content=`Maximum players reached`;
  lib.respond(res,content,200,header);
}

let play=function (req,res,queryData) {
  let content=''
  let header={'content-type':'text/html'};
  if(!queryData.id&&!queryData.name&&!queryData.move){
    content='<h1>Invalid data</h1>';
    lib.respond(res,content,200,header);
    return;
  }
  let game=games[queryData.id];
  content+=game.play(queryData.name,queryData.move);
  content+=game.board;
  lib.respond(res,content,200,header);
}

exports.createGame=createGame;
exports.joinGame=joinGame;
exports.play=play;
