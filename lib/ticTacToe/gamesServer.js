let games ={
  lastId:"01"
}
const GameHandler = require('./gameHandler.js');

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
