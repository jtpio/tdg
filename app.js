var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var game = require('game.js').game();

server.listen(4444);
app.use(express.static(__dirname + '/public'));

var players = [];


io.sockets.on('connection', function (client) {
    client.emit("hello", { hello: 'world' });

    client.on("message", function (msg) {
        console.log("Got " + JSON.stringify(msg) + " from client");
    });
    client.on('disconnect', function () {
    });
});