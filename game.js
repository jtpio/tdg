(function() {

    function game(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    game.prototype = {
        "init": function() {

        }
    };

    module.exports.game = game;

}());