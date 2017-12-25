const Server = require('./server.js');
const gameServer = require('./lib/ticTacToe/gamesServer.js');

let server=new Server(8080);
// handlers.GET['/play']=gameServer.play;
// handlers.GET['/game']=gameServer.createGame;
// handlers.GET['/join']=gameServer.joinGame;
// handlers.GET['/']=function (req,res,queryData) {
//   res.end('hello');
// }
// handlers.POST['/']=function (req,res,queryData) {
//   console.log(queryData);
//   res.end('hello');
// }

server.addHandler()
