(function() {

    var map = require('./map');

    function game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new map();
    }

    game.prototype = {
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
                'path': this.map.path
            };
            return res;
        }
    };

    module.exports = game;

}());