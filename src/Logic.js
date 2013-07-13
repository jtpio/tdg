(function(){
	var Player = require('./Player');
	function logic(){
	}
	logic.prototype = {
		"simulate": function(game){
			var map = game.map;
			run_simulation(game, 1)
			run_simulation(game, 2)
		},
		"run_simulation": function(game, player_no){
			var player = null;
			switch(player_no){
				case 1: player = game.player1; attacker = game.player2;break;
				case 2: player = game.player2; attacker = game.player1;break;
			}
			while(player.is_still_playing()){
				player.army.move();
				attacker.defence.attack(player.army);
			}
			return [score, player_sequences]
		}
	}
	module.exports = logic;
}());