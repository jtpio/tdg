(function() {

    function game(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
    }

    game.prototype = {
        "init": function() {

        }
    };

    module.exports = game;

}());