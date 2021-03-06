var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var Game = require(__dirname + '/src/Game');
var Settings = require(__dirname+ '/src/Settings');

server.listen(4444);
app.use(express.static(__dirname + '/public'));

var players = [];
var games = {};
var gameCounter = 0;

io.sockets.on('connection', function(client) {
    client.emit('hello', { hello: 'world' });

    client.on('turrets', function(msg) {
        var g = games[client.gameID];
        var playerNr = (g.player1 == client)?1:2;
        console.log("got turrets from player " + playerNr + ": " + JSON.stringify(msg));
        g.feedTurrets(msg, playerNr);
    });

    client.on('join', function(msg) {
        players.push(client);
        console.log("queue size: " + players.length);

        if (players.length > 0 && players.length % 2 === 0) {
            var p1 = players.shift();
            var p2 = players.shift();
            var newGame = new Game(p1, p2, gameCounter);
            console.log("new game created");
            p1.gameID = newGame.id;
            p2.gameID = newGame.id;
            games[newGame.id] = newGame;
            gameCounter++;

            p1.emit("map", {"playerNumber": 1, "map": newGame.getMap()});
            p2.emit("map", {"playerNumber": 2, "map": newGame.getMap()});
        }
    });

    client.on('disconnect', function () {
    });
});