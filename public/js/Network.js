define(function() {

    var Network = function(host, game) {
        this.host = host;
        this.game = game;
        this.connect(host);
    };

    Network.constructor = Network;

    Network.prototype = {
        "connect": function(host) {
            var game = this.game;

            this.socket = new io.connect(host);

            this.socket.on('connect', function() {
                console.log("Connected");
            });

            this.socket.on('map', function(map){
                game.setMap(map);
            });

            this.socket.on('turrets', function(otherTurrets) {
                game.setOtherTurrets(otherTurrets);
            });

            this.socket.on('status', function(status){
                game.setStatus(status);
            });

            this.socket.on('disconnect', function() {
                console.log('disconnected');
            });

            this.socket.emit("join", {});
        },

        "send": function(type, msg) {
            this.socket.emit(type, msg);
        }
    };

    return Network;
});