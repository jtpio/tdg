var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var game = require(__dirname + '/src/game');

server.listen(4444);
app.use(express.static(__dirname + '/public'));

var players = [];
var games = {};
var gameCounter = 0;

io.sockets.on('connection', function (client) {
    client.emit("hello", { hello: 'world' });

    client.on("message", function (msg) {
        console.log("Got " + JSON.stringify(msg) + " from client");
    });
    client.on('disconnect', function () {
    });

    players.push(client);

    if (players.length % 2 === 0) {
        var p1 = players.shift();
        var p2 = players.shift();
        var newGame = new game(p1, p2, gameCounter);
        gameCounter++;
        console.log("new game created");
        p1.gameID = newGame.id;
        p2.gameID = newGame.id;
    }

    console.log("queue size: " + players.length);
});