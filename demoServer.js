const Server = require('./server.js');
const gameServer = require('./lib/ticTacToe/gamesServer.js');

let server=new Server(8080);

server.get('/play',gameServer.play);
server.get('/game',gameServer.createGame);
server.get('/join',gameServer.joinGame);
server.start();
