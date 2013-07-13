(function() {

    var map = require('./map');

    function game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.map = new map();
    }

    game.prototype = {
    };

    module.exports = game;

}());