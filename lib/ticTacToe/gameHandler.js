const Game = require('./game.js');


let GameHandler = function(){
  this.game=new Game();
  this.board=[0,0,0,0,0,0,0,0,0,0];
}

GameHandler.prototype.won = function (playerName,pos) {
  this.play=()=>`${playerName} won`;
  return `${playerName} won`;
};

GameHandler.prototype.draw = function () {
  this.play=()=>`It's draw`;
  return `It's draw`;
};

GameHandler.prototype['invalid player'] = function () {
  return `Dude It's not your turn`;
};

GameHandler.prototype['invalid move'] = function () {
  return `Dude It's invalid move`;
};

GameHandler.prototype['not enough players'] = function () {
  return `not enough players`;
};

GameHandler.prototype.isOn = function () {
  let gameIndex=this.game.currentplayerIndex;
  this.game.currentplayerIndex= 1 - gameIndex;
  let currentPlayer = this.game.getCurrentPlayerInfo();
  return `${currentPlayer.name}'s turn'`;
};

GameHandler.prototype.addPlayer = function (playerName,playerSymbol) {
  if(this.game.isVacancey())
    return this.game.addPlayer(playerName,playerSymbol);
  return false;
};

GameHandler.prototype.getGameStatus = function() {
  let gameStatus = {};
  let currentPlayer = this.game.getCurrentPlayerInfo();
  gameStatus.currentPlayer=currentPlayer;
  if (currentPlayer.hasWon()) {
    gameStatus.status = "won";
    gameStatus.winner = currentPlayer.name;
  } else if (this.game.isDraw()) {
    gameStatus.status = "draw";
  } else {
    gameStatus.status = "isOn";
  }
  return gameStatus;
}

GameHandler.prototype.updateGame = function (pos) {
  let totalMoves = this.game.getTotalMoves();
  if(totalMoves.includes(pos))
    return { status:'invalid move'};
  this.game.insertMove(pos);
  this.board[pos]=this.game.getCurrentPlayerInfo().symbol;
  return this.getGameStatus();
};

GameHandler.prototype.isvalidPlayer = function (playerName) {
  let currentPlayerName=this.game.getCurrentPlayerInfo().name;
  return currentPlayerName==playerName;
};

GameHandler.prototype.playMove = function (playerName,pos) {
  let gameStatus={};
  if(this.game.isVacancey())
    return {status:`not enough players`};
  if(this.isvalidPlayer(playerName))
    return this.updateGame(pos);
  gameStatus.status='invalid player';
  return gameStatus;
};

GameHandler.prototype.play = function (playerName,pos) {
  let gameStatus = this.playMove(playerName,pos);
  return this[gameStatus.status](playerName,pos);
};

module.exports=GameHandler;
