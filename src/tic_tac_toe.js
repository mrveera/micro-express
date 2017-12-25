const isSubset = function(set, superSet) {
  return set.every(function(element) {
    return superSet.includes(element);
  });
}

let Player = function(name, image) {
  this.name = name;
  this.image = image;
  this.moves = [];
}
Player.prototype.hasWon = function() {
  let winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  let moves = this.moves;
  return winningCombinations.some(function(element) {
    return isSubset(element,moves);
  });
};

//############################

let Game = function(image1,image2) {
  this.players = [];
  this.players.push(new Player("player1", image1));
  this.players.push(new Player("player2", image2));
  this.currentplayerIndex = 0;
};

Game.prototype.getCurrentPlayerInfo = function() {
  return this.players[this.currentplayerIndex];
};
Game.prototype.isDraw = function() {
  let moves = this.players[0].moves.length;
  moves += this.players[1].moves.length;
  return moves == 9;
};
Game.prototype.insertMove=function(pos){
  this.players[this.currentplayerIndex].moves.push(pos);
  return this.players[this.currentplayerIndex];
};
Game.prototype.getTotalMoves=function(){
  return this.players[0].moves.concat(this.players[1].moves);
};

// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------

let game = new Game('/images/like.jpg','/images/haha.png');

let action = {
  won: function(cellPosition, currentPlayer) {
    updateDisplay(`${currentPlayer.name}` + " has won");
    removeClickListenerOnTable();
  },
  draw: function() {
    updateDisplay("IT'S DRAW");
    removeClickListenerOnTable();
  },
  isOn: function(cellPosition, currentPlayer) {
    game.currentplayerIndex = 1 - game.currentplayerIndex;
    currentPlayer = game.getCurrentPlayerInfo();
    updateDisplay(`${currentPlayer.name}` + "'s Turn");
  }
};
const removeClickListenerOnTable=function(){
  let table = document.getElementById("tic-tac-toe");
  table.onclick = null;
  let button=document.getElementById('resetgrid');
  button.disabled = !button.disabled;
}

const updateDisplay = function(text) {
  let display = document.getElementById('display');
  display.innerText =text;
}

const getGameStatus = function() {
  let gameStatus = {};
  let currentPlayer = game.getCurrentPlayerInfo();
  if (currentPlayer.hasWon()) {
    gameStatus.status = "won";
    gameStatus.winner = currentPlayer.name;
  } else if (game.isDraw()) {
    gameStatus.status = "draw";
  } else {
    gameStatus.status = "isOn";
  }
  return gameStatus;
}

const updateSelectedCell = function(pos) {
  let currentPlayer = game.getCurrentPlayerInfo();
  let cell = document.getElementById(pos);
  cell.style.backgroundColor="#fff";
  game.insertMove(pos);
  let imageTag= "<img src="+`${currentPlayer.image}`+" alt='' height=140px width=140px>";
  cell.innerHTML = imageTag;
  let gameStatus = getGameStatus();
  action[gameStatus.status](pos, currentPlayer);
}

const handlePositionSelected = function(event) {
  let currentPlayer = game.getCurrentPlayerInfo();
  let cell = event.target;
  let cellPosition = +cell.id;
  let totalMoves=game.getTotalMoves();
  if (totalMoves.includes(cellPosition)) {
    return;
  }
  updateSelectedCell(cellPosition);
}
const resetGame=function(){
  location.reload();
}
const insertClickListenerOnTable = function() {
  let table = document.getElementById("tic-tac-toe");
  table.onclick = handlePositionSelected;
  let currentPlayer = game.getCurrentPlayerInfo();
  updateDisplay(`${currentPlayer.name}` + "'s Turn");
}
const insertClickListenerOnButton=function(){
  let button=document.getElementById("resetgrid");
  button.disabled=true;
  button.onclick=resetGame;
}
const beginGame = function() {
  insertClickListenerOnTable();
  insertClickListenerOnButton();
}

window.onload = beginGame;
