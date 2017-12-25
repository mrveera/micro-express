let Player=require('./player.js');

let Game = function() {
  this.players = [];
  this.currentplayerIndex = 0;
};

Game.prototype.addPlayer = function (name,symbol) {
  let player=new Player(name, symbol)
  this.players.push(player);
  return true;
};

Game.prototype.getCurrentPlayerInfo = function() {
  return this.players[this.currentplayerIndex];
};

Game.prototype.isDraw = function() {
  return this.getTotalMoves().length==9;
};

Game.prototype.insertMove=function(pos){
  this.players[this.currentplayerIndex].moves.push(pos);
  return this.players[this.currentplayerIndex];
};

Game.prototype.getTotalMoves=function(){
  let totalMoves=[];
  this.players[0].moves.forEach(function(element){
    totalMoves.push(element);
  });
  this.players[1].moves.forEach(function(element){
    totalMoves.push(element);
  });
  return totalMoves;
};

Game.prototype.isVacancey = function () {
  return this.players.length<2;
};

module.exports=Game;
