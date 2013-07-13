(function() {

    var Map = require('./Map');

    function Game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new Map();
    }

    Game.prototype = {
        "feedTurrets": function(turrets, playerNr) {
            if (Object.prototype.toString.call(turret) !== '[object Array]') {
                turrets = [];
            }
            this.map.feedTurrets(turrets, playerNr);
        },

        "getMap": function() {
            var res = {
                'width':  this.map.width,
                'height': this.map.height,
                'blockSize': this.map.blockSize,
                'path': this.map.path
            };
            return res;
        }
    };

    module.exports = Game;

}());