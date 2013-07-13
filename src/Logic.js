(function(){
	var Player = require('./Player');
	function logic(){

	}
	logic.prototype = {
		"simulate": function(game){
			var map = game.map;
			game.player1.run_simulation(game.player2)
		},
		"run_simulation": function(game, player){
			return [score, player_sequences]
		}
	}
	module.exports = logic;
}());